'use client';

import { usePostsStore } from '@/components/providers/PostsStoreProvider';
import { Button } from '@/components/ui/button';
import { useCompaniesStore } from '@/store/companiesStore';
import Link from 'next/link';

export default function PostListPage() {
  const posts = usePostsStore((state) => state.posts);
  const companies = useCompaniesStore((state) => state.companies);

  return (
    <div>
      <Button asChild size={'lg'}>
        <Link href={'/post/create'}>리포트 등록</Link>
      </Button>

      {posts.length === 0 ? (
        <div className='flex flex-1 items-center justify-center py-20'>
          등록된 리포트가 없습니다.
        </div>
      ) : (
        <ul className='mt-5 border-t-2 border-black'>
          {posts.map((post) => {
            const company = companies.find(
              (company) => company.id === post.resourceUid
            )?.name;
            return (
              <li key={post.id} className='border-b'>
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
      )}
    </div>
  );
}
