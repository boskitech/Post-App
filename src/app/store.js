import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/CounterSlice'
import PostsReducer from '../features/posts/postSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: PostsReducer
  },
});
