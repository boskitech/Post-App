import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
    tagTypes: ['Post'],
    endpoints: builder => ({
        getPosts: builder.query({
            query:() => '/posts',
            providesTags: ['Post']
        }),
        addNewPost: builder.mutation({
            query: initialPost => ({
                url: '/posts',
                method: 'POST',
                body: initialPost
            }),
            invalidatesTags: ['Post']
        }),
        updatePost: builder.mutation({
            query: post => ({
                url: `/posts/${post.id}`,
                method: 'PUT',
                body: post
            }),
            invalidatesTags: ['Post']
        }),
        deletePost: builder.mutation({
            query: id => ({
                url: `/posts/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['Post']
        }),
    })
})

export const { useGetPostsQuery, useAddNewPostMutation, useUpdatePostMutation, useDeletePostMutation } = apiSlice