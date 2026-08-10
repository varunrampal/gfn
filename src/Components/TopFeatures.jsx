import React from 'react';

const capabilities = [
  {
    icon: 'fa-industry',
    title: 'Production Capability',
    description: 'Organized growing capacity for dependable commercial plant supply.',
  },
  {
    icon: 'fa-seedling',
    title: 'Native Plant Expertise',
    description: 'Plant material for landscape, restoration, and environmental applications.',
  },
  {
    icon: 'fa-truck',
    title: 'Project-Ready Supply',
    description: 'Responsive availability and order support for demanding project schedules.',
  },
];

const TopFeatures = () => (
  <section className="gfn-capabilities" aria-label="GFN capabilities">
    <div className="container">
      <div className="row g-0 gfn-capabilities__grid">
        {capabilities.map((capability, index) => (
          <div
            className="col-lg-4 wow fadeIn"
            data-wow-delay={`${0.1 + index * 0.2}s`}
            key={capability.title}
          >
            <article className="gfn-capability">
              <span className="gfn-capability__icon" aria-hidden="true">
                <i className={`fa ${capability.icon}`} />
              </span>
              <div>
                <h2>{capability.title}</h2>
                <p>{capability.description}</p>
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TopFeatures;
