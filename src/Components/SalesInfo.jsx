import React from 'react';
import { Link } from 'react-router-dom';

const containerSizes = [
  ['72 plug', '3.7 cm × 5.7 cm'],
  ['50 plug', '4.3 cm × 11.4 cm'],
  ['38 plug', '5.4 cm × 12.7 cm'],
  ['10 cm pot', '18 per tray'],
  ['15 cm pot', '#1'],
  ['21 cm pot', '#2'],
  ['25.4 × 20.3 cm pot', '#3'],
  ['26.3 × 30.7 cm pot', '#5'],
  ['36 cm pot', '#7'],
  ['40 cm pot', '#10'],
  ['44 cm pot', '#15'],
  ['38 × 38 cm', 'Bag'],
];

const substitutionGroups = [
  {
    icon: 'fa-map-marked-alt',
    title: 'Site Conditions',
    items: ['Biogeoclimatic zone', 'Elevation and subzone', 'Hydrology and groundwater', 'Soil type', 'Sun and weather exposure'],
  },
  {
    icon: 'fa-seedling',
    title: 'Plant Characteristics',
    items: ['Plant type and mature size', 'Branching, roots, and leaves', 'Disease considerations', 'Ecological adaptations', 'Typical plant associates'],
  },
  {
    icon: 'fa-water',
    title: 'Habitat Context',
    items: ['Proximity to water', 'Water and salt tolerance', 'Soil and shade tolerance', 'Purpose of planting', 'Season and timing'],
  },
  {
    icon: 'fa-people-arrows',
    title: 'Project Fit',
    items: ['Best use of the species', 'Compatibility with nearby plants', 'Site access and visibility', 'Potential human conflicts', 'Long-term site requirements'],
  },
];

const SalesInfo = () => (
  <main className="sales-info-page">
    <section className="sales-intro">
      <div className="container">
        <div className="row g-4 align-items-end">
          <div className="col-lg-8">
            <p className="gfn-section-label">Plant Formats</p>
            <h2 className="display-5 mb-3">Container sizes for varied project needs</h2>
            <p className="sales-intro__text mb-0">
              GFN offers a range of commonly requested container sizes. We also supply
              balled-and-burlapped trees, both spade- and hand-dug, in various heights and
              calipers. Plant sizes meet or exceed applicable BCLNA standards for their
              respective containers.
            </p>
          </div>
          <div className="col-lg-4">
            <aside className="sales-note">
              <i className="fa fa-info-circle" aria-hidden="true" />
              <p>
                Sizes and stock vary. Contact GFN for current availability, pricing, or a
                quote based on specific requirements.
              </p>
            </aside>
          </div>
        </div>
      </div>
    </section>

    <section className="sales-size-section" aria-labelledby="container-size-title">
      <div className="container">
        <div className="sales-section-heading">
          <span className="sales-section-heading__icon" aria-hidden="true"><i className="fa fa-box-open" /></span>
          <div>
            <p className="gfn-section-label mb-1">Quick Reference</p>
            <h2 className="h2 mb-0" id="container-size-title">Common container sizes</h2>
          </div>
        </div>
        <div className="sales-size-grid">
          {containerSizes.map(([format, equivalent]) => (
            <div className="sales-size-item" key={format}>
              <strong>{format}</strong>
              <span>{equivalent}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="sales-live-stakes">
      <div className="container">
        <div className="sales-live-stakes__panel">
          <div className="sales-live-stakes__icon" aria-hidden="true"><i className="fa fa-tree" /></div>
          <div>
            <p className="gfn-section-label mb-2">Seasonal Material</p>
            <h2 className="mb-3">Live stakes</h2>
            <p className="mb-3">
              Live stakes of <em>Physocarpus</em>, <em>Cornus</em>, <em>Rubus</em>,
              <em> Populus</em>, and <em>Salix</em> are available in limited quantities from
              January through March, weather permitting.
            </p>
            <p className="mb-0">
              Willow cuttings are the most frequently requested. Nursery mother stock includes
              <em> Salix hookeriana</em>, <em>Salix sitchensis</em>, <em>Salix scouleriana</em>,
              and <em>Salix lasiandra</em>.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="sales-substitutions" aria-labelledby="substitutions-title">
      <div className="container">
        <div className="text-center mx-auto sales-substitutions__heading">
          <p className="gfn-section-label">Planning Guidance</p>
          <h2 className="display-6 mb-3" id="substitutions-title">Selecting an appropriate plant substitution</h2>
          <p className="mb-0">
            Requested material may occasionally be unavailable when needed. Any substitute
            should be evaluated carefully against the site, plant, habitat, and project context.
          </p>
        </div>
        <div className="row g-4">
          {substitutionGroups.map((group) => (
            <div className="col-md-6 col-xl-3" key={group.title}>
              <article className="sales-substitution-card">
                <span className="sales-substitution-card__icon" aria-hidden="true"><i className={`fa ${group.icon}`} /></span>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="sales-cta">
      <div className="container">
        <div className="sales-cta__panel">
          <div>
            <p className="gfn-section-label mb-2">Plan Your Order</p>
            <h2 className="mb-2">Need current availability or project pricing?</h2>
            <p className="mb-0">Share your plant list, quantities, sizes, and required timing with GFN.</p>
          </div>
          <div className="sales-cta__actions">
            <Link to="/plants" className="btn btn-outline-light py-3 px-4">View Plants</Link>
            <Link to="/quote" className="btn btn-primary py-3 px-4">Request a Quote</Link>
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default SalesInfo;
