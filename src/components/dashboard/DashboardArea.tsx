'use client';

import MonthlyStackBarChart from '@/components/dashboard/MonthlyStackBarChart';
import YearlyPieChart from '@/components/dashboard/YearlyPieChart';
import { usePostsStore } from '@/components/providers/PostsStoreProvider';
import { useProcessEmissionData } from '@/hooks/useProcessEmissionData';
import { useCompaniesStore } from '@/store/companiesStore';
import { Company } from '@/types';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

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
  const setCompanies = useCompaniesStore((stroe) => stroe.setCompanies);
  const posts = usePostsStore((state) => state.posts);

  // 초기 데이터 기준 최신년월 => 초기값으로 사용
  const [selectYear, setSelectYear] = useState(
    () => getLatestYearMonth(companies).year
  );
  const [filterCompany, setFilterCompany] = useState('all');
  // 회사필터링 적용
  const emissions = useMemo(
    () =>
      companies.flatMap((company) => {
        if (filterCompany === 'all') return company.emissions;
        return company.id === filterCompany ? company.emissions : [];
      }),
    [companies, filterCompany]
  );
  const { monthlyEmissions, yearlyEmissions } = useProcessEmissionData({
    emissions,
    selectYear,
  });
  const isEmpty = monthlyEmissions === null || yearlyEmissions === null;
  const currentYear = new Date().getFullYear();
  const selectYearList = Array.from({ length: 11 }, (_, i) => currentYear - i);

  useEffect(() => {
    // 다른 컴포넌트에서 회사정보/포스트정보를 꺼내오기 위해 zustand set
    setCompanies(companies);
  }, [companies, setCompanies]);

  return (
    <div className='flex flex-col gap-5'>
      <div>
        <h2 className='mb-5 text-2xl font-bold'>탄소 배출 현황</h2>
        <div className='flex items-center gap-5 border-b border-dashed pb-5'>
          {/* 년도 필터링 */}
          <div className='flex items-center gap-2'>
            <span className='font-medium'>년도</span>
            <select
              value={selectYear}
              onChange={(e) => setSelectYear(e.target.value)}
              className='h-10 rounded-sm border px-5'
            >
              {selectYearList.map((year) => (
                <option value={year} key={year}>
                  {year}
                </option>
              ))}
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
        {isEmpty ? (
          <div className='flex flex-1 items-center justify-center py-20'>
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
      <hr />
      <div>
        <h2 className='mb-5 text-2xl font-bold'>최신 리포트</h2>
        <ul>
          {posts
            .sort((a, b) => (a.dateTime > b.dateTime ? -1 : 1))
            .slice(0, 5)
            .map((post) => {
              const company = companies.find(
                (company) => company.id === post.resourceUid
              )?.name;

              return (
                <li key={post.id} className='border-b last-of-type:border-b-0'>
                  <Link
                    href={`/post/${post.id}`}
                    className='hover:bg-muted block px-1 py-2'
                  >
                    <p className='mb-0.5 text-lg'>{post.title}</p>
                    <div className='text-muted-foreground flex gap-2 text-sm'>
                      <span>{post.dateTime}</span>
                      {!!company && <span>{company}</span>}
                    </div>
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
