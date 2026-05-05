import DashboardArea from '@/components/dashboard/DashboardArea';
import { fetchCompanies } from '@/lib/api';

export default async function Home() {
  const companies = await fetchCompanies();

  return <DashboardArea companies={companies} />;
}
