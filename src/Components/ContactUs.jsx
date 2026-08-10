import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import ReactJsAlert from 'reactjs-alert';

const contactDetails = [
  {
    icon: 'fa-phone-alt',
    label: 'Toll-Free',
    value: '1-833-498-9898',
    href: 'tel:+18334989898',
  },
  {
    icon: 'fa-phone-alt',
    label: 'Local',
    value: '604-217-1351',
    href: 'tel:+16042171351',
  },
  {
    icon: 'fa-envelope',
    label: 'Email',
    value: 'info@greenflownurseries.com',
    href: 'mailto:info@greenflownurseries.com',
  },
  {
    icon: 'fa-map-marker-alt',
    label: 'Visit',
    value: '35444 Hartley Road, Mission, BC V2V 0A8',
    href: 'https://www.google.com/maps/search/?api=1&query=35444+Hartley+Road+Mission+BC+V2V+0A8',
    external: true,
  },
];

const ContactUs = () => {
  const form = useRef();
  const [alert, setAlert] = useState({ status: false, type: 'success', title: '' });
  const [submitting, setSubmitting] = useState(false);

  const sendEmail = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      await emailjs.sendForm('service_9wwh682', 'template_btoua8k', form.current, {
        publicKey: 'LjissUB9pujYt6oa7',
      });
      form.current.reset();
      setAlert({
        status: true,
        type: 'success',
        title: 'Thank you for your inquiry. Our team will get back to you as soon as possible.',
      });
    } catch {
      setAlert({
        status: true,
        type: 'error',
        title: 'Your message could not be sent. Please call or email GFN directly.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="contact-page">
      <section className="contact-main">
        <div className="container">
          <div className="row g-5 align-items-start">
            <div className="col-lg-5 wow fadeInUp" data-wow-delay="0.1s">
              <p className="gfn-section-label">Start a Conversation</p>
              <h2 className="display-5 mb-4">Discuss your plant requirements with GFN</h2>
              <p className="contact-main__intro">
                Contact our team for current inventory, plant sizes, project pricing, or
                help planning a wholesale order. Including quantities, required sizes,
                project location, and timing will help us respond efficiently.
              </p>

              <div className="contact-details">
                {contactDetails.map((detail) => (
                  <a
                    className="contact-detail"
                    href={detail.href}
                    target={detail.external ? '_blank' : undefined}
                    rel={detail.external ? 'noreferrer' : undefined}
                    key={detail.label}
                  >
                    <span className="contact-detail__icon" aria-hidden="true">
                      <i className={`fa ${detail.icon}`} />
                    </span>
                    <span>
                      <small>{detail.label}</small>
                      <strong>{detail.value}</strong>
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="col-lg-7 wow fadeInUp" data-wow-delay="0.2s">
              <div className="contact-form-card">
                <div className="contact-form-card__heading">
                  <div>
                    <p className="gfn-section-label mb-2">Project Inquiry</p>
                    <h2 className="h2 mb-2">How can we help?</h2>
                    <p className="mb-0">Complete the form and a member of the GFN team will follow up.</p>
                  </div>
                  <span className="contact-form-card__badge" aria-hidden="true"><i className="fa fa-paper-plane" /></span>
                </div>

                <form ref={form} onSubmit={sendEmail}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="contact-field-label" htmlFor="name">Name *</label>
                      <input className="form-control contact-field" id="name" name="name" type="text" autoComplete="name" required />
                    </div>
                    <div className="col-md-6">
                      <label className="contact-field-label" htmlFor="company">Company</label>
                      <input className="form-control contact-field" id="company" name="company" type="text" autoComplete="organization" />
                    </div>
                    <div className="col-md-6">
                      <label className="contact-field-label" htmlFor="email">Email *</label>
                      <input className="form-control contact-field" id="email" name="email" type="email" autoComplete="email" required />
                    </div>
                    <div className="col-md-6">
                      <label className="contact-field-label" htmlFor="phone">Phone</label>
                      <input className="form-control contact-field" id="phone" name="phone" type="tel" autoComplete="tel" />
                    </div>
                    <div className="col-12">
                      <label className="contact-field-label" htmlFor="project">Project name or location</label>
                      <input className="form-control contact-field" id="project" name="project" type="text" />
                    </div>
                    <div className="col-12">
                      <label className="contact-field-label" htmlFor="message">Plant requirements or message *</label>
                      <textarea className="form-control contact-field contact-field--message" id="message" name="message" required />
                    </div>
                    <div className="col-12 contact-form-card__submit">
                      <button className="btn btn-primary py-3 px-4" type="submit" disabled={submitting}>
                        {submitting ? 'Sending…' : 'Send Inquiry'}
                        {!submitting && <i className="fa fa-arrow-right ms-2" aria-hidden="true" />}
                      </button>
                      <small>Fields marked with * are required.</small>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-location" aria-labelledby="contact-location-title">
        <div className="container">
          <div className="contact-location__heading">
            <div>
              <p className="gfn-section-label mb-2">Our Location</p>
              <h2 className="display-6 mb-0" id="contact-location-title">GFN in Mission, British Columbia</h2>
            </div>
            <a
              className="gfn-text-link"
              href="https://www.google.com/maps/search/?api=1&query=35444+Hartley+Road+Mission+BC+V2V+0A8"
              target="_blank"
              rel="noreferrer"
            >
              Open in Google Maps <i className="fa fa-external-link-alt ms-2" aria-hidden="true" />
            </a>
          </div>
          <div className="contact-location__map">
            <iframe
              title="GFN location in Mission, British Columbia"
              src="https://www.google.com/maps?q=35444+Hartley+Road,+Mission,+BC,+V2V+0A8&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <ReactJsAlert
        status={alert.status}
        type={alert.type}
        title={alert.title}
        Close={() => setAlert((current) => ({ ...current, status: false }))}
      />
    </main>
  );
};

export default ContactUs;
