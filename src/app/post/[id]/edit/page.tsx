'use client';
import PostForm from '@/components/post/PostForm';
import { usePostsStore } from '@/components/providers/PostsStoreProvider';
import { createOrUpdatePost } from '@/lib/api';
import { Post } from '@/types';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'sonner';

export default function PostEditPage() {
  const param = useParams();
  const router = useRouter();
  const paramId = param.id as string;
  const getPostById = usePostsStore((state) => state.getPostById);
  const updatePost = usePostsStore((state) => state.updatePost);
  const initPost = getPostById(paramId);

  const handleSubmit = async (post: Omit<Post, 'id'>) => {
    const updatePostData = {
      ...post,
      id: paramId,
    };

    try {
      const data = await createOrUpdatePost(updatePostData);
      updatePost(data);
      router.push('/post');
    } catch (error) {
      console.error(error);
      toast.error('수정에 실패하였습니다. 다시 시도해주세요.', {
        position: 'bottom-center',
      });
    }
  };

  return <PostForm initValue={initPost} onSubmit={handleSubmit} />;
}
