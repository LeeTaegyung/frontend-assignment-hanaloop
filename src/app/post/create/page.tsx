'use client';

import PostForm from '@/components/post/PostForm';
import { usePostsStore } from '@/components/providers/PostsStoreProvider';
import { createOrUpdatePost } from '@/lib/api';
import { Post } from '@/types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function PostCreatePage() {
  const router = useRouter();
  const createPost = usePostsStore((state) => state.createPost);

  const handleSubmit = async (post: Omit<Post, 'id'>) => {
    try {
      const data = await createOrUpdatePost(post);
      createPost(data);
      router.push('/post');
    } catch (error) {
      console.error(error);
      toast.error('등록에 실패하였습니다. 다시 시도해주세요.', {
        position: 'bottom-center',
      });
    }
  };

  return <PostForm onSubmit={handleSubmit} />;
}
