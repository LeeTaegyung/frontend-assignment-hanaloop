import { Post } from '@/types';
import { createStore } from 'zustand';

export interface PostStore {
  posts: Post[];
  createPost: (post: Post) => void;
  updatePost: (post: Post) => void;
}

export const createPostsStore = (initState: Post[]) => {
  return createStore<PostStore>()((set) => ({
    posts: initState,
    createPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
    updatePost: (post) =>
      set((state) => ({
        posts: state.posts.map((p) => (p.id === post.id ? post : p)),
      })),
  }));
};

export type PostsStoreApi = ReturnType<typeof createPostsStore>;
