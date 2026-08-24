import { useRef, useState } from 'react'
import './MicrosoftGraphQuoteForm.css'

const MAX_ATTACHMENT_BYTES = 2.5 * 1024 * 1024
const ACCEPTED_FILE_TYPES = '.xlsx,.xls,.csv,.pdf,.doc,.docx,.jpg,.jpeg,.png'
const EMPTY_PLANT_ROWS = [
  { id: 1, plant: '', quantity: '', size: '' },
  { id: 2, plant: '', quantity: '', size: '' },
  { id: 3, plant: '', quantity: '', size: '' },
]

const initialStatus = { type: 'idle', message: '' }

const fileToBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.onload = () => resolve(String(reader.result).split(',')[1])
  reader.onerror = () => reject(new Error('The selected file could not be read.'))
  reader.readAsDataURL(file)
})

const MicrosoftGraphQuoteForm = ({
  apiUrl = import.meta.env.VITE_QUOTE_API_URL || '/api/quote',
  successMessage = 'Thank you. Your quote request was sent to Green Flow Nurseries. We will get back to you shortly.',
}) => {
  const formRef = useRef(null)
  const [attachment, setAttachment] = useState(null)
  const [status, setStatus] = useState(initialStatus)
  const [plantRows, setPlantRows] = useState(EMPTY_PLANT_ROWS)
  const nextPlantId = useRef(4)

  const selectAttachment = (event) => {
    const file = event.target.files?.[0]
    setStatus(initialStatus)

    if (!file) {
      setAttachment(null)
      return
    }

    if (file.size > MAX_ATTACHMENT_BYTES) {
      event.target.value = ''
      setAttachment(null)
      setStatus({ type: 'error', message: 'Please choose a file smaller than 2.5 MB.' })
      return
    }

    setAttachment(file)
  }

  const removeAttachment = () => {
    setAttachment(null)
    const input = formRef.current?.elements?.plantListFile
    if (input) input.value = ''
  }

  const updatePlantRow = (id, field, value) => {
    setPlantRows((rows) => rows.map((row) => row.id === id ? { ...row, [field]: value } : row))
  }

  const addPlantRow = () => {
    setPlantRows((rows) => [...rows, { id: nextPlantId.current++, plant: '', quantity: '', size: '' }])
  }

  const removePlantRow = (id) => {
    setPlantRows((rows) => rows.length === 1 ? EMPTY_PLANT_ROWS.slice(0, 1) : rows.filter((row) => row.id !== id))
  }

  const submitQuote = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const plantItems = plantRows
      .filter((row) => row.plant.trim() || row.quantity.trim() || row.size.trim())
      .map((row) => ({ plant: row.plant.trim(), quantity: row.quantity.trim(), size: row.size.trim() }))
    const plantList = plantItems
      .map((item, index) => `${index + 1}. ${item.plant || 'Plant not specified'} | Quantity: ${item.quantity || 'Not specified'} | Size: ${item.size || 'Not specified'}`)
      .join('\n')

    if (!plantList && !attachment) {
      setStatus({ type: 'error', message: 'Enter your plant requirements or attach a plant list.' })
      return
    }

    setStatus({ type: 'submitting', message: 'Sending your quote request…' })

    try {
      const encodedAttachment = attachment ? {
        name: attachment.name,
        contentType: attachment.type || 'application/octet-stream',
        contentBytes: await fileToBase64(attachment),
        size: attachment.size,
      } : null

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: data.get('companyName'),
          fullName: data.get('fullName'),
          email: data.get('email'),
          phone: data.get('phone'),
          fulfillment: data.get('fulfillment'),
          location: data.get('location'),
          requiredBy: data.get('requiredBy'),
          plantList,
          plantItems,
          projectNotes: data.get('projectNotes'),
          website: data.get('website'),
          attachment: encodedAttachment,
        }),
      })

      const result = await response.json().catch(() => ({}))
      if (!response.ok || !result.ok) throw new Error(result.error || 'Your request could not be sent. Please try again.')

      form.reset()
      setAttachment(null)
      setPlantRows(EMPTY_PLANT_ROWS)
      nextPlantId.current = 4
      setStatus({
        type: 'success',
        message: successMessage,
      })
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
    }
  }

  return (
    <section className="quote-request" aria-labelledby="quote-form-heading">
      <div className="quote-request__intro">
        <p className="quote-request__eyebrow">Wholesale plant pricing</p>
        <h2 id="quote-form-heading">Tell us what you need</h2>
        <p>Enter your requirements below or attach an existing plant list. We’ll review availability and follow up with you.</p>
      </div>

      <form ref={formRef} className="quote-request__form" onSubmit={submitQuote} noValidate={false}>
        <input className="quote-request__honeypot" type="text" name="website" tabIndex="-1" autoComplete="off" aria-hidden="true" />

        <fieldset>
          <legend>Contact information</legend>
          <div className="quote-request__grid">
            <label>Full name <span aria-hidden="true">*</span><input name="fullName" type="text" autoComplete="name" required /></label>
            <label>Company name <span aria-hidden="true">*</span><input name="companyName" type="text" autoComplete="organization" required /></label>
            <label>Email <span aria-hidden="true">*</span><input name="email" type="email" autoComplete="email" required /></label>
            <label>Phone number <span className="quote-request__optional">Optional</span><input name="phone" type="tel" autoComplete="tel" /></label>
          </div>
        </fieldset>

        <fieldset>
          <legend>Order details</legend>
          <div className="quote-request__grid">
            <label>Delivery or pickup<select name="fulfillment" defaultValue=""><option value="">Select an option</option><option value="Delivery">Delivery</option><option value="Pickup">Pickup</option><option value="Not sure">Not sure</option></select></label>
            <label>Delivery city or postal code <span className="quote-request__optional">Optional</span><input name="location" type="text" autoComplete="postal-code" /></label>
            <label>Required-by date <span className="quote-request__optional">Optional</span><input name="requiredBy" type="date" /></label>
          </div>
        </fieldset>

        <fieldset>
          <legend>Plant requirements</legend>
          <p className="quote-request__plant-help">Add one plant per row. Approximate quantities and sizes are welcome.</p>
          <div className="quote-request__plant-head" aria-hidden="true"><span>Plant or species</span><span>Quantity</span><span>Size</span><span></span></div>
          <div className="quote-request__plant-rows">
            {plantRows.map((row, index) => (
              <div className="quote-request__plant-row" key={row.id}>
                <label>Plant or species <span className="quote-request__row-number">{index + 1}</span><input type="text" value={row.plant} onChange={(event) => updatePlantRow(row.id, 'plant', event.target.value)} placeholder="e.g. Red Maple" /></label>
                <label>Quantity<input type="text" inputMode="numeric" value={row.quantity} onChange={(event) => updatePlantRow(row.id, 'quantity', event.target.value)} placeholder="e.g. 20" /></label>
                <label>Size<input type="text" value={row.size} onChange={(event) => updatePlantRow(row.id, 'size', event.target.value)} placeholder="e.g. 10-gallon" /></label>
                <button className="quote-request__remove-plant" type="button" onClick={() => removePlantRow(row.id)} aria-label={`Remove plant row ${index + 1}`}>×</button>
              </div>
            ))}
          </div>
          <button className="quote-request__add-plant" type="button" onClick={addPlantRow}>+ Add another plant</button>

          <div className="quote-request__upload">
            <label htmlFor="plant-list-file">Attach your plant list</label>
            <p>Excel, CSV, PDF, Word, JPG or PNG — maximum 2.5 MB.</p>
            <input id="plant-list-file" name="plantListFile" type="file" accept={ACCEPTED_FILE_TYPES} onChange={selectAttachment} />
            {attachment && (
              <div className="quote-request__file" aria-live="polite">
                <span>{attachment.name} ({(attachment.size / 1024).toFixed(0)} KB)</span>
                <button type="button" onClick={removeAttachment}>Remove</button>
              </div>
            )}
          </div>

          <label className="quote-request__full-label" htmlFor="project-notes">Project notes <span className="quote-request__optional">Optional</span></label>
          <textarea id="project-notes" name="projectNotes" rows="3" placeholder="Substitutions, specifications, delivery details, or other project information" />
        </fieldset>

        {status.message && <div className={`quote-request__status quote-request__status--${status.type}`} role={status.type === 'error' ? 'alert' : 'status'}>{status.message}</div>}

        <button className="btn btn-primary quote-request__submit" type="submit" disabled={status.type === 'submitting'}>
          {status.type === 'submitting' ? 'Sending request…' : 'Request My Quote'}
        </button>
      </form>
    </section>
  )
}

export default MicrosoftGraphQuoteForm
