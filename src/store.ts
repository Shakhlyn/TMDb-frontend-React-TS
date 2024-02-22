import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
// import { useDispatch } from "react-redux";

import { apiSlice } from "./slice/apiSlice";
import datesSliceReducer from "./slice/datesSlice";
import watchListReducer from "./slice/watchListSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    dates: datesSliceReducer,
    watchList: watchListReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),

  devTools: true,
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// // Export a hook that can be reused to resolve types
// export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types
// // **** If we need to use "useSelector", we should make a reusable hook like 'AppDispatch' hook in this store module.

export default store;

// *******************

// import store from "./store";
// import setupListeners from "@reduxjs/toolkit/query/react";
// import App from "./App";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       {setupListeners()} // Call setupListeners here for application-wide setup  ***************
//       <App />
//     </Provider>
//   </React.StrictMode>
// );
