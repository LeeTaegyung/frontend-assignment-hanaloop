'use client';

import { createPostsStore, PostsStoreApi, PostStore } from '@/store/postsStore';
import { Post } from '@/types';
import { createContext, ReactNode, useContext, useState } from 'react';
import { useStore } from 'zustand';

const PostsStoreContext = createContext<PostsStoreApi | null>(null);

export function PostProvider({
  posts,
  children,
}: {
  posts: Post[];
  children: ReactNode;
}) {
  const [store] = useState(() => createPostsStore(posts));

  return (
    <PostsStoreContext.Provider value={store}>
      {children}
    </PostsStoreContext.Provider>
  );
}

export const usePostsStore = <T,>(selector: (store: PostStore) => T): T => {
  const postsStoreContext = useContext(PostsStoreContext);
  if (!postsStoreContext) {
    throw new Error(`Post Provider 없음`);
  }

  return useStore(postsStoreContext, selector);
};
