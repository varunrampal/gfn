import React, { useMemo, useState } from 'react';
import plants from '../json/PlantsList.json';
import carouselOne from '../assets/images/carousel-1.jpg';
import carouselTwo from '../assets/images/carousel-2.jpg';
import aboutOne from '../assets/images/about.jpg';
import aboutTwo from '../assets/images/about1.jpg';
import aboutThree from '../assets/images/about2.jpg';
import serviceOne from '../assets/images/service-1.jpg';

const nurseryImages = [
  {
    id: 'nursery-1',
    title: 'Green Flow Nursery',
    category: 'Nursery',
    src: carouselOne,
  },
  {
    id: 'nursery-2',
    title: 'Growing Area',
    category: 'Nursery',
    src: carouselTwo,
  },
  {
    id: 'nursery-3',
    title: 'Native Plant Stock',
    category: 'Nursery',
    src: aboutOne,
  },
  {
    id: 'nursery-4',
    title: 'Propagation Area',
    category: 'Nursery',
    src: aboutTwo,
  },
  {
    id: 'nursery-5',
    title: 'Quality Plant Material',
    category: 'Nursery',
    src: aboutThree,
  },
  {
    id: 'nursery-6',
    title: 'Ready for Landscape Projects',
    category: 'Nursery',
    src: serviceOne,
  },
];

const plantImages = plants.map((plant) => ({
  id: `plant-${plant.id}`,
  title: plant.Name,
  subtitle: plant.CommanName,
  category: plant.Type,
  src: plant.Imgpath,
}));

const Gallery = () => {
  const galleryItems = useMemo(() => [...nurseryImages, ...plantImages], []);
  const categories = useMemo(
    () => ['All', ...new Set(galleryItems.map((item) => item.category).filter(Boolean))],
    [galleryItems],
  );
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeImage, setActiveImage] = useState(null);

  const filteredItems =
    activeCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <>
      <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container text-center py-5">
          <h1 className="display-3 text-white mb-4 animated slideInDown">Nursery Gallery</h1>
        </div>
      </div>

      <section className="gallery-page">
        <div className="container">
          <div className="gallery-heading">
            <p className="text-primary fw-medium mb-2">Green Flow Nurseries</p>
            <h2>Explore our nursery and plant collection</h2>
          </div>

          <div className="gallery-filters" aria-label="Gallery filters">
            {categories.map((category) => (
              <button
                className={`gallery-filter-btn ${activeCategory === category ? 'active' : ''}`}
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {filteredItems.map((item) => (
              <button
                aria-label={`View ${item.title}`}
                className="gallery-card"
                key={item.id}
                type="button"
                onClick={() => setActiveImage(item)}
              >
                <img src={item.src} alt={item.title} loading="lazy" />
                <span className="gallery-card-info">
                  <strong>{item.title}</strong>
                  {item.subtitle && <small>{item.subtitle}</small>}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {activeImage && (
        <div
          aria-modal="true"
          className="gallery-lightbox"
          role="dialog"
          onClick={() => setActiveImage(null)}
        >
          <div className="gallery-lightbox-panel" onClick={(event) => event.stopPropagation()}>
            <button
              aria-label="Close image preview"
              className="gallery-lightbox-close"
              type="button"
              onClick={() => setActiveImage(null)}
            >
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
            <img src={activeImage.src} alt={activeImage.title} />
            <div className="gallery-lightbox-caption">
              <h3>{activeImage.title}</h3>
              {activeImage.subtitle && <p>{activeImage.subtitle}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
