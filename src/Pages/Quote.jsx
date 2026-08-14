import React from 'react'
import ResendQuoteForm from '../Components/ResendQuoteForm'

const Quote = () => {
  return (
    <>
    <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container text-center py-5">
            <h1 className="display-3 text-white mb-4 animated slideInDown">Get A Quote</h1>
        </div>
    </div>
    <ResendQuoteForm />
</>
  )
}

export default Quote
