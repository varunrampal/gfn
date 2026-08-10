import React from 'react';
import { Link } from 'react-router-dom';

const capabilities = [
  {
    icon: 'fa-seedling',
    title: 'Propagation & Production',
    description:
      'Focused propagation and cultivation to support a dependable supply of commercial plant material.',
  },
  {
    icon: 'fa-leaf',
    title: 'Native & Restoration Plants',
    description:
      'BC native plants for habitat restoration, wetlands, stream rehabilitation, mitigation, and landscape work.',
  },
  {
    icon: 'fa-box-open',
    title: 'Plant Sizes & Formats',
    description:
      'A range of container sizes, balled-and-burlapped trees, and seasonal live stakes, subject to availability.',
  },
  {
    icon: 'fa-project-diagram',
    title: 'Commercial Project Supply',
    description:
      'Wholesale material for contractors, developers, landscape professionals, and environmental project teams.',
  },
  {
    icon: 'fa-clipboard-check',
    title: 'Availability & Order Planning',
    description:
      'Current inventory information and responsive coordination to help customers plan plant requirements.',
  },
  {
    icon: 'fa-truck-loading',
    title: 'Order Fulfilment',
    description:
      'Careful order preparation and practical communication from initial inquiry through fulfilment.',
  },
];

const Capabilities = () => (
  <section className="gfn-capabilities-section" aria-labelledby="capabilities-title">
    <div className="container">
      <div className="row align-items-end g-4 mb-5">
        <div className="col-lg-8">
          <p className="gfn-section-label">What GFN Does</p>
          <h2 className="display-5 mb-3" id="capabilities-title">
            Nursery capabilities built around project requirements
          </h2>
          <p className="gfn-capabilities-section__intro mb-0">
            From propagation and growing through availability planning and order
            fulfilment, GFN supports the practical needs of commercial landscape and
            environmental planting projects.
          </p>
        </div>
        <div className="col-lg-4 text-lg-end">
          <Link to="/sales/information" className="gfn-text-link">
            Review sales information <i className="fa fa-arrow-right ms-2" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="row g-4">
        {capabilities.map((capability, index) => (
          <div className="col-md-6 col-xl-4 wow fadeInUp" data-wow-delay={`${0.1 + (index % 3) * 0.15}s`} key={capability.title}>
            <article className="gfn-capabilities-card">
              <span className="gfn-capabilities-card__number" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="gfn-capabilities-card__icon" aria-hidden="true">
                <i className={`fa ${capability.icon}`} />
              </span>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
            </article>
          </div>
        ))}
      </div>

      <div className="gfn-capabilities-section__actions">
        <Link to="/plants" className="btn btn-primary py-3 px-4">
          Explore Plant Availability
        </Link>
        <Link to="/quote" className="btn btn-outline-primary py-3 px-4">
          Request a Quote
        </Link>
      </div>
    </div>
  </section>
);

export default Capabilities;
