import { Company, Post } from '@/types';

export const countries: string[] = ['US', 'DE'];

export const companies: Company[] = [
  {
    id: 'c1',
    name: 'Acme Corp',
    country: 'US',
    emissions: [
      { yearMonth: '2024-01', source: '전기-한국전력', emissions: 120 },
      { yearMonth: '2024-02', source: '전기-한국전력', emissions: 110 },
      { yearMonth: '2024-03', source: '전기-한국전력', emissions: 95 },
      { yearMonth: '2025-01', source: '전기-한국전력', emissions: 110 },
      { yearMonth: '2025-02', source: '전기-한국전력', emissions: 112 },
      { yearMonth: '2025-03', source: '전기-한국전력', emissions: 115 },
      { yearMonth: '2025-04', source: '전기-한국전력', emissions: 130 },
      { yearMonth: '2025-05', source: '전기-한국전력', emissions: 120 },
      { yearMonth: '2025-06', source: '전기-한국전력', emissions: 110 },
      { yearMonth: '2025-07', source: '전기-한국전력', emissions: 120 },
      { yearMonth: '2025-08', source: '전기-한국전력', emissions: 111 },
      { yearMonth: '2025-01', source: '원소재-플라스틱 1', emissions: 230 },
      { yearMonth: '2025-02', source: '원소재-플라스틱 1', emissions: 340 },
      { yearMonth: '2025-03', source: '원소재-플라스틱 1', emissions: 430 },
      { yearMonth: '2025-04', source: '원소재-플라스틱 1', emissions: 510 },
      { yearMonth: '2025-05', source: '원소재-플라스틱 1', emissions: 424 },
      { yearMonth: '2025-06', source: '원소재-플라스틱 1', emissions: 450 },
      { yearMonth: '2025-07', source: '원소재-플라스틱 1', emissions: 340 },
      { yearMonth: '2025-08', source: '원소재-플라스틱 1', emissions: 230 },
      { yearMonth: '2025-01', source: '운송-트럭', emissions: 41 },
      { yearMonth: '2025-02', source: '운송-트럭', emissions: 211 },
      { yearMonth: '2025-03', source: '운송-트럭', emissions: 123 },
      { yearMonth: '2025-04', source: '운송-트럭', emissions: 42 },
      { yearMonth: '2025-05', source: '운송-트럭', emissions: 123 },
      { yearMonth: '2025-06', source: '운송-트럭', emissions: 123 },
      { yearMonth: '2025-07', source: '운송-트럭', emissions: 41 },
      { yearMonth: '2025-08', source: '운송-트럭', emissions: 123 },
    ],
  },
  {
    id: 'c2',
    name: 'Globex',
    country: 'DE',
    emissions: [
      { yearMonth: '2024-01', source: '전기-한국전력', emissions: 80 },
      { yearMonth: '2024-02', source: '전기-한국전력', emissions: 105 },
      { yearMonth: '2024-03', source: '전기-한국전력', emissions: 120 },
      { yearMonth: '2025-05', source: '전기-한국전력', emissions: 101 },
      { yearMonth: '2025-03', source: '원소재-플라스틱 2', emissions: 23 },
      { yearMonth: '2025-05', source: '원소재-플라스틱 2', emissions: 40 },
      { yearMonth: '2025-07', source: '원소재-플라스틱 2', emissions: 43 },
      { yearMonth: '2025-05', source: '원소재-플라스틱 2', emissions: 232 },
      { yearMonth: '2025-05', source: '운송-트럭', emissions: 12 },
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
