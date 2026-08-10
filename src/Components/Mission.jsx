import React from 'react';
import { Link } from 'react-router-dom';

const missionPoints = [
  {
    icon: 'fa-boxes',
    title: 'Dependable Supply',
    text: 'Clear availability and responsive order support for wholesale customers.',
  },
  {
    icon: 'fa-project-diagram',
    title: 'Project Focus',
    text: 'Plant material suited to commercial landscape and environmental applications.',
  },
  {
    icon: 'fa-seedling',
    title: 'Growing Expertise',
    text: 'Focused knowledge in the propagation and cultivation of BC native plants.',
  },
];

const Mission = () => (
  <section className="container-xxl py-5" aria-labelledby="mission-title">
    <div className="container">
      <div className="row g-5 align-items-center">
        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
          <p className="fs-5 fw-bold text-primary mb-2">Our Mission</p>
          <h2 className="display-5 mb-4" id="mission-title">
            Helping projects succeed from the ground up
          </h2>
          <p className="mb-3">
            GFN’s mission is to produce dependable plant material and make commercial
            nursery purchasing straightforward. We combine focused horticultural knowledge
            with practical service so customers can plan, source, and receive the plants
            their projects require.
          </p>
          <p className="mb-4">
            We are committed to consistent communication, responsible growing practices,
            and careful order fulfilment. Whether an order supports a landscape installation,
            habitat restoration, wetland, stream, highway, or park project, our team works
            to understand the requirements and provide suitable material from available stock.
          </p>
          <Link to="/contact" className="btn btn-primary py-3 px-4">
            Discuss Your Project
          </Link>
        </div>

        <div className="col-lg-6">
          <div className="row g-4">
            {missionPoints.map((point, index) => (
              <div className="col-md-4 col-lg-12 wow fadeIn" data-wow-delay={`${0.3 + index * 0.2}s`} key={point.title}>
                <article className="d-flex align-items-center rounded p-4 h-100 mission-point">
                  <div
                    className="btn-square bg-light rounded-circle flex-shrink-0 me-4"
                    style={{ width: '72px', height: '72px' }}
                  >
                    <i className={`fa ${point.icon} fa-2x text-primary`} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="h4 mb-2">{point.title}</h3>
                    <p className="mb-0 fs-6">{point.text}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Mission;
