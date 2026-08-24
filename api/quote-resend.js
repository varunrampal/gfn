/* global process */
const MAX_ATTACHMENT_BYTES = 2.5 * 1024 * 1024
const ALLOWED_EXTENSIONS = new Set(['xlsx', 'xls', 'csv', 'pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'])
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const clean = (value, maxLength = 500) => String(value || '').trim().slice(0, maxLength)
const escapeHtml = (value) => clean(value, 5000).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;',
}[character]))

const validateAttachment = (attachment) => {
  if (!attachment) return null
  const filename = clean(attachment.name, 180)
  const extension = filename.split('.').pop()?.toLowerCase()
  const size = Number(attachment.size)

  if (!filename || !ALLOWED_EXTENSIONS.has(extension)) throw new Error('Unsupported attachment type.')
  if (!Number.isFinite(size) || size <= 0 || size > MAX_ATTACHMENT_BYTES) throw new Error('The attachment must be smaller than 2.5 MB.')
  if (!attachment.contentBytes || typeof attachment.contentBytes !== 'string') throw new Error('The attachment is invalid.')

  return { filename, content: attachment.contentBytes }
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ error: 'Method not allowed.' })
  }

  try {
    const allowedOrigins = String(process.env.QUOTE_ALLOWED_ORIGINS || '')
      .split(',').map((origin) => origin.trim()).filter(Boolean)
    const requestOrigin = request.headers?.origin
    if (allowedOrigins.length && requestOrigin && !allowedOrigins.includes(requestOrigin)) {
      return response.status(403).json({ error: 'This website is not allowed to submit quote requests.' })
    }

    const body = typeof request.body === 'string' ? JSON.parse(request.body) : (request.body || {})
    if (clean(body.website)) return response.status(200).json({ ok: true })

    const fullName = clean(body.fullName, 120)
    const companyName = clean(body.companyName, 160)
    const email = clean(body.email, 254).toLowerCase()
    const plantList = clean(body.plantList, 5000)
    const plantItems = Array.isArray(body.plantItems) ? body.plantItems.slice(0, 100).map((item) => ({
      plant: clean(item?.plant, 200), quantity: clean(item?.quantity, 60), size: clean(item?.size, 100),
    })).filter((item) => item.plant || item.quantity || item.size) : []
    const projectNotes = clean(body.projectNotes, 5000)
    const attachment = validateAttachment(body.attachment)

    if (!fullName || !companyName || !EMAIL_PATTERN.test(email)) {
      return response.status(400).json({ error: 'Please provide your name, company, and a valid email address.' })
    }
    if (!plantList && !attachment) {
      return response.status(400).json({ error: 'Enter your plant requirements or attach a plant list.' })
    }

    const apiKey = process.env.RESEND_API_KEY
    const fromEmail = clean(process.env.RESEND_FROM_EMAIL, 254)
    const recipientEmail = clean(process.env.QUOTE_RECIPIENT_EMAIL || fromEmail, 254)
    const fromName = clean(process.env.RESEND_FROM_NAME || 'Green Flow Nurseries', 100)
    if (!apiKey || !EMAIL_PATTERN.test(fromEmail) || !EMAIL_PATTERN.test(recipientEmail)) {
      throw new Error('Resend is not configured.')
    }

    const details = [
      ['Name', fullName],
      ['Company', companyName],
      ['Email', email],
      ['Phone', clean(body.phone, 60) || 'Not provided'],
      ['Fulfillment', clean(body.fulfillment, 40) || 'Not specified'],
      ['Location', clean(body.location, 160) || 'Not provided'],
      ['Required by', clean(body.requiredBy, 30) || 'Not provided'],
      ['Project notes', projectNotes || 'None'],
    ]
    const rows = details.map(([label, value]) => `<tr><th style="padding:8px;text-align:left;vertical-align:top">${escapeHtml(label)}</th><td style="padding:8px;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`).join('')
    const plantTableRows = plantItems.map((item) => `<tr><td style="padding:8px;border:1px solid #ccc">${escapeHtml(item.plant || 'Not specified')}</td><td style="padding:8px;border:1px solid #ccc">${escapeHtml(item.quantity || 'Not specified')}</td><td style="padding:8px;border:1px solid #ccc">${escapeHtml(item.size || 'Not specified')}</td></tr>`).join('')
    const plantTable = plantItems.length ? `<table style="width:100%;border-collapse:collapse"><thead><tr><th style="padding:8px;border:1px solid #ccc;text-align:left">Plant or species</th><th style="padding:8px;border:1px solid #ccc;text-align:left">Quantity</th><th style="padding:8px;border:1px solid #ccc;text-align:left">Size</th></tr></thead><tbody>${plantTableRows}</tbody></table>` : `<p>${attachment ? 'See attached plant list.' : escapeHtml(plantList)}</p>`
    const emailSignature = '<p style="margin:24px 0 4px">Green Flow Nurseries</p><p style="margin:0 0 12px"><a href="tel:+18334989898" style="color:#0f4229;text-decoration:none">1-833-498-9898</a></p><img src="https://greenflownurseries.com/favicon.png" alt="Green Flow Nurseries" width="96" style="display:block;width:96px;height:auto;border:0">'

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: `${fromName} <${fromEmail}>`,
        to: [recipientEmail],
        reply_to: email,
        subject: `New quote request — ${companyName}`,
        html: `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#24352b"><h2>New Green Flow Nurseries website quote request</h2><table style="border-collapse:collapse">${rows}</table><h3>Plant list</h3>${plantTable}${emailSignature}</div>`,
        ...(attachment ? { attachments: [attachment] } : {}),
      }),
    })

    if (!resendResponse.ok) {
      const resendError = await resendResponse.text()
      console.error('Resend email failed:', resendResponse.status, resendError)
      throw new Error('The email service rejected the request.')
    }

    const result = await resendResponse.json()
    try {
      const customerDetails = [
        ['Fulfillment', clean(body.fulfillment, 40) || 'Not specified'],
        ['Location', clean(body.location, 160) || 'Not provided'],
        ['Required by', clean(body.requiredBy, 30) || 'Not provided'],
        ['Project notes', projectNotes || 'None'],
      ]
      const customerRows = customerDetails.map(([label, value]) => `<tr><th style="padding:8px;text-align:left;vertical-align:top;color:#0f4229">${escapeHtml(label)}</th><td style="padding:8px;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`).join('')
      const acknowledgementResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: `${fromName} <${fromEmail}>`, to: [email], reply_to: recipientEmail, subject: 'We received your quote request', html: `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#24352b"><h2 style="color:#0f4229">Thank you, ${escapeHtml(fullName)}.</h2><p>We have received your quote request and our nursery team will review it shortly.</p><p>If we need more information about availability, substitutions, delivery, or timing, we will contact you directly.</p><h3 style="color:#0f4229">Your request summary</h3><table style="border-collapse:collapse">${customerRows}</table><h3 style="color:#0f4229">Plant list</h3>${plantTable}${emailSignature}</div>` }),
      })
      if (!acknowledgementResponse.ok) console.error('Customer quote acknowledgement failed:', acknowledgementResponse.status, await acknowledgementResponse.text())
    } catch (acknowledgementError) {
      console.error('Customer quote acknowledgement failed:', acknowledgementError)
    }
    return response.status(200).json({ ok: true, id: result.id })
  } catch (error) {
    console.error('Resend quote submission failed:', error)
    const isValidationError = /attachment|unsupported/i.test(error.message)
    return response.status(isValidationError ? 400 : 500).json({
      error: isValidationError ? error.message : 'We could not send your request. Please try again or email us directly.',
    })
  }
}
