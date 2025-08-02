import { create } from "zustand";
import type { Post } from "@/types/post";
interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  createPost: (
    post: Omit<Post, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  updatePost: (id: number, post: Partial<Post>) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
  getPost: (id: number) => Post | undefined;
}

export const usePostsStore = create<PostsState>((set, get) => ({
  posts: [],
  loading: false,
  error: null,

  fetchPosts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("/api/posts");
      const posts = await response.json();
      set({ posts, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch posts", loading: false });
    }
  },

  createPost: async (post) => {
    set({ loading: true });
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });
      const newPost = await response.json();
      set((state) => ({
        posts: [newPost, ...state.posts],
        loading: false,
      }));
    } catch (error) {
      set({ error: "Failed to create post", loading: false });
    }
  },

  updatePost: async (id, updatedPost) => {},

  deletePost: async (id) => {},

  getPost: (id) => {
    return get().posts.find((post) => post.id === id);
  },
}));

export const usePosts = () => usePostsStore();
