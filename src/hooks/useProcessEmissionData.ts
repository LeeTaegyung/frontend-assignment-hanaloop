import { EMISSION_FACTORS } from '@/constants/emissions';
import {
  GhgEmission,
  MonthlyEmissionDataType,
  YearlyEmissionDataType,
} from '@/types';
import { useMemo } from 'react';

interface Props {
  emissions: GhgEmission[];
  selectYear: string;
}

export const useProcessEmissionData = ({ emissions, selectYear }: Props) => {
  return useMemo(() => {
    // 데이터 기준 최신 년의 월별 배출량(scope + 총합)
    const monthlyEmissions: MonthlyEmissionDataType = {};
    for (let i = 0; i < 12; i++) {
      const month = String(i + 1).padStart(2, '0');
      monthlyEmissions[month] = {
        month: month,
        scopeData: null,
        total: 0,
      };
    }

    const yearlyEmissions: YearlyEmissionDataType = {
      year: selectYear,
      scopeData: null,
      total: 0,
    };

    emissions.forEach((emission) => {
      // 년도 필터링
      const [targetYear, targetMonth] = emission.yearMonth.split('-');
      if (targetYear !== selectYear) return;

      // 활동 데이터 정보
      const [parentSource, childrenSource] = emission.source.split('-');

      // 기준 배출계수 데이터 조회
      const findTargetFactor = EMISSION_FACTORS[parentSource][childrenSource];
      const targetFactor = findTargetFactor[findTargetFactor.length - 1];
      const { scope, unit } = targetFactor;

      // 활동데이터 x 배출계수 => 소수점 2자리수 아래 다 버리도록
      const calcValue =
        Math.trunc(emission.emissions * targetFactor.value * 10) / 10;

      const scopeKey = `scope${scope}`;

      updateMonthlyEmissions(
        monthlyEmissions,
        targetMonth,
        scopeKey,
        scope,
        calcValue,
        unit
      );
      updateYearlyEmissions(yearlyEmissions, scopeKey, scope, calcValue, unit);
    });

    return { monthlyEmissions, yearlyEmissions };
  }, [emissions, selectYear]);
};

// 월별 데이터 추가
const updateMonthlyEmissions = (
  monthlyEmissions: MonthlyEmissionDataType,
  targetMonth: string,
  scopeKey: string,
  scope: string,
  calcValue: number,
  unit: string
) => {
  const targetMonthData = monthlyEmissions[targetMonth];

  if (!targetMonthData.scopeData) {
    targetMonthData.scopeData = {};
  }

  if (!targetMonthData.scopeData[scopeKey]) {
    targetMonthData.scopeData[scopeKey] = { scope, value: 0, unit };
  }

  targetMonthData.scopeData[scopeKey].value += calcValue;
  targetMonthData.total += calcValue;
};

// 년도 데이터 추가
const updateYearlyEmissions = (
  yearlyEmissions: YearlyEmissionDataType,
  scopeKey: string,
  scope: string,
  calcValue: number,
  unit: string
) => {
  if (!yearlyEmissions.scopeData) {
    yearlyEmissions.scopeData = {};
  }

  if (!yearlyEmissions.scopeData[scopeKey]) {
    yearlyEmissions.scopeData[scopeKey] = { scope, value: 0, unit };
  }

  yearlyEmissions.scopeData[scopeKey].value += calcValue;
  yearlyEmissions.total += calcValue;
};
