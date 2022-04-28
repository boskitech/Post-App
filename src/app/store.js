import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/CounterSlice'
import PostsReducer from '../features/posts/postSlice';
import { apiSlice } from '../features/api/apiSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: PostsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware().concat(apiSlice.middleware)
});
