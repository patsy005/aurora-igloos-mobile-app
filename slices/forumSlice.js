import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_URL } from '../constants/consts'

const initialState = {
	forumPosts: [],
	forumCategories: [],
	isLoading: false,
	error: null,
}

export const fetchForumPosts = createAsyncThunk('forum/fetchForumPosts', async () => {
	const res = await fetch(`${API_URL}/api/ForumPosts`)

	if (!res.ok) {
		throw new Error('Failed to fetch forum posts')
	}

	const data = await res.json()

	return data
})

export const addNewForumPost = createAsyncThunk('forum/addNewForumPost', async post => {
	const res = await fetch(`${API_URL}/api/ForumPosts`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(post),
	})
	console.log('post', post)

	if (!res.ok) {
		const errorMessage = await res.text()
		console.log(errorMessage)
		throw new Error('Failed to add post')
	}

	// if (res.status === 204) return post

	const data = await res.json()

	return data
})

export const editPost = createAsyncThunk('forum/editForumPost', async ({ id, post }) => {
	const postData = { id: id, ...post }

	const res = await fetch(`${API_URL}/api/ForumPosts/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(postData),
	})

	if (!res.ok) {
		const errorMessage = await res.text()
		console.log(errorMessage)
		throw new Error('Failed to edit post')
	}

	if (res.status === 204) return postData

	const data = await res.json()

	return data
})

export const deletePost = createAsyncThunk('forum/deleteForumPost', async id => {
	const res = await fetch(`${API_URL}/api/ForumPosts/${id}`, {
		method: 'DELETE',
	})

	if (!res.ok) {
		const errorMessage = await res.text()
		console.log(errorMessage)
		throw new Error('Failed to delete post')
	}

	return id
})

export const forumSlice = createSlice({
	name: 'forum',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchForumPosts.pending, state => {
				state.isLoading = true
				state.error = null
				console.log('loading posts')
			})
			.addCase(fetchForumPosts.fulfilled, (state, action) => {
				state.isLoading = false
				state.forumPosts = action.payload
				console.log('posts loaded')
			})
			.addCase(fetchForumPosts.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.error.message
				console.log('failed to load posts')
			})

			.addCase(addNewForumPost.pending, state => {
				state.isLoading = true
				state.error = null
				console.log('adding post')
			})
			.addCase(addNewForumPost.fulfilled, (state, action) => {
				state.isLoading = false
				state.forumPosts = [...state.forumPosts, action.payload]
				console.log('post added')
			})
			.addCase(addNewForumPost.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.error.message
				console.log('failed to add post')
			})

			.addCase(editPost.pending, state => {
				state.isLoading = true
				state.error = null
				console.log('editing post')
			})
			.addCase(editPost.fulfilled, (state, action) => {
				state.isLoading = false
				const index = state.forumPosts.findIndex(post => post.id === action.payload.id)
				state.forumPosts[index] = action.payload
				console.log('post edited')
			})
			.addCase(editPost.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.error.message
				console.log('failed to edit post')
			})

			.addCase(deletePost.pending, state => {
				state.isLoading = true
				state.error = null
				console.log('deleting post')
			})
			.addCase(deletePost.fulfilled, (state, action) => {
				state.isLoading = false
				state.forumPosts = state.forumPosts.filter(post => post.id !== action.payload)
				console.log('post deleted')
			})
			.addCase(deletePost.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.error.message
				console.log('failed to delete post')
			})
	},
})

export default forumSlice.reducer
