import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_URL } from '../constants/consts'

const initialState = {
	forumCategories: [],
	isLoading: false,
	error: null,
}

export const fetchForumCategories = createAsyncThunk('forum/fetchForumCategories', async () => {
	const res = await fetch(`${API_URL}/api/ForumCategories`)

	if (!res.ok) {
        const errMsg = await res.text()
        console.log(errMsg)
		throw new Error('Failed to fetch forum categories')
	}

	const data = await res.json()

	return data
})

export const forumCategoriesSlice = createSlice({
	name: 'forumCategories',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
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

export default forumCategoriesSlice.reducer
