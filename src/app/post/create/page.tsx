'use client';

import PostForm from '@/components/post/PostForm';
import { usePostsStore } from '@/components/providers/PostsStoreProvider';
import { createOrUpdatePost } from '@/lib/api';
import { Post } from '@/types';
import { useRouter } from 'next/navigation';

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
    }
  };

  return <PostForm onSubmit={handleSubmit} />;
}
