export const GHG_UNIT = 'kgCO₂e';

export const SCOPE_COLORS: Record<string, string> = {
  '1': '#8884d8',
  '2': '#82ca9d',
  '3': '#d88484',
};

export const EMISSION_FACTORS: Record<
  string,
  Record<string, { scope: string; value: number; unit: string }[]>
> = {
  전기: {
    한국전력: [
      {
        scope: '2',
        value: 0.456,
        unit: 'kWh',
      },
    ],
  },
  원소재: {
    '플라스틱 1': [
      {
        scope: '3',
        value: 2.3,
        unit: 'kg',
      },
    ],
    '플라스틱 2': [
      {
        scope: '3',
        value: 3.2,
        unit: 'kg',
      },
    ],
  },
  운송: {
    트럭: [
      {
        scope: '1',
        value: 3.5,
        unit: 'ton-km',
      },
    ],
  },
};
