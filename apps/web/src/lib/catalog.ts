export type CatalogView = 'retail' | 'opt';
export type CatalogSort = 'default' | 'alpha' | 'price';

export type CatalogSubcategory = {
  slug: string;
  title: string;
};

export type CatalogCategory = {
  slug: string;
  title: string;
  children?: CatalogSubcategory[];
};

export type CatalogProduct = {
  id: string;
  name: string;
  view: CatalogView;
  category: string;
  subcategory?: string;
  image: string;
  price: number | null;
  size: string;
  excerpt: string;
  description: string;
};

export const RETAIL_CATEGORIES: CatalogCategory[] = [
  {
    slug: 'pamyatniki',
    title: 'Памятники',
    children: [
      { slug: 'karelia', title: 'Черный Гранит Карелия' },
      { slug: 'polevskoy', title: 'Мрамор Полевской' },
      { slug: 'ufaley', title: 'Мрамор Уфалей' },
      { slug: 'dymovskiy', title: 'Гранит Дымовский' },
      { slug: 'family', title: 'Семейные' },
    ],
  },
  { slug: 'izdeliya', title: 'Гранитные изделия' },
  { slug: 'plitka', title: 'Облицовочные гранитные плитки для могил' },
  { slug: 'oblitsovka', title: 'Ванные-кухонные зоны, ступени-лестницы, плитки для облицовки зданий' },
  { slug: 'kompleksy', title: 'Мемориальные комплексы на могилу' },
];

export const OPT_CATEGORIES: CatalogCategory[] = [
  { slug: 'pamyatniki', title: 'Памятники' },
  { slug: 'izdeliya', title: 'Гранитные изделия' },
  { slug: 'plitka', title: 'Облицовочные гранитные плитки для могил' },
];

export const RETAIL_CARDS = [
  {
    href: '/catalog?cat=pamyatniki',
    image: '/images/catalog/1.png',
    title: 'Памятники',
    subtitle: 'Гранит и мрамор',
  },
  {
    href: '/catalog?cat=izdeliya',
    image: '/images/catalog/2.png',
    title: 'Изделия',
    subtitle: 'Вазы, лампады, скамейки',
  },
  {
    href: '/catalog?cat=plitka',
    image: '/images/catalog/3.png',
    title: 'Плитка для могил',
  },
  {
    href: '/catalog?cat=oblitsovka',
    image: '/images/catalog/4.png',
    title: 'Облицовка',
    subtitle: 'Ступени, интерьеры, фасады',
  },
  {
    href: '/catalog?cat=kompleksy',
    image: '/images/catalog/5.png',
    title: 'Комплексы',
  },
] as const;

export const OPT_CARDS = [
  {
    href: '/catalog?view=opt&cat=pamyatniki',
    image: '/images/catalog/1.png',
    title: 'Памятники',
    subtitle: 'Гранит и мрамор',
  },
  {
    href: '/catalog?view=opt&cat=izdeliya',
    image: '/images/catalog/2.png',
    title: 'Изделия',
    subtitle: 'Вазы, лампады, скамейки',
  },
  {
    href: '/catalog?view=opt&cat=plitka',
    image: '/images/catalog/3.png',
    title: 'Плитка для могил',
  },
] as const;

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    id: 'r-k-1',
    name: 'Стела «Карелия» вертикальная',
    view: 'retail',
    category: 'pamyatniki',
    subcategory: 'karelia',
    image: '/images/catalog/1.png',
    price: 56000,
    size: '100×50×8 см',
    excerpt: 'Полированный габбро-диабаз, фаска по периметру.',
    description:
      'Классическая вертикальная стела из карельского чёрного гранита. Зеркальная полировка лицевой грани, торцы термообработаны. Подходит для одиночного захоронения. Портрет и эпитафия наносятся гравировкой. Установка по Омску отдельно.',
  },
  {
    id: 'r-k-2',
    name: 'Памятник «Север» с крестом',
    view: 'retail',
    category: 'pamyatniki',
    subcategory: 'karelia',
    image: '/images/works/orig-1.png',
    price: 72000,
    size: '110×55×10 см',
    excerpt: 'Чёрный гранит, резной крест, постамент.',
    description:
      'Комплект: стела, тумба и цветник. Крест вырезается в камне, без накладных элементов. Карельский габбро держит полировку десятилетиями и почти не выцветает.',
  },
  {
    id: 'r-k-3',
    name: 'Стела «Ночь» малая',
    view: 'retail',
    category: 'pamyatniki',
    subcategory: 'karelia',
    image: '/images/slider/marble.png',
    price: 39000,
    size: '80×40×8 см',
    excerpt: 'Компактная модель для ограниченного участка.',
    description:
      'Небольшая стела из чёрного гранита Карелии. Удобна для узких мест. Возможна гравировка портрета в овале и золочение букв.',
  },
  {
    id: 'r-p-1',
    name: 'Стела «Полевской» светлая',
    view: 'retail',
    category: 'pamyatniki',
    subcategory: 'polevskoy',
    image: '/images/works/orig-3.jpg',
    price: 48000,
    size: '90×45×8 см',
    excerpt: 'Светлый мрамор с мягким рисунком.',
    description:
      'Памятник из полевского мрамора. Светлый тон хорошо читается в пасмурную погоду. Рекомендуем защитное покрытие и регулярный уход зимой.',
  },
  {
    id: 'r-p-2',
    name: 'Памятник «Урал» с цветником',
    view: 'retail',
    category: 'pamyatniki',
    subcategory: 'polevskoy',
    image: '/images/catalog/5.png',
    price: 64000,
    size: '100×50×8 см, цветник 100×50',
    excerpt: 'Мраморная стела и низкий цветник в комплекте.',
    description:
      'Комплект из полевского мрамора: вертикальная стела и цветник. Швы закрываются герметиком под цвет камня. Портрет — гравировка или керамика.',
  },
  {
    id: 'r-u-1',
    name: 'Стела «Уфалей» серая',
    view: 'retail',
    category: 'pamyatniki',
    subcategory: 'ufaley',
    image: '/images/works/orig-2.png',
    price: 52000,
    size: '100×50×8 см',
    excerpt: 'Серый уфалейский мрамор, спокойный рисунок.',
    description:
      'Стела из мрамора Уфалей. Благородный серый тон, хорошо сочетается с гранитным цоколем. Можно дополнить вазой и надгробной плитой.',
  },
  {
    id: 'r-u-2',
    name: 'Памятник «Тишина» горизонтальный',
    view: 'retail',
    category: 'pamyatniki',
    subcategory: 'ufaley',
    image: '/images/works/orig-5.jpg',
    price: 69000,
    size: '70×120×8 см',
    excerpt: 'Широкая стела для двух портретов.',
    description:
      'Горизонтальный памятник из уфалейского мрамора. Два овальных поля под портреты, место под фамильные даты. Основание из того же камня.',
  },
  {
    id: 'r-d-1',
    name: 'Стела «Дымовский» классика',
    view: 'retail',
    category: 'pamyatniki',
    subcategory: 'dymovskiy',
    image: '/images/catalog/1.png',
    price: 44000,
    size: '90×45×8 см',
    excerpt: 'Красно-коричневый гранит с крупным зерном.',
    description:
      'Памятник из дымовского гранита. Тёплый оттенок, высокая прочность. Полировка лица, торцы термообработаны. Хорошо смотрится с чёрным цветником.',
  },
  {
    id: 'r-d-2',
    name: 'Памятник «Закат» с аркой',
    view: 'retail',
    category: 'pamyatniki',
    subcategory: 'dymovskiy',
    image: '/images/works/orig-4.png',
    price: 81000,
    size: '120×60×10 см',
    excerpt: 'Фигурная арка, дымовский гранит.',
    description:
      'Стела с верхней аркой из дымовского гранита. Резка по шаблону, полировка всех видимых граней. Можно добавить гранитные вазы по бокам.',
  },
  {
    id: 'r-f-1',
    name: 'Семейный комплекс «Двое»',
    view: 'retail',
    category: 'pamyatniki',
    subcategory: 'family',
    image: '/images/slider/complex.png',
    price: 128000,
    size: 'стела 110×80×10 см',
    excerpt: 'Два портретных поля, общая стела.',
    description:
      'Семейный памятник на два захоронения. Общая стела, два цветника, тумба. Камень на выбор: карельский или дымовский. Гравировка фамилии по центру.',
  },
  {
    id: 'r-f-2',
    name: 'Семейный «Родовое»',
    view: 'retail',
    category: 'pamyatniki',
    subcategory: 'family',
    image: '/images/catalog/5.png',
    price: 186000,
    size: 'участок 2,0×2,5 м',
    excerpt: 'Стела, ограда и плитка в одном комплекте.',
    description:
      'Семейный набор: широкая стела, низкая ограда, мощение плиткой. Рассчитывается под размер участка. Сроки изготовления 3–5 недель.',
  },
  {
    id: 'r-i-1',
    name: 'Ваза гранитная «Чаша»',
    view: 'retail',
    category: 'izdeliya',
    image: '/images/catalog/2.png',
    price: 8900,
    size: 'высота 30 см',
    excerpt: 'Полированная ваза из чёрного гранита.',
    description:
      'Надгробная ваза из карельского гранита. Сквозное отверстие под воду, устойчивое дно. Крепится к плите или цветнику.',
  },
  {
    id: 'r-i-2',
    name: 'Лампада «Вечер»',
    view: 'retail',
    category: 'izdeliya',
    image: '/images/services/1.png',
    price: 6500,
    size: '18×18×22 см',
    excerpt: 'Закрытая лампада, стекло в комплекте.',
    description:
      'Гранитная лампада с защитным стеклом. Пламя не гаснет на ветру. Поставляется с запасным стаканом.',
  },
  {
    id: 'r-i-3',
    name: 'Скамейка гранитная «Покой»',
    view: 'retail',
    category: 'izdeliya',
    image: '/images/works/orig-6.png',
    price: 24000,
    size: '120×35×45 см',
    excerpt: 'Сиденье и опоры из гранита.',
    description:
      'Надгробная скамейка. Полированное сиденье, термообработанные опоры — не скользят. Можно сделать в цвет стелы.',
  },
  {
    id: 'r-t-1',
    name: 'Плитка габбро 300×300',
    view: 'retail',
    category: 'plitka',
    image: '/images/catalog/3.png',
    price: 3200,
    size: '30×30×2 см, м²',
    excerpt: 'Облицовка могилы, цена за квадратный метр.',
    description:
      'Гранитная плитка для мощения цветника и площадки. Термообработанная поверхность не скользит. Укладка на клей или цементную смесь.',
  },
  {
    id: 'r-t-2',
    name: 'Плитка дымовская 400×400',
    view: 'retail',
    category: 'plitka',
    image: '/images/works/orig-4.png',
    price: 4100,
    size: '40×40×2 см, м²',
    excerpt: 'Тёплый гранит для облицовки участка.',
    description:
      'Плитка из дымовского гранита. Крупный формат быстрее закрывает площадь. Рекомендуем шов 3–5 мм и гранитный плинтус по периметру.',
  },
  {
    id: 'r-t-3',
    name: 'Надгробная плита «Покров»',
    view: 'retail',
    category: 'plitka',
    image: '/images/catalog/3.png',
    price: 27000,
    size: '180×80×5 см',
    excerpt: 'Цельная плита на захоронение.',
    description:
      'Монолитная надгробная плита. Скрывает грунт, упрощает уход. Возможны фаски и гравировка по краю.',
  },
  {
    id: 'r-o-1',
    name: 'Ступени гранитные',
    view: 'retail',
    category: 'oblitsovka',
    image: '/images/slider/stairs.png',
    price: 9800,
    size: 'пог. м, толщина 3 см',
    excerpt: 'Уличные и входные ступени, цена за погонный метр.',
    description:
      'Ступени из гранита с термообработкой проступи. Подходят для крыльца, цоколя и кладбищенских подходов. Замер и подгонка по месту.',
  },
  {
    id: 'r-o-2',
    name: 'Подоконник гранитный',
    view: 'retail',
    category: 'oblitsovka',
    image: '/images/catalog/4.png',
    price: 7600,
    size: 'пог. м, ширина 30 см',
    excerpt: 'Кухня, ванная, подоконники.',
    description:
      'Полированные слэбы для подоконников и столешниц мокрых зон. Влагостойкий камень, кромка по выбору: евро, четверть, капинос.',
  },
  {
    id: 'r-o-3',
    name: 'Фасадная плитка 600×300',
    view: 'retail',
    category: 'oblitsovka',
    image: '/images/catalog/4.png',
    price: 5400,
    size: '60×30×2 см, м²',
    excerpt: 'Облицовка цоколя и фасада.',
    description:
      'Вентилируемый или мокрый фасад. Гранит не боится соли и перепадов температур. Подбор цвета под существующую кладку.',
  },
  {
    id: 'r-c-1',
    name: 'Комплекс «Квадрат»',
    view: 'retail',
    category: 'kompleksy',
    image: '/images/slider/complex.png',
    price: 210000,
    size: '2,0×2,0 м',
    excerpt: 'Стела, цветник, плитка и цоколь.',
    description:
      'Готовый мемориальный комплекс на участок 2×2 м. Входит стела, тумба, цветник, мощение и гранитный цоколь. Ограда опционально.',
  },
  {
    id: 'r-c-2',
    name: 'Комплекс «Ограда»',
    view: 'retail',
    category: 'kompleksy',
    image: '/images/catalog/5.png',
    price: 265000,
    size: '2,5×2,0 м',
    excerpt: 'Полный набор с гранитной оградой.',
    description:
      'Комплекс с низкой гранитной оградой, калиткой, стелой и скамейкой. Чертёж согласовываем до запуска в работу. Срок 4–6 недель.',
  },
  {
    id: 'r-c-3',
    name: 'Комплекс «Семейный двор»',
    view: 'retail',
    category: 'kompleksy',
    image: '/images/works/orig-6.png',
    price: 340000,
    size: '3,0×2,5 м',
    excerpt: 'Две стелы, мощение, лавка и вазы.',
    description:
      'Большой семейный комплекс: две стелы, общая площадка, скамейка, две вазы. Камень и рисунок ограды выбираете из каталога.',
  },
  {
    id: 'o-p-1',
    name: 'Стела опт «Карелия»',
    view: 'opt',
    category: 'pamyatniki',
    image: '/images/catalog/1.png',
    price: 28000,
    size: '100×50×8 см',
    excerpt: 'От 10 штук, полировка в цехе.',
    description:
      'Оптовая стела из карельского гранита. Базовая полировка, без гравировки. Цена при партии от 10 шт. Отгрузка с площадки в Омске.',
  },
  {
    id: 'o-p-2',
    name: 'Комплект опт «Стела+тумба»',
    view: 'opt',
    category: 'pamyatniki',
    image: '/images/works/orig-1.png',
    price: 36000,
    size: '100×50×8 + тумба',
    excerpt: 'Партия от 8 комплектов.',
    description:
      'Оптовый комплект стела и тумба. Камень на выбор. Гравировка и установка не входят. Счёт и ТТН для юрлиц.',
  },
  {
    id: 'o-i-1',
    name: 'Вазы опт, ящик 12 шт.',
    view: 'opt',
    category: 'izdeliya',
    image: '/images/catalog/2.png',
    price: 72000,
    size: 'высота 30 см',
    excerpt: 'Чёрный гранит, цена за ящик.',
    description:
      'Гранитовые вазы упаковкой по 12 штук. Единый размер. Возможен микс высот при заказе от трёх ящиков.',
  },
  {
    id: 'o-i-2',
    name: 'Лампады опт, 20 шт.',
    view: 'opt',
    category: 'izdeliya',
    image: '/images/services/1.png',
    price: 98000,
    size: '18×18×22 см',
    excerpt: 'Со стеклом, отгрузка паллетой.',
    description:
      'Оптовая партия лампад. Стекло в отдельной обрешётке. Скидка при повторном заказе в сезон.',
  },
  {
    id: 'o-t-1',
    name: 'Плитка опт 300×300',
    view: 'opt',
    category: 'plitka',
    image: '/images/catalog/3.png',
    price: 2100,
    size: '30×30×2 см, м²',
    excerpt: 'От 50 м², цена за квадрат.',
    description:
      'Облицовочная плитка габбро. Минимальная партия 50 м². Паллеты, стрейч, отгрузка транспортом покупателя или нашей доставкой.',
  },
  {
    id: 'o-t-2',
    name: 'Плита надгробная опт',
    view: 'opt',
    category: 'plitka',
    image: '/images/catalog/3.png',
    price: 16500,
    size: '180×80×5 см',
    excerpt: 'От 6 плит за рейс.',
    description:
      'Цельные плиты без гравировки. Кромка прямая. Цена при самовывозе с производства.',
  },
];

export function formatPrice(value: number | null | undefined) {
  if (value == null || !Number.isFinite(value) || value <= 0) return 'По запросу';
  return `${value.toLocaleString('ru-RU')} ₽`;
}

export function categoriesFor(view: CatalogView) {
  return view === 'opt' ? OPT_CATEGORIES : RETAIL_CATEGORIES;
}

export function catalogHref(
  view: CatalogView = 'retail',
  category?: string | null,
  subcategory?: string | null,
  material?: CatalogMaterial | null,
) {
  const params = new URLSearchParams();
  if (view === 'opt') params.set('view', 'opt');
  if (category) params.set('cat', category);
  if (subcategory) params.set('sub', subcategory);
  if (material) params.set('material', material);
  const query = params.toString();
  return query ? `/catalog?${query}` : '/catalog';
}

export type CatalogMaterial = 'granite' | 'marble';

const MATERIAL_SUBS: Record<CatalogMaterial, string[]> = {
  granite: ['karelia', 'dymovskiy'],
  marble: ['polevskoy', 'ufaley'],
};

export function parseMaterial(value: string | null): CatalogMaterial | null {
  if (value === 'granite' || value === 'marble') return value;
  return null;
}

export function materialTitle(material?: CatalogMaterial | null) {
  if (material === 'granite') return 'Гранит';
  if (material === 'marble') return 'Мрамор';
  return null;
}

export function filterProducts(
  view: CatalogView,
  category?: string | null,
  subcategory?: string | null,
  material?: CatalogMaterial | null,
  products: CatalogProduct[] = CATALOG_PRODUCTS,
) {
  return products.filter((product) => {
    if (product.view !== view) return false;
    if (category && product.category !== category) return false;
    if (subcategory && product.subcategory !== subcategory) return false;
    if (!subcategory && material) {
      const slugs = MATERIAL_SUBS[material];
      if (!product.subcategory || !slugs.includes(product.subcategory)) return false;
    }
    return true;
  });
}

export function sortProducts(products: CatalogProduct[], sort: CatalogSort) {
  const next = [...products];
  if (sort === 'alpha') {
    next.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
  }
  if (sort === 'price') {
    next.sort((a, b) => (a.price ?? Number.MAX_SAFE_INTEGER) - (b.price ?? Number.MAX_SAFE_INTEGER));
  }
  return next;
}

export function findProduct(id: string) {
  return CATALOG_PRODUCTS.find((product) => product.id === id) ?? null;
}

export function categoryTitle(view: CatalogView, slug?: string | null) {
  if (!slug) return view === 'opt' ? 'Оптовый каталог' : 'Розничный каталог';
  return categoriesFor(view).find((item) => item.slug === slug)?.title ?? 'Каталог';
}

export function subcategoryTitle(view: CatalogView, category?: string | null, slug?: string | null) {
  if (!category || !slug) return null;
  return (
    categoriesFor(view)
      .find((item) => item.slug === category)
      ?.children?.find((item) => item.slug === slug)?.title ?? null
  );
}

export function catalogCrumbs(
  view: CatalogView,
  category?: string | null,
  subcategory?: string | null,
  material?: CatalogMaterial | null,
) {
  const crumbs: { href: string; label: string }[] = [
    { href: '/', label: 'Главная' },
    { href: '/catalog', label: 'Каталог' },
    { href: catalogHref(view), label: view === 'opt' ? 'Опт' : 'Розница' },
  ];
  if (category) {
    crumbs.push({ href: catalogHref(view, category), label: categoryTitle(view, category) });
  }
  const materialLabel = materialTitle(material);
  if (materialLabel && !subcategory) {
    crumbs.push({ href: catalogHref(view, category, null, material), label: materialLabel });
  }
  const subLabel = subcategoryTitle(view, category, subcategory);
  if (subLabel) {
    crumbs.push({ href: catalogHref(view, category, subcategory), label: subLabel });
  }
  return crumbs;
}
