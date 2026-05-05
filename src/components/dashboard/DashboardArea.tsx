'use client';

import MonthlyStackBarChart from '@/components/dashboard/MonthlyStackBarChart';
import YearlyPieChart from '@/components/dashboard/YearlyPieChart';
import { useProcessEmissionData } from '@/hooks/useProcessEmissionData';
import { Company } from '@/types';

interface Props {
  companies: Company[];
}

const getLatestYearMonth = (companies: Company[]) => {
  const allEmissions = companies.flatMap((c) => c.emissions);
  if (allEmissions.length === 0)
    return {
      year: String(new Date().getFullYear()),
      month: String(new Date().getMonth() + 1).padStart(2, '0'),
    };

  const latestYearMonth = allEmissions.reduce((latest, cur) => {
    return latest > cur.yearMonth ? latest : cur.yearMonth;
  }, '0000-00');

  const [year, month] = latestYearMonth.split('-');

  return { year, month };
};

export default function DashboardArea({ companies }: Props) {
  // 초기 데이터 기준 최신년월 => 초기값으로 사용
  const latestYearMonth = getLatestYearMonth(companies);
  // 회사필터링 적용
  const filterCompany: string = 'all';
  const emissions = companies.flatMap((company) => {
    if (filterCompany === 'all') return company.emissions;
    return company.id === filterCompany ? company.emissions : [];
  });
  const { monthlyEmissions, yearlyEmissions } = useProcessEmissionData({
    emissions,
    latestYearMonth,
  });

  return (
    <div className='p-5'>
      <div className='flex gap-2'>
        <div className='flex-1'>
          <YearlyPieChart yearlyEmissions={yearlyEmissions} />
        </div>
        <div className='flex-2'>
          <MonthlyStackBarChart initData={monthlyEmissions} />
        </div>
      </div>
    </div>
  );
}
