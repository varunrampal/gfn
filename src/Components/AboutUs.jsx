import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AboutImage from '../assets/images/about.jpg';

const AboutUs = () => {
  const location = useLocation();
  const hideLearnMore = Boolean(location.state?.hiddenParam);

  return (
    <section className="container-xxl py-5" aria-labelledby="about-gfn-title">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-3 col-md-5 wow fadeInUp" data-wow-delay="0.1s">
            <img
              className="img-fluid rounded"
              src={AboutImage}
              alt="Plant material growing at GFN in Mission, British Columbia"
            />
          </div>

          <div className="col-lg-6 col-md-7 wow fadeInUp" data-wow-delay="0.3s">
            <p className="fs-5 fw-bold text-primary mb-2">About GFN</p>
            <h2 className="display-5 mb-4" id="about-gfn-title">
              Commercial plant production for demanding projects
            </h2>
            <p className="mb-3">
              GFN is a commercial nursery based in Mission, British Columbia,
              specializing in the propagation and cultivation of BC native plant material.
              We supply wholesale plants for landscape, restoration, infrastructure,
              wetland, stream rehabilitation, mitigation, highway, and park projects.
            </p>
            <p className="mb-4">
              Our production focus and broad inventory help landscape professionals,
              contractors, developers, environmental consultants, and other project teams
              source dependable plant material for a range of site requirements. From
              availability planning to order fulfilment, our goal is to provide clear,
              responsive support throughout the purchasing process.
            </p>
            <p className="small text-muted mb-4">
              GFN is the customer-facing identity of Green Flow Nurseries Ltd.
            </p>
            {!hideLearnMore && (
              <Link to="/about" className="btn btn-primary py-3 px-4">
                Learn More About GFN
              </Link>
            )}
          </div>

          <div className="col-lg-3 col-md-12 wow fadeInUp" data-wow-delay="0.5s">
            <div className="row g-5">
              <div className="col-12 col-sm-6 col-lg-12">
                <div className="border-start ps-4">
                  <i className="fa fa-leaf fa-3x text-primary mb-3" aria-hidden="true" />
                  <h3 className="h4 mb-3">Commercial Plant Supply</h3>
                  <p className="mb-0 fs-6">
                    Wholesale material for landscape, restoration, infrastructure, and
                    environmental work.
                  </p>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-12">
                <div className="border-start ps-4">
                  <i className="fa fa-seedling fa-3x text-primary mb-3" aria-hidden="true" />
                  <h3 className="h4 mb-3">Native Plant Focus</h3>
                  <p className="mb-0 fs-6">
                    Propagation and cultivation focused on British Columbia native plant
                    material.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
