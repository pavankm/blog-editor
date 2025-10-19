import React, { createContext, useContext, useReducer, ReactNode } from "react";
import type BlogPost from "../types/BlogPost";

// State interface
export interface PostStoreState {
  posts: BlogPost[];
  currentPostId: string | null;
}

// Actions interface
interface PostActions {
  addPost: (post: BlogPost) => void;
  updatePost: (id: string, post: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
  getPost: (id: string) => BlogPost | undefined;
  getAllPosts: () => BlogPost[];
  setCurrentPost: (id: string) => void;
  searchPosts: (query: string) => BlogPost[];
  getPostsByStatus: (published: boolean) => BlogPost[];
  clearAllPosts: () => void;
}

// Initial state
const initialState: PostStoreState = {
  posts: [],
  currentPostId: null,
};

// Action types
type PostAction =
  | { type: "ADD_POST"; payload: BlogPost }
  | { type: "UPDATE_POST"; payload: { id: string; post: Partial<BlogPost> } }
  | { type: "DELETE_POST"; payload: string }
  | { type: "SET_CURRENT_POST"; payload: string }
  | { type: "CLEAR_ALL_POSTS" };

// Reducer
function postReducer(
  state: PostStoreState,
  action: PostAction
): PostStoreState {
  switch (action.type) {
    case "ADD_POST":
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case "UPDATE_POST":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id
            ? {
                ...post,
                ...action.payload.post,
                updatedAt: new Date(),
              }
            : post
        ),
      };
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
    case "SET_CURRENT_POST":
      return {
        ...state,
        currentPostId: action.payload,
      };
    case "CLEAR_ALL_POSTS":
      return initialState;
    default:
      return state;
  }
}

// Context
interface PostContextType {
  state: PostStoreState;
  dispatch: React.Dispatch<PostAction>;
  actions: PostActions;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

// Provider
export const PostProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(postReducer, initialState);

  const actions: PostActions = {
    addPost: (post) => dispatch({ type: "ADD_POST", payload: post }),
    updatePost: (id, post) =>
      dispatch({ type: "UPDATE_POST", payload: { id, post } }),
    deletePost: (id) => dispatch({ type: "DELETE_POST", payload: id }),
    getPost: (id) => state.posts.find((post) => post.id === id),
    getAllPosts: () => state.posts,
    setCurrentPost: (id) => dispatch({ type: "SET_CURRENT_POST", payload: id }),
    searchPosts: (query) =>
      state.posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.content.toLowerCase().includes(query.toLowerCase())
      ),
    getPostsByStatus: (published) =>
      state.posts.filter((post) => post.published === published),
    clearAllPosts: () => dispatch({ type: "CLEAR_ALL_POSTS" }),
  };

  return (
    <PostContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </PostContext.Provider>
  );
};

// Hook - Compatible with zustand API
export const usePostStore = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePostStore must be used within PostProvider");
  }

  const { state, actions } = context;

  return {
    ...state,
    addPost: actions.addPost,
    updatePost: actions.updatePost,
    deletePost: actions.deletePost,
    getPost: actions.getPost,
    getAllPosts: actions.getAllPosts,
    setCurrentPost: actions.setCurrentPost,
    searchPosts: actions.searchPosts,
    getPostsByStatus: actions.getPostsByStatus,
    clearAllPosts: actions.clearAllPosts,
  };
};
