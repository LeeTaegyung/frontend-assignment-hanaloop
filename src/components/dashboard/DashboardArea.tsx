'use client';

import MonthlyStackBarChart from '@/components/dashboard/MonthlyStackBarChart';
import YearlyPieChart from '@/components/dashboard/YearlyPieChart';
import { useProcessEmissionData } from '@/hooks/useProcessEmissionData';
import { Company } from '@/types';
import { useState } from 'react';

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
  const latestYearMonth = getLatestYearMonth(companies);
  // 초기 데이터 기준 최신년월 => 초기값으로 사용
  const [selectYear, setSelectYear] = useState(latestYearMonth.year);
  const [filterCompany, setFilterCompany] = useState('all');
  // 회사필터링 적용
  const emissions = companies.flatMap((company) => {
    if (filterCompany === 'all') return company.emissions;
    return company.id === filterCompany ? company.emissions : [];
  });
  const { monthlyEmissions, yearlyEmissions } = useProcessEmissionData({
    emissions,
    selectYear,
  });

  return (
    <div className='flex flex-col gap-5 p-5'>
      <div className='flex items-center gap-5 border-b border-dashed pb-5'>
        {/* 년도 필터링 */}
        <div className='flex items-center gap-2'>
          <span className='font-medium'>년도</span>
          <select
            value={selectYear}
            onChange={(e) => setSelectYear(e.target.value)}
            className='h-10 rounded-sm border px-5'
          >
            <option value='2023'>2023</option>
            <option value='2024'>2024</option>
            <option value='2025'>2025</option>
          </select>
        </div>
        {/* 회사 필터링 */}
        <div className='flex items-center gap-2'>
          <span className='font-medium'>회사</span>
          <select
            value={filterCompany}
            onChange={(e) => setFilterCompany(e.target.value)}
            className='h-10 rounded-sm border pr-3 pl-2'
          >
            <option value='all'>전체</option>
            {companies.map((company) => (
              <option value={company.id} key={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {emissions.length === 0 ? (
        <div className='flex-1 items-center justify-center p-5'>
          데이터가 없습니다.
        </div>
      ) : (
        <div className='flex gap-2'>
          <div className='flex-1'>
            <YearlyPieChart yearlyEmissions={yearlyEmissions} />
          </div>
          <div className='flex-2'>
            <MonthlyStackBarChart initData={monthlyEmissions} />
          </div>
        </div>
      )}
    </div>
  );
}
