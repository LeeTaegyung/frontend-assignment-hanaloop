'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-2'>
      <h2>데이터를 불러오지 못하였습니다. 다시 시도해주세요.</h2>
      <Button onClick={() => unstable_retry()}>다시 시도</Button>
    </div>
  );
}
