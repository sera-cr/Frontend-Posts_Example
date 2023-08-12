import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  authorId: number;
  published: boolean;
  name: string;
  email: string;
}

type PostsCollectionState = Array<Post>;

type InitialState = {
  allPosts: PostsCollectionState;
  userPosts: PostsCollectionState;
}

const initialState = {
  allPosts: [],
  userPosts: []
} as InitialState;

export const postsCollection = createSlice({
  name: "posts",
  initialState,
  reducers: {
    insertPost: (state, action: PayloadAction<Post>) => {
      state.allPosts.push(action.payload);
      state.allPosts.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
    },
    insertUserPost: (state, action: PayloadAction<Post>) => {
      state.userPosts.push(action.payload);
      state.userPosts.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
    },
    postLogOut: () => {
      return initialState;
    },
    editPost: (state, action: PayloadAction<Post>) => {
      const post = state.allPosts.find((element) => element.id === action.payload.id);
      if (post) {
        post.title = action.payload.title;
        post.content = action.payload.content;
        post.published = action.payload.published;
        post.updatedAt = action.payload.updatedAt;
      }
      state.allPosts.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
    },
    editUserPost: (state, action: PayloadAction<Post>) => {
      const post = state.userPosts.find((element) => element.id === action.payload.id);
      if (post) {
        post.title = action.payload.title;
        post.content = action.payload.content;
        post.published = action.payload.published;
        post.updatedAt = action.payload.updatedAt;
      }
      state.userPosts.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
    },
    deletePost: (state, action: PayloadAction<number>) => {
      const index = state.allPosts.findIndex((element) => element.id === action.payload);
      state.allPosts.splice(index, 1);
      state.allPosts.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
    },
    deleteUserPost: (state, action: PayloadAction<number>) => {
      const index = state.userPosts.findIndex((element) => element.id === action.payload);
      state.userPosts.splice(index, 1);
      state.userPosts.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
    },
  }
})

export const { insertPost, insertUserPost, postLogOut, editPost, editUserPost, deletePost, deleteUserPost } = postsCollection.actions;
export default postsCollection.reducer;