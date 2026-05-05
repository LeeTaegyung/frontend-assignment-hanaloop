import PostDetailArea from '@/components/post/PostDetailArea';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PostDetailPage({ params }: Props) {
  const { id } = await params;

  return <PostDetailArea id={id} />;
}
