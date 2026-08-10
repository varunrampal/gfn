import React from 'react';
import { Link } from 'react-router-dom';

const BottomFeatures = () => (
  <section className="gfn-prefooter" aria-labelledby="gfn-prefooter-title">
    <div className="container">
      <div className="gfn-prefooter__heading">
        <div>
          <p>Work With GFN</p>
          <h2 id="gfn-prefooter-title">Plan your next plant order with confidence.</h2>
        </div>
        <p>
          Access current inventory, send your project requirements, or speak directly
          with our team in Mission, British Columbia.
        </p>
      </div>

      <div className="gfn-prefooter__grid">
        <a className="gfn-prefooter__item" href="/files/GFN_Availability_List.xlsx" download>
          <span className="gfn-prefooter__icon" aria-hidden="true"><i className="fa fa-clipboard-list" /></span>
          <span className="gfn-prefooter__copy">
            <small>Inventory Resource</small>
            <strong>Current Availability</strong>
            <span>Download the latest GFN availability list.</span>
          </span>
          <i className="fa fa-download gfn-prefooter__arrow" aria-hidden="true" />
        </a>

        <Link className="gfn-prefooter__item" to="/quote">
          <span className="gfn-prefooter__icon" aria-hidden="true"><i className="fa fa-file-signature" /></span>
          <span className="gfn-prefooter__copy">
            <small>Project Pricing</small>
            <strong>Request a Quote</strong>
            <span>Share quantities, sizes, and project timing.</span>
          </span>
          <i className="fa fa-arrow-right gfn-prefooter__arrow" aria-hidden="true" />
        </Link>

        <a className="gfn-prefooter__item" href="tel:+16042171351">
          <span className="gfn-prefooter__icon" aria-hidden="true"><i className="fa fa-phone-alt" /></span>
          <span className="gfn-prefooter__copy">
            <small>Speak With GFN</small>
            <strong>604-217-1351</strong>
            <span>Contact our team about your plant requirements.</span>
          </span>
          <i className="fa fa-arrow-right gfn-prefooter__arrow" aria-hidden="true" />
        </a>
      </div>
    </div>
  </section>
);

export default BottomFeatures;
