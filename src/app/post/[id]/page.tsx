import PostDetailArea from '@/components/post/PostDetailArea';
import { fetchPosts } from '@/lib/api';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PostDetailPage({ params }: Props) {
  const { id } = await params;
  const post = await fetchPosts(id);

  return <PostDetailArea post={post} />;
}
