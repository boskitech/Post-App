import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get('http://localhost:5000/posts');
    return response.data;
})

export const addPost = createAsyncThunk('posts/addNewPost', async initialPost => {
    const response = await axios.post('http://localhost:5000/posts', initialPost)
    return response.data
})

const initialState = {
    posts: [],
    status: 'idle',
    error: null
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: (state, action) => {
            state.posts.push(action.payload)
        },
        deletePost: (state, action) => state.posts.filter((post) => post.id !== action.payload),
        postUpdate: (state, action) => {
            const { id, title, content } = action.payload
            const existingPost = state.posts.find((post) => post.id === id)
            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Add any fetched posts to the array
                state.posts = action.payload
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addPost.fulfilled, (state, action) => {
                state.posts.push(action.payload)
            })
    }
})

export const { postAdded, deletePost, postUpdate } = postsSlice.actions

export const selectAllPosts = state => state.posts.posts

export const selectPostBtId = (state, postId) => state.posts.posts.find(post => post.id === postId)

export default postsSlice.reducer
