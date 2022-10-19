import { configureStore } from "@reduxjs/toolkit";
import boards from "../slices/boards";
import tasks from "../slices/tasks";

export const store = configureStore({
  reducer: {
    boards: boards,
    tasks: tasks,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
