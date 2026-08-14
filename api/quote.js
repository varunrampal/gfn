/* global process */
const SENDER = 'info@gfnplants.ca'
const MAX_ATTACHMENT_BYTES = 2.5 * 1024 * 1024
const ALLOWED_EXTENSIONS = new Set(['xlsx', 'xls', 'csv', 'pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'])
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const clean = (value, maxLength = 500) => String(value || '').trim().slice(0, maxLength)
const escapeHtml = (value) => clean(value, 5000).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;',
}[character]))

const getAccessToken = async () => {
  const { MS_GRAPH_TENANT_ID, MS_GRAPH_CLIENT_ID, MS_GRAPH_CLIENT_SECRET } = process.env
  if (!MS_GRAPH_TENANT_ID || !MS_GRAPH_CLIENT_ID || !MS_GRAPH_CLIENT_SECRET) {
    throw new Error('Microsoft Graph is not configured.')
  }

  const tokenResponse = await fetch(`https://login.microsoftonline.com/${encodeURIComponent(MS_GRAPH_TENANT_ID)}/oauth2/v2.0/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: MS_GRAPH_CLIENT_ID,
      client_secret: MS_GRAPH_CLIENT_SECRET,
      scope: 'https://graph.microsoft.com/.default',
      grant_type: 'client_credentials',
    }),
  })

  const token = await tokenResponse.json()
  if (!tokenResponse.ok || !token.access_token) throw new Error('Microsoft Graph authentication failed.')
  return token.access_token
}

const validateAttachment = (attachment) => {
  if (!attachment) return null
  const name = clean(attachment.name, 180)
  const extension = name.split('.').pop()?.toLowerCase()
  const size = Number(attachment.size)
  if (!name || !ALLOWED_EXTENSIONS.has(extension)) throw new Error('Unsupported attachment type.')
  if (!Number.isFinite(size) || size <= 0 || size > MAX_ATTACHMENT_BYTES) throw new Error('The attachment must be smaller than 2.5 MB.')
  if (!attachment.contentBytes || typeof attachment.contentBytes !== 'string') throw new Error('The attachment is invalid.')
  return {
    '@odata.type': '#microsoft.graph.fileAttachment',
    name,
    contentType: clean(attachment.contentType, 100) || 'application/octet-stream',
    contentBytes: attachment.contentBytes,
  }
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
    const attachment = validateAttachment(body.attachment)

    if (!fullName || !companyName || !EMAIL_PATTERN.test(email)) {
      return response.status(400).json({ error: 'Please provide your name, company, and a valid email address.' })
    }
    if (!plantList && !attachment) {
      return response.status(400).json({ error: 'Enter your plant requirements or attach a plant list.' })
    }

    const details = [
      ['Name', fullName],
      ['Company', companyName],
      ['Email', email],
      ['Phone', clean(body.phone, 60) || 'Not provided'],
      ['Fulfillment', clean(body.fulfillment, 40) || 'Not specified'],
      ['Location', clean(body.location, 160) || 'Not provided'],
      ['Required by', clean(body.requiredBy, 30) || 'Not provided'],
      ['Plant requirements', plantList || 'See attached plant list'],
      ['Additional notes', clean(body.additionalNotes, 3000) || 'None'],
    ]
    const rows = details.map(([label, value]) => `<tr><th style="padding:8px;text-align:left;vertical-align:top">${escapeHtml(label)}</th><td style="padding:8px;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`).join('')
    const accessToken = await getAccessToken()
    const graphResponse = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(SENDER)}/sendMail`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: {
          subject: `New quote request — ${companyName}`,
          body: { contentType: 'HTML', content: `<h2>New website quote request</h2><table style="border-collapse:collapse">${rows}</table>` },
          toRecipients: [{ emailAddress: { address: SENDER } }],
          replyTo: [{ emailAddress: { name: fullName, address: email } }],
          ...(attachment ? { attachments: [attachment] } : {}),
        },
        saveToSentItems: true,
      }),
    })

    if (!graphResponse.ok) {
      const graphError = await graphResponse.text()
      console.error('Microsoft Graph sendMail failed:', graphResponse.status, graphError)
      throw new Error('The email service rejected the request.')
    }

    return response.status(200).json({ ok: true })
  } catch (error) {
    console.error('Quote submission failed:', error)
    const isValidationError = /attachment|unsupported/i.test(error.message)
    return response.status(isValidationError ? 400 : 500).json({
      error: isValidationError ? error.message : 'We could not send your request. Please try again or email info@gfnplants.ca.',
    })
  }
}
