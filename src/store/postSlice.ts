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
    },
    insertUserPost: (state, action: PayloadAction<Post>) => {
      state.userPosts.push(action.payload);
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
    }
  }
})

export const { insertPost, insertUserPost, postLogOut, editPost } = postsCollection.actions;
export default postsCollection.reducer;