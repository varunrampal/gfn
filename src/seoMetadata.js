export const SITE = {
  name: 'Green Flow Nurseries',
  legalName: 'Green Flow Nurseries Ltd.',
  url: 'https://greenflownurseries.com',
  description:
    'Green Flow Nurseries Ltd. grows quality BC native plants in Mission, BC for wholesale, landscape, restoration, wetland, highway, park, and residential projects.',
  phone: '+1-604-217-1351',
  displayPhone: '604-217-1351',
  email: 'info@greenflownurseries.com',
  image: 'https://greenflownurseries.com/images/plants/thujaplicata.jpg',
  address: {
    streetAddress: '35444 Hartley Road',
    addressLocality: 'Mission',
    addressRegion: 'BC',
    postalCode: 'V2V 0A8',
    addressCountry: 'CA',
  },
};

const defaultKeywords = [
  'Green Flow Nurseries',
  'BC native plants',
  'British Columbia native plants',
  'wholesale nursery',
  'native plant nursery Mission BC',
  'habitat restoration plants',
  'wetland restoration plants',
  'landscape plants BC',
];

export const seoPages = {
  '/': {
    title: 'Wholesale BC Native Plants | Green Flow Nurseries',
    name: 'Wholesale BC Native Plants',
    description: SITE.description,
    keywords: defaultKeywords.join(', '),
    schemaType: 'WebPage',
    changefreq: 'weekly',
    priority: '1.0',
  },
  '/about': {
    title: 'About Green Flow Nurseries | BC Native Plant Growers',
    name: 'About Us',
    description:
      'Learn about Green Flow Nurseries Ltd., a Lower Mainland nursery specializing in propagation and cultivation of top-quality BC native plants.',
    keywords:
      'about Green Flow Nurseries, BC native plant growers, Lower Mainland nursery, native plant propagation, Mission BC nursery',
    schemaType: 'AboutPage',
    changefreq: 'monthly',
    priority: '0.8',
  },
  '/plants': {
    title: 'BC Native Plant Inventory | Green Flow Nurseries',
    name: 'Our Plants',
    description:
      'Browse wholesale plant inventory from Green Flow Nurseries, including trees, shrubs, perennials, groundcovers, live stakes, and restoration-ready plant material.',
    keywords:
      'BC native plant inventory, wholesale plants BC, native trees, native shrubs, perennials, live stakes, restoration plants',
    schemaType: 'CollectionPage',
    changefreq: 'weekly',
    priority: '0.9',
  },
  '/gallery': {
    title: 'Nursery Gallery | Green Flow Nurseries Plant Stock',
    name: 'Nursery Gallery',
    description:
      'View photos from Green Flow Nurseries, including nursery growing areas, propagation space, and native plant stock for landscape and restoration projects.',
    keywords:
      'Green Flow Nurseries gallery, native plant photos, nursery photos, BC plant stock, restoration plant nursery',
    schemaType: 'ImageGallery',
    changefreq: 'monthly',
    priority: '0.7',
  },
  '/sales/information': {
    title: 'Sales Information | Container Sizes & Live Stakes',
    name: 'Sales Information',
    description:
      'Review Green Flow Nurseries sales information, container sizes, B&B tree options, live stake availability, and plant substitution guidance.',
    keywords:
      'nursery sales information, plant container sizes, live stakes BC, B&B trees, plant substitutions, wholesale nursery sales',
    schemaType: 'WebPage',
    changefreq: 'monthly',
    priority: '0.7',
  },
  '/quote': {
    title: 'Request a Wholesale Plant Quote | Green Flow Nurseries',
    name: 'Get A Quote',
    description:
      'Request pricing and availability for wholesale BC native plants from Green Flow Nurseries in Mission, BC.',
    keywords:
      'request plant quote, wholesale plant quote BC, native plant pricing, Green Flow Nurseries quote, plant availability',
    schemaType: 'WebPage',
    changefreq: 'monthly',
    priority: '0.8',
  },
  '/contact': {
    title: 'Contact Green Flow Nurseries | Mission, BC',
    name: 'Contact Us',
    description:
      'Contact Green Flow Nurseries in Mission, BC at 604-217-1351 or info@greenflownurseries.com for wholesale native plant availability and quotes.',
    keywords:
      'contact Green Flow Nurseries, Mission BC nursery, native plant nursery phone, wholesale nursery contact',
    schemaType: 'ContactPage',
    changefreq: 'monthly',
    priority: '0.8',
  },
  '/dragdrop': {
    title: 'Inventory Utility | Green Flow Nurseries',
    name: 'Inventory Utility',
    description: 'Internal Green Flow Nurseries inventory utility.',
    keywords: 'Green Flow Nurseries inventory utility',
    robots: 'noindex, nofollow',
    schemaType: 'WebPage',
    sitemap: false,
  },
};

export const normalizePath = (pathname = '/') => {
  const [pathOnly] = pathname.split(/[?#]/);
  const normalized = `/${pathOnly}`.replace(/\/+/g, '/').toLowerCase().replace(/\/$/, '');
  return normalized || '/';
};

export const getSeoForPath = (pathname) => {
  const path = normalizePath(pathname);

  if (seoPages[path]) {
    return { ...seoPages[path], path };
  }

  return {
    ...seoPages['/'],
    title: `${SITE.name} | BC Native Plants`,
    path,
    robots: 'noindex, follow',
    sitemap: false,
  };
};

export const absoluteUrl = (path = '/') => {
  const normalized = normalizePath(path);
  return `${SITE.url}${normalized === '/' ? '/' : normalized}`;
};

export const getPublicSeoPages = () =>
  Object.entries(seoPages)
    .filter(([, page]) => page.sitemap !== false)
    .map(([path, page]) => ({ path, ...page }));

