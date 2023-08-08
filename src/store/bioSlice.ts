import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Bio = {
  id: number;
  uid: number;
  bio: string;
}

type InitialState = {
  value: Bio;
}

const initialState = {
  value: {
    id: -1,
    uid: 0,
    bio: ''
  }
} as InitialState

export const bioCollection = createSlice({
  name: "bios",
  initialState,
  reducers: {
    insertBio: (state, action: PayloadAction<Bio>) => {
      return {
        value: {
          id: action.payload.id,
          uid: action.payload.uid,
          bio: action.payload.bio
        }
      }
    },
    bioLogOut: () => {
      return initialState;
    }
  }
})

export const { insertBio, bioLogOut } = bioCollection.actions;
export default bioCollection.reducer;