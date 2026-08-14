import MicrosoftGraphQuoteForm from './MicrosoftGraphQuoteForm'

const ResendQuoteForm = () => (
  <MicrosoftGraphQuoteForm
    apiUrl={import.meta.env.VITE_RESEND_QUOTE_API_URL || '/api/quote-resend'}
    successMessage="Thank you. Your quote request was sent to Green Flow Nurseries. We will get back to you shortly."
  />
)

export default ResendQuoteForm
