'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PostListPage() {
  return (
    <div>
      <Button asChild size={'lg'}>
        <Link href={'/post/create'}>리포트 등록</Link>
      </Button>
    </div>
  );
}
