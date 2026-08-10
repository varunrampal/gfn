import React from 'react';
import ContactUs from '../Components/ContactUs';

const Contact = () => (
  <>
    <header className="container-fluid page-header contact-page-header py-5 mb-0 wow fadeIn" data-wow-delay="0.1s">
      <div className="container text-center py-5">
        <p className="contact-page-header__eyebrow">Connect With GFN</p>
        <h1 className="display-3 text-white mb-3 animated slideInDown">Contact Our Team</h1>
        <p className="contact-page-header__lead mx-auto mb-0">
          Tell us about your plant requirements, project schedule, or availability needs.
        </p>
      </div>
    </header>
    <ContactUs />
  </>
);

export default Contact;
