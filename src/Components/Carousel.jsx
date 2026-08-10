import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/images/carousel-2.jpg';

const Carousel = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/files/GFN_Availability_List.xlsx';
    link.download = 'GFN_Availability_List.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="gfn-hero" aria-labelledby="gfn-hero-title">
      <img
        className="gfn-hero__image"
        src={heroImage}
        alt="Commercial greenhouse plant production at GFN"
      />
      <div className="gfn-hero__overlay" />
      <div className="container gfn-hero__content">
        <div className="gfn-hero__copy wow fadeInUp" data-wow-delay="0.1s">
          <p className="gfn-hero__eyebrow">GFN · Green Flow Nurseries</p>
          <h1 id="gfn-hero-title">Commercial Plant Production at Scale</h1>
          <p className="gfn-hero__lead">
            Dependable plant material for landscape, restoration, infrastructure,
            and environmental projects across British Columbia.
          </p>
          <div className="gfn-hero__actions">
            <Link to="/quote" className="btn btn-primary gfn-hero__button">
              Request a Quote <i className="fa fa-arrow-right ms-2" aria-hidden="true" />
            </Link>
            <button
              type="button"
              className="btn gfn-hero__button gfn-hero__button--secondary"
              onClick={handleDownload}
            >
              View Current Availability <i className="fa fa-download ms-2" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
