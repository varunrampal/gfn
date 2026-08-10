import React from 'react';
import { Link } from 'react-router-dom';
import propagationImage from '../assets/images/about.jpg';
import nurseryImage from '../assets/images/carousel-2.jpg';
import growthImage from '../assets/images/about3.jpg';

const sectors = [
  { icon: 'fa-tree', title: 'Commercial Landscape', text: 'Plant material for professional landscape installations and managed sites.' },
  { icon: 'fa-water', title: 'Restoration & Wetlands', text: 'Native material for habitat, wetland, stream, and mitigation projects.' },
  { icon: 'fa-road', title: 'Infrastructure', text: 'Wholesale supply for highway, public-realm, and infrastructure-related planting.' },
  { icon: 'fa-drafting-compass', title: 'Project Teams', text: 'Responsive support for contractors, developers, consultants, and landscape professionals.' },
];

const approach = [
  { number: '01', title: 'Understand the requirement', text: 'We begin with the plant list, sizes, quantities, project location, and required timing.' },
  { number: '02', title: 'Confirm suitable material', text: 'Our team reviews available stock and helps clarify formats or practical alternatives where appropriate.' },
  { number: '03', title: 'Prepare for fulfilment', text: 'Orders are coordinated and prepared with clear communication through the purchasing process.' },
];

const About = () => (
  <main className="about-page">
    <header className="about-page-hero">
      <img src={nurseryImage} alt="Greenhouse plant production at GFN" />
      <div className="about-page-hero__overlay" />
      <div className="container about-page-hero__content">
        <p>About GFN</p>
        <h1>
          <span>Growing capability.</span>
          <span>Grounded expertise.</span>
        </h1>
        <span>Commercial plant production in Mission, British Columbia.</span>
      </div>
    </header>

    <section className="about-story" aria-labelledby="about-story-title">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <div className="about-story__visual">
              <img className="about-story__primary" src={propagationImage} alt="Young propagated plant material" />
              <img className="about-story__secondary" src={growthImage} alt="Young plant supported in soil" />
              <div className="about-story__caption">
                <strong>GFN</strong>
                <span>Green Flow Nurseries</span>
              </div>
            </div>
          </div>
          <div className="col-lg-6 about-story__copy">
            <p className="gfn-section-label">Who We Are</p>
            <h2 className="display-5 mb-4" id="about-story-title">A commercial nursery focused on dependable plant supply</h2>
            <p>
              GFN specializes in the propagation and cultivation of British Columbia native
              plant material. From our nursery in Mission, we serve wholesale customers
              working across landscape, restoration, infrastructure, and environmental sectors.
            </p>
            <p>
              Our role extends beyond growing plants. We help customers understand current
              availability, review plant formats, and coordinate orders around real project
              requirements. The result is a practical, professional purchasing experience
              supported by focused horticultural knowledge.
            </p>
            <div className="about-story__legal">
              <i className="fa fa-building" aria-hidden="true" />
              <p><strong>GFN</strong> is the customer-facing identity of Green Flow Nurseries Ltd.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="about-sectors" aria-labelledby="about-sectors-title">
      <div className="container">
        <div className="about-section-heading">
          <div>
            <p className="gfn-section-label">Where We Add Value</p>
            <h2 className="display-6 mb-0" id="about-sectors-title">Built around commercial and environmental work</h2>
          </div>
          <p>GFN supports customers who need appropriate plant material, dependable availability information, and clear order coordination.</p>
        </div>
        <div className="row g-4">
          {sectors.map((sector, index) => (
            <div className="col-md-6 col-xl-3" key={sector.title}>
              <article className="about-sector-card">
                <span className="about-sector-card__index">0{index + 1}</span>
                <i className={`fa ${sector.icon}`} aria-hidden="true" />
                <h3>{sector.title}</h3>
                <p>{sector.text}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="about-approach" aria-labelledby="about-approach-title">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-4">
            <p className="gfn-section-label">Our Approach</p>
            <h2 className="display-6 mb-4" id="about-approach-title">Straightforward support from inquiry to fulfilment</h2>
            <p>Clear information and practical coordination help customers make confident purchasing decisions.</p>
          </div>
          <div className="col-lg-8">
            <div className="about-approach__steps">
              {approach.map((step) => (
                <article className="about-approach__step" key={step.number}>
                  <span>{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="about-cta">
      <div className="container">
        <div className="about-cta__panel">
          <div>
            <p>Planning a landscape or environmental project?</p>
            <h2>Let’s discuss your plant requirements.</h2>
          </div>
          <div className="about-cta__actions">
            <Link to="/plants" className="btn btn-outline-light py-3 px-4">Explore Plants</Link>
            <Link to="/quote" className="btn btn-primary py-3 px-4">Request a Quote</Link>
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default About;
