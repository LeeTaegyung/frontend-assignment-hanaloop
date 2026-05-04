'use client';

import { EMISSION_FACTORS } from '@/constants/emissions';
import { Company } from '@/types';

interface Props {
  companies: Company[];
}

const getLatestYearMonth = (companies: Company[]) => {
  const allEmissions = companies.flatMap((c) => c.emissions);
  if (allEmissions.length === 0)
    return { year: new Date().getFullYear(), month: new Date().getMonth() + 1 };

  const latestYearMonth = allEmissions.reduce((latest, cur) => {
    return latest > cur.yearMonth ? latest : cur.yearMonth;
  }, '0000-00');

  const [year, month] = latestYearMonth.split('-');

  return { year, month };
};

export type ScopeEmissionsDataType = Record<
  string,
  { value: number; unit: string }
>;
export type MonthlyEmissionDataType = Record<string, ScopeEmissionsDataType>;

export default function DashboardArea({ companies }: Props) {
  // 초기 데이터 기준 최신년월
  const latestYearMonth = getLatestYearMonth(companies);

  // 회사필터링 적용
  const filterCompany: string = 'all';
  const emissionsFlatMap = companies.flatMap((company) => {
    if (filterCompany === 'all') return company.emissions;
    return company.id === filterCompany ? company.emissions : [];
  });

  // 데이터 기준 최신 년의 월별 배출량(scope + 총합)
  const monthlyEmissions = emissionsFlatMap.reduce<MonthlyEmissionDataType>(
    (acc, cur) => {
      const [targetYear, targetMonth] = cur.yearMonth.split('-');

      // 년도 필터링
      if (targetYear !== String(latestYearMonth.year)) return acc;

      // 활동 데이터 정보 파악
      const [parentSource, childrenSource] = cur.source.split('-');

      // 기준 배출계수 데이터 파악
      const findTargetFactor = EMISSION_FACTORS[parentSource][childrenSource];
      const targetFactor = findTargetFactor[findTargetFactor.length - 1];
      const scope = targetFactor.scope;

      // 활동데이터 x 배출계수
      const calcValue = cur.emissions * targetFactor.value;

      if (targetMonth in acc) {
        if (scope in acc[targetMonth]) {
          return {
            ...acc,
            [targetMonth]: {
              ...acc[targetMonth],
              [scope]: {
                ...acc[targetMonth][scope],
                value: acc[targetMonth][scope].value + calcValue,
              },
            },
          };
        } else {
          return {
            ...acc,
            [targetMonth]: {
              ...acc[targetMonth],
              [scope]: {
                value: calcValue,
                unit: targetFactor.unit,
              },
            },
          };
        }
      } else {
        return {
          ...acc,
          [targetMonth]: {
            ...acc[targetMonth],
            [scope]: {
              value: calcValue,
              unit: targetFactor.unit,
            },
          },
        };
      }
    },
    {}
  );

  // 데이터 기준 최신 년의 전체 배출량(scope + 총합)
  const totalEmissions = Object.values(
    monthlyEmissions
  ).reduce<ScopeEmissionsDataType>((acc, data) => {
    const newAcc = { ...acc };

    for (const key in data) {
      if (newAcc[key]) {
        newAcc[key] = {
          ...newAcc[key],
          value: acc[key].value + data[key].value,
        };
      } else {
        newAcc[key] = {
          value: data[key].value,
          unit: data[key].unit,
        };
      }
    }

    return newAcc;
  }, {});

  return <div className='p-5'>초기화면</div>;
}
