import { configureStore } from "@reduxjs/toolkit";
// import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// // Export a hook that can be reused to resolve types
// export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types
// // **** If we need to use "useSelector", we should make a reusable hook like 'AppDispatch' hook in this store module.

export default store;
