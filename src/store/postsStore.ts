import { Post } from '@/types';
import { createStore } from 'zustand';

export interface PostStore {
  posts: Post[];
  getPostById: (id: string) => Post | undefined;
  createPost: (post: Post) => void;
  updatePost: (post: Post) => void;
}

export const createPostsStore = (initState: Post[]) => {
  return createStore<PostStore>()((set, get) => ({
    posts: initState,
    getPostById: (id) => get().posts.find((post) => post.id === id),
    createPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
    updatePost: (post) =>
      set((state) => ({
        posts: state.posts.map((p) => (p.id === post.id ? post : p)),
      })),
  }));
};

export type PostsStoreApi = ReturnType<typeof createPostsStore>;
