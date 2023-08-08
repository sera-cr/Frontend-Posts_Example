import { combineReducers, configureStore, } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import postReducer from "./postSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const allReducers = combineReducers({
  auth: authReducer,
  posts: postReducer
})

export const store = configureStore({
  reducer: {
    allReducers,
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;