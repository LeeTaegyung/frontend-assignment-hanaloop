import { Company, Post } from '@/types';

const seed_data = [
  {
    yearMonth: '2025-01-01',
    source: '전기',
    origin: '한국전력',
    emissions: 110,
    unit: 'kWh',
  },
  {
    yearMonth: '2025-02-01',
    source: '전기',
    origin: '한국전력',
    emissions: 112,
    unit: 'kWh',
  },
  {
    yearMonth: '2025-03-01',
    source: '전기',
    origin: '한국전력',
    emissions: 115,
    unit: 'kWh',
  },
  {
    yearMonth: '2025-04-01',
    source: '전기',
    origin: '한국전력',
    emissions: 130,
    unit: 'kWh',
  },
  {
    yearMonth: '2025-05-01',
    source: '전기',
    origin: '한국전력',
    emissions: 120,
    unit: 'kWh',
  },
  {
    yearMonth: '2025-06-01',
    source: '전기',
    origin: '한국전력',
    emissions: 110,
    unit: 'kWh',
  },
  {
    yearMonth: '2025-07-01',
    source: '전기',
    origin: '한국전력',
    emissions: 120,
    unit: 'kWh',
  },
  {
    yearMonth: '2025-08-01',
    source: '전기',
    origin: '한국전력',
    emissions: 111,
    unit: 'kWh',
  },

  {
    yearMonth: '2025-05-01',
    source: '전기',
    origin: '한국전력',
    emissions: 101,
    unit: 'kWh',
  },

  {
    yearMonth: '2025-01-01',
    source: '원소재',
    origin: '플라스틱 1',
    emissions: 230,
    unit: 'kg',
  },
  {
    yearMonth: '2025-02-01',
    source: '원소재',
    origin: '플라스틱 1',
    emissions: 340,
    unit: 'kg',
  },

  {
    yearMonth: '2025-03-01',
    source: '원소재',
    origin: '플라스틱 2',
    emissions: 23,
    unit: 'kg',
  },

  {
    yearMonth: '2025-03-01',
    source: '원소재',
    origin: '플라스틱 1',
    emissions: 430,
    unit: 'kg',
  },
  {
    yearMonth: '2025-04-01',
    source: '원소재',
    origin: '플라스틱 1',
    emissions: 510,
    unit: 'kg',
  },
  {
    yearMonth: '2025-05-01',
    source: '원소재',
    origin: '플라스틱 1',
    emissions: 424,
    unit: 'kg',
  },

  {
    yearMonth: '2025-05-01',
    source: '원소재',
    origin: '플라스틱 2',
    emissions: 40,
    unit: 'kg',
  },

  {
    yearMonth: '2025-06-01',
    source: '원소재',
    origin: '플라스틱 1',
    emissions: 450,
    unit: 'kg',
  },
  {
    yearMonth: '2025-07-01',
    source: '원소재',
    origin: '플라스틱 1',
    emissions: 340,
    unit: 'kg',
  },

  {
    yearMonth: '2025-07-01',
    source: '원소재',
    origin: '플라스틱 2',
    emissions: 43,
    unit: 'kg',
  },

  {
    yearMonth: '2025-08-01',
    source: '원소재',
    origin: '플라스틱 1',
    emissions: 230,
    unit: 'kg',
  },

  {
    yearMonth: '2025-05-01',
    source: '원소재',
    origin: '플라스틱 1',
    emissions: 232,
    unit: 'kg',
  },

  {
    yearMonth: '2025-01-01',
    source: '운송',
    origin: '트럭',
    emissions: 41,
    unit: 'ton-km',
  },
  {
    yearMonth: '2025-02-01',
    source: '운송',
    origin: '트럭',
    emissions: 211,
    unit: 'ton-km',
  },
  {
    yearMonth: '2025-03-01',
    source: '운송',
    origin: '트럭',
    emissions: 123,
    unit: 'ton-km',
  },
  {
    yearMonth: '2025-04-01',
    source: '운송',
    origin: '트럭',
    emissions: 42,
    unit: 'ton-km',
  },
  {
    yearMonth: '2025-05-01',
    source: '운송',
    origin: '트럭',
    emissions: 123,
    unit: 'ton-km',
  },
  {
    yearMonth: '2025-06-01',
    source: '운송',
    origin: '트럭',
    emissions: 123,
    unit: 'ton-km',
  },
  {
    yearMonth: '2025-07-01',
    source: '운송',
    origin: '트럭',
    emissions: 41,
    unit: 'ton-km',
  },
  {
    yearMonth: '2025-08-01',
    source: '운송',
    origin: '트럭',
    emissions: 123,
    unit: 'ton-km',
  },

  {
    yearMonth: '2025-05-01',
    source: '운송',
    origin: '트럭',
    emissions: 12,
    unit: 'ton-km',
  },
];

export const countries: string[] = ['US', 'DE'];

export const companies: Company[] = [
  {
    id: 'c1',
    name: 'Acme Corp',
    country: 'US',
    emissions: [
      { yearMonth: '2024-01', source: '전기', emissions: 120 },
      { yearMonth: '2024-02', source: '전기', emissions: 110 },
      { yearMonth: '2024-03', source: '전기', emissions: 95 },
      { yearMonth: '2025-01', source: '전기', emissions: 110 },
      { yearMonth: '2025-02', source: '전기', emissions: 112 },
      { yearMonth: '2025-03', source: '전기', emissions: 115 },
      { yearMonth: '2025-04', source: '전기', emissions: 130 },
      { yearMonth: '2025-05', source: '전기', emissions: 120 },
      { yearMonth: '2025-06', source: '전기', emissions: 110 },
      { yearMonth: '2025-07', source: '전기', emissions: 120 },
      { yearMonth: '2025-08', source: '전기', emissions: 111 },
      { yearMonth: '2025-01', source: '원소재', emissions: 230 },
      { yearMonth: '2025-02', source: '원소재', emissions: 340 },
      { yearMonth: '2025-03', source: '원소재', emissions: 430 },
      { yearMonth: '2025-04', source: '원소재', emissions: 510 },
      { yearMonth: '2025-05', source: '원소재', emissions: 424 },
      { yearMonth: '2025-06', source: '원소재', emissions: 450 },
      { yearMonth: '2025-07', source: '원소재', emissions: 340 },
      { yearMonth: '2025-08', source: '원소재', emissions: 230 },
      { yearMonth: '2025-01', source: '운송', emissions: 41 },
      { yearMonth: '2025-02', source: '운송', emissions: 211 },
      { yearMonth: '2025-03', source: '운송', emissions: 123 },
      { yearMonth: '2025-04', source: '운송', emissions: 42 },
      { yearMonth: '2025-05', source: '운송', emissions: 123 },
      { yearMonth: '2025-06', source: '운송', emissions: 123 },
      { yearMonth: '2025-07', source: '운송', emissions: 41 },
      { yearMonth: '2025-08', source: '운송', emissions: 123 },
    ],
  },
  {
    id: 'c2',
    name: 'Globex',
    country: 'DE',
    emissions: [
      { yearMonth: '2024-01', source: '전기', emissions: 80 },
      { yearMonth: '2024-02', source: '전기', emissions: 105 },
      { yearMonth: '2024-03', source: '전기', emissions: 120 },
      { yearMonth: '2025-05', source: '전기', emissions: 101 },
      { yearMonth: '2025-03', source: '원소재', emissions: 23 },
      { yearMonth: '2025-05', source: '원소재', emissions: 40 },
      { yearMonth: '2025-07', source: '원소재', emissions: 43 },
      { yearMonth: '2025-05', source: '원소재', emissions: 232 },
      { yearMonth: '2025-05', source: '운송', emissions: 12 },
    ],
  },
];

export const posts: Post[] = [
  {
    id: 'p1',
    title: 'Sustainability Report',
    resourceUid: 'c1',
    dateTime: '2024-02',
    content: 'Quarterly CO2 update',
  },
];
