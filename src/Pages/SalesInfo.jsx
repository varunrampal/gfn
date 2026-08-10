import React from 'react';
import SalesInfo from '../Components/SalesInfo';

const SalesInformation = () => (
  <>
    <header className="container-fluid page-header sales-page-header py-5 mb-0 wow fadeIn" data-wow-delay="0.1s">
      <div className="container text-center py-5">
        <p className="sales-page-header__eyebrow">Ordering Resources</p>
        <h1 className="display-3 text-white mb-3 animated slideInDown">Sales Information</h1>
        <p className="sales-page-header__lead mx-auto mb-0">
          Plant formats, seasonal material, and practical guidance for planning your order.
        </p>
      </div>
    </header>
    <SalesInfo />
  </>
);

export default SalesInformation;
