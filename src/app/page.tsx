import DashboardArea from '@/components/dashboard/DashboardArea';
import { fetchCompanies, fetchPosts } from '@/lib/api';

export default async function Home() {
  const [companies, posts] = await Promise.all([
    fetchCompanies(),
    fetchPosts(),
  ]);

  return <DashboardArea companies={companies} posts={posts} />;
}
