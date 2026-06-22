import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE, absoluteUrl, getSeoForPath } from '../seoMetadata';

const setMeta = (attribute, key, content) => {
  if (!content) return;

  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

const setCanonical = (href) => {
  let element = document.head.querySelector('link[rel="canonical"]');

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
};

const buildStructuredData = (page, canonicalUrl) => {
  const businessId = `${SITE.url}/#business`;
  const websiteId = `${SITE.url}/#website`;
  const webpageId = `${canonicalUrl}#webpage`;
  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${SITE.url}/`,
    },
  ];

  if (page.path !== '/') {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: page.name,
      item: canonicalUrl,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'GardenStore'],
        '@id': businessId,
        name: SITE.name,
        legalName: SITE.legalName,
        url: SITE.url,
        image: SITE.image,
        description: SITE.description,
        telephone: SITE.phone,
        email: SITE.email,
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          ...SITE.address,
        },
        areaServed: [
          {
            '@type': 'AdministrativeArea',
            name: 'British Columbia',
          },
          {
            '@type': 'AdministrativeArea',
            name: 'Lower Mainland',
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: `${SITE.url}/`,
        name: SITE.name,
        description: SITE.description,
        publisher: {
          '@id': businessId,
        },
        inLanguage: 'en-CA',
      },
      {
        '@type': page.schemaType || 'WebPage',
        '@id': webpageId,
        url: canonicalUrl,
        name: page.title,
        description: page.description,
        isPartOf: {
          '@id': websiteId,
        },
        about: {
          '@id': businessId,
        },
        publisher: {
          '@id': businessId,
        },
        breadcrumb: {
          '@id': `${canonicalUrl}#breadcrumb`,
        },
        inLanguage: 'en-CA',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: breadcrumbItems,
      },
    ],
  };
};

const setStructuredData = (page, canonicalUrl) => {
  let element = document.getElementById('site-structured-data');

  if (!element) {
    element = document.createElement('script');
    element.id = 'site-structured-data';
    element.type = 'application/ld+json';
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(buildStructuredData(page, canonicalUrl));
};

const SEO = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = getSeoForPath(pathname);
    const canonicalUrl = absoluteUrl(page.path);

    document.title = page.title;

    setMeta('name', 'description', page.description);
    setMeta('name', 'keywords', page.keywords);
    setMeta('name', 'robots', page.robots || 'index, follow');
    setMeta('name', 'author', SITE.name);
    setMeta('name', 'application-name', SITE.name);

    setMeta('property', 'og:title', page.title);
    setMeta('property', 'og:description', page.description);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:image', SITE.image);
    setMeta('property', 'og:site_name', SITE.name);
    setMeta('property', 'og:locale', 'en_CA');

    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', page.title);
    setMeta('name', 'twitter:description', page.description);
    setMeta('name', 'twitter:image', SITE.image);

    setCanonical(canonicalUrl);
    setStructuredData(page, canonicalUrl);
  }, [pathname]);

  return null;
};

export default SEO;
