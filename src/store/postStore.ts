import { create } from "zustand";
import { persist } from "zustand/middleware";
import type BlogPost from "../types/BlogPost";

interface PostStoreState {
  // State
  posts: BlogPost[];
  currentPostId: string | null;

  // Actions
  addPost: (post: BlogPost) => void;
  updatePost: (id: string, post: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
  getPost: (id: string) => BlogPost | undefined;
  getAllPosts: () => BlogPost[];
  setCurrentPost: (id: string) => void;

  // Filtering & Searching
  searchPosts: (query: string) => BlogPost[];
  getPostsByStatus: (published: boolean) => BlogPost[];

  // Bulk operations
  clearAllPosts: () => void;
}

const initialState = {
  posts: [],
  currentPostId: null,
};

export const usePostStore = create<PostStoreState>()(
  persist(
    (set, get) => ({
      ...initialState,

      addPost: (post: BlogPost) => {
        set((state) => ({
          posts: [...state.posts, post],
        }));
      },

      updatePost: (id: string, postUpdate: Partial<BlogPost>) => {
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id
              ? {
                  ...post,
                  ...postUpdate,
                  updatedAt: new Date(),
                }
              : post
          ),
        }));
      },

      deletePost: (id: string) => {
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== id),
          currentPostId:
            state.currentPostId === id ? null : state.currentPostId,
        }));
      },

      getPost: (id: string) => {
        return get().posts.find((post) => post.id === id);
      },

      getAllPosts: () => {
        return get().posts;
      },

      setCurrentPost: (id: string) => {
        set({ currentPostId: id });
      },

      searchPosts: (query: string) => {
        const lowerQuery = query.toLowerCase();
        return get().posts.filter(
          (post) =>
            post.title.toLowerCase().includes(lowerQuery) ||
            post.content.toLowerCase().includes(lowerQuery)
        );
      },

      getPostsByStatus: (published: boolean) => {
        return get().posts.filter((post) => post.published === published);
      },

      clearAllPosts: () => {
        set({ posts: [], currentPostId: null });
      },
    }),
    {
      name: "post-store",
      version: 1,
    }
  )
);
