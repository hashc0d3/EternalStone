export const RETAIL_CARDS = [
  {
    href: '/catalog',
    image: '/images/catalog/1.png',
    title: 'Памятники',
    subtitle: 'Гранит и мрамор',
  },
  {
    href: '/catalog?type=изделия',
    image: '/images/catalog/2.png',
    title: 'Изделия',
    subtitle: 'Вазы, лампады, скамейки',
  },
  {
    href: '/catalog?type=плитки',
    image: '/images/catalog/3.jpg',
    title: 'Плитка для могил',
  },
  {
    href: '/catalog?type=облицовка',
    image: '/images/catalog/4.png',
    title: 'Облицовка',
    subtitle: 'Ступени, интерьеры, фасады',
  },
  {
    href: '/catalog?type=комплексы',
    image: '/images/catalog/5.jpg',
    title: 'Комплексы',
  },
] as const;

export const OPT_CARDS = [
  {
    href: '/catalog?view=opt',
    image: '/images/catalog/1.png',
    title: 'Памятники',
    subtitle: 'Гранит и мрамор',
  },
  {
    href: '/catalog?view=opt&type=изделия',
    image: '/images/catalog/2.png',
    title: 'Изделия',
    subtitle: 'Вазы, лампады, скамейки',
  },
  {
    href: '/catalog?view=opt&type=плитки',
    image: '/images/catalog/3.jpg',
    title: 'Плитка для могил',
  },
] as const;

export type CatalogView = 'retail' | 'opt';
