'use client';

import { usePostsStore } from '@/components/providers/PostsStoreProvider';
import { Button } from '@/components/ui/button';
import { useCompaniesStore } from '@/store/companiesStore';
import { useRouter } from 'next/navigation';

interface Props {
  id: string;
}

export default function PostDetailArea({ id }: Props) {
  const router = useRouter();
  const getPostById = usePostsStore((state) => state.getPostById);
  const post = getPostById(id);
  const getCompanyById = useCompaniesStore((store) => store.getCompanyById);

  if (post === undefined)
    return (
      <div className='flex flex-1 flex-col items-center justify-center gap-5 py-10'>
        <p>리포트가 없습니다.</p>
        <Button
          onClick={() => router.back()}
          className='mt-2 cursor-pointer'
          size={'lg'}
        >
          뒤로가기
        </Button>
      </div>
    );

  return (
    <div className='mx-auto flex min-h-100 max-w-125 flex-col gap-2 rounded-xl border p-5'>
      <div className='border-b pb-2 text-2xl'>{post.title}</div>

      <div className='text-muted-foreground flex items-center justify-between'>
        <div>{getCompanyById(post.resourceUid)?.name}</div>
        <div>{post.dateTime}</div>
      </div>

      <div className='flex-1 whitespace-pre-line'>{post.content}</div>

      <div className='flex gap-2'>
        <Button
          onClick={() => router.back()}
          className='mt-2 flex-1 cursor-pointer'
          size={'lg'}
          variant={'outline'}
        >
          뒤로가기
        </Button>

        <Button
          onClick={() => router.push(`/post/${id}/edit`)}
          className='mt-2 flex-1 cursor-pointer'
          size={'lg'}
        >
          수정하기
        </Button>
      </div>
    </div>
  );
}
