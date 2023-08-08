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
  canEdit: boolean;
  canDelete: boolean;
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
    },
    insertUserPost: (state, action: PayloadAction<Post>) => {
      state.userPosts.push(action.payload);
    },
    postLogOut: () => {
      return initialState;
    }
  }
})

export const { insertPost, insertUserPost, postLogOut } = postsCollection.actions;
export default postsCollection.reducer;