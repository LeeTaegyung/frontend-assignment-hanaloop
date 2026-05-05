import { Post } from '@/types';
import { create } from 'zustand';

interface PostStore {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  createPost: (post: Post) => void;
  updatePost: (post: Post) => void;
}

export const usePostsStore = create<PostStore>((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  createPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
  updatePost: (post) =>
    set((state) => ({
      posts: state.posts.map((p) => (p.id === post.id ? post : p)),
    })),
}));
