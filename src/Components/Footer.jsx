import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/files/GFN_Availability_List.xlsx';
    link.download = 'GFN_Availability_List.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <footer className="gfn-footer">
      <div className="gfn-footer__top">
        <div className="container">
          <div className="row g-5">
            <div className="col-xl-4 col-lg-5">
              <Link to="/" className="gfn-footer__brand" aria-label="GFN home">
                <span>GFN</span>
                <small>Green Flow Nurseries</small>
              </Link>
              <p className="gfn-footer__intro">
                Commercial plant production and wholesale native plant supply for
                landscape, restoration, infrastructure, and environmental projects
                across British Columbia.
              </p>
              <Link to="/quote" className="btn btn-primary py-3 px-4">
                Request a Quote <i className="fa fa-arrow-right ms-2" aria-hidden="true" />
              </Link>
            </div>

            <div className="col-6 col-lg-2">
              <h2 className="gfn-footer__heading">Explore</h2>
              <nav className="gfn-footer__links" aria-label="Footer explore navigation">
                <Link to="/">Home</Link>
                <Link to="/about">About GFN</Link>
                <Link to="/plants">Plant Inventory</Link>
                <Link to="/gallery">Gallery</Link>
                <Link to="/contact">Contact</Link>
              </nav>
            </div>

            <div className="col-6 col-lg-2">
              <h2 className="gfn-footer__heading">Resources</h2>
              <nav className="gfn-footer__links" aria-label="Footer resource navigation">
                <Link to="/sales/information">Sales Information</Link>
                <Link to="/quote">Request a Quote</Link>
                <button type="button" onClick={handleDownload}>Availability List</button>
              </nav>
            </div>

            <div className="col-xl-4 col-lg-3">
              <h2 className="gfn-footer__heading">Visit & Contact</h2>
              <address className="gfn-footer__contact">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=35444+Hartley+Road+Mission+BC+V2V+0A8"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fa fa-map-marker-alt" aria-hidden="true" />
                  <span>35444 Hartley Road<br />Mission, BC V2V 0A8</span>
                </a>
                <a href="tel:+18334989898">
                  <i className="fa fa-phone-alt" aria-hidden="true" />
                  <span><small>Toll-Free</small>1-833-498-9898</span>
                </a>
                <a href="mailto:info@greenflownurseries.com">
                  <i className="fa fa-envelope" aria-hidden="true" />
                  <span>info@greenflownurseries.com</span>
                </a>
              </address>
              <a
                className="gfn-footer__map-link"
                href="https://www.google.com/maps/search/?api=1&query=35444+Hartley+Road+Mission+BC+V2V+0A8"
                target="_blank"
                rel="noreferrer"
              >
                View location <i className="fa fa-external-link-alt ms-2" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="gfn-footer__bottom">
        <div className="container gfn-footer__legal">
          <p>© {new Date().getFullYear()} Green Flow Nurseries Ltd. All rights reserved.</p>
          <p>GFN is the customer-facing identity of Green Flow Nurseries Ltd.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
