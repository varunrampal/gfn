import MicrosoftGraphQuoteForm from './MicrosoftGraphQuoteForm'

const ResendQuoteForm = () => (
  <MicrosoftGraphQuoteForm
    apiUrl="/api/quote-resend.php"
    successMessage="Thank you. Your quote request was sent to Green Flow Nurseries. We will get back to you shortly."
  />
)

export default ResendQuoteForm
