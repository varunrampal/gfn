import React from 'react';

const TopBar = () => (
  <aside className="gfn-topbar" aria-label="GFN contact and ordering information">
    <div className="container-fluid gfn-topbar__inner">
      <div className="gfn-topbar__identity">
        <span className="gfn-topbar__mark" aria-hidden="true" />
        <span>Commercial Nursery</span>
        <span className="gfn-topbar__divider" aria-hidden="true" />
        <a
          href="https://www.google.com/maps/search/?api=1&query=35444+Hartley+Road+Mission+BC+V2V+0A8"
          target="_blank"
          rel="noreferrer"
        >
          Mission, BC
        </a>
      </div>

      <div className="gfn-topbar__contact">
        <a href="tel:+18334989898" aria-label="Call GFN toll-free at 1-833-498-9898">
          <i className="fa fa-phone-alt" aria-hidden="true" />
          <span>Toll-Free: 1-833-498-9898</span>
        </a>
        <a className="gfn-topbar__email" href="mailto:info@greenflownurseries.com">
          <i className="fa fa-envelope" aria-hidden="true" />
          <span>info@greenflownurseries.com</span>
        </a>
      </div>

      <div className="gfn-topbar__actions">
        <a href="/files/GFN_Availability_List.xlsx" download>
          Availability List <i className="fa fa-download" aria-hidden="true" />
        </a>
        <a className="gfn-topbar__quote" href="/quote">
          Request a Quote <i className="fa fa-arrow-right" aria-hidden="true" />
        </a>
      </div>
    </div>
  </aside>
);

export default TopBar;
