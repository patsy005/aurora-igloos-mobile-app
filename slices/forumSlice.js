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

export const fetchForumCategories = createAsyncThunk('forum/fetchForumCategories', async () => {
	const res = await fetch(`${API_URL}/api/ForumCategories`)

	if (!res.ok) {
		throw new Error('Failed to fetch forum categories')
	}

	const data = await res.json()

	return data
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
			.addCase(fetchForumCategories.pending, state => {
				state.isLoading = true
				state.error = null
				console.log('loading categories')
			})
			.addCase(fetchForumCategories.fulfilled, (state, action) => {
				state.isLoading = false
				state.forumCategories = action.payload
				console.log('categories loaded')
			})
			.addCase(fetchForumCategories.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.error.message
				console.log('failed to load categories')
			})
	},
})

export default forumSlice.reducer
