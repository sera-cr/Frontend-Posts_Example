import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: AuthState;
}

type AuthState = {
  isAuth: boolean;
  email: string;
  name: string;
  uid: number;
  isAdmin: boolean;
}

export type User = {
  id: number;
  email: string;
  name: string;
  role: string;
}

const initialState = {
  value: {
    isAuth: false,
    email: "",
    name: "",
    uid: -1,
    isAdmin: false,
  }
} as InitialState;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },
    logIn: (state, action: PayloadAction<User>) => {
      return {
        value: {
          isAuth: true,
          email: action.payload.email,
          name: action.payload.name,
          uid: action.payload.id,
          isAdmin: action.payload.role === "User" ? false : true
        }
      }
    }
  },
})

export const { logIn, logOut } = auth.actions;
export default auth.reducer;