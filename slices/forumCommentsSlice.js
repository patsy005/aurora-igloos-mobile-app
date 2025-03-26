import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_URL } from '../constants/consts'

const initialState = {
	isLoading: false,
	error: null,
	comments: [],
}

// export const addNewComment = createAsyncThunk('forumComments/addNewComment', async post => {
//     console.log(post)
// 	const res = await fetch(`${API_URL}/api/ForumComments`, {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 		body: JSON.stringify(post),
// 	})

// 	if (!res.ok) {
// 		const errorMessage = await res.text()
// 		console.log(errorMessage)
// 		throw new Error('Failed to add comment')
// 	}

// 	const data = await res.json()

// 	return data
// })

export const addNewComment = createAsyncThunk('forumComments/addNewComment', async (commentData, thunkAPI) => {
	const response = await fetch(`${API_URL}/api/ForumComments`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(commentData),
	})

	if (!response.ok) {
		const error = await response.text()
		throw new Error(error)
	}

	return await response.json()
})

export const editComment = createAsyncThunk('forumComments/editComment', async ({ id, comment }) => {
	const commentData = { id: id, ...comment }

	const res = await fetch(`${API_URL}/api/ForumComments/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(commentData),
	})

	if (!res.ok) {
		const errorMessage = await res.text()
		console.log(errorMessage)
		throw new Error('Failed to edit comment')
	}

	if (res.status === 204) {
		return commentData
	}

	const data = await res.json()

	return data
})

export const deleteComment = createAsyncThunk('forumComments/deleteComment', async id => {
	const res = await fetch(`${API_URL}/api/ForumComments/${id}`, {
		method: 'DELETE',
	})

	if (!res.ok) {
		const errorMessage = await res.text()
		console.log(errorMessage)
		throw new Error('Failed to delete comment')
	}

	return id
})

export const forumCommentsSlice = createSlice({
	name: 'forumComments',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(addNewComment.pending, state => {
				state.isLoading = true
				state.error = null
				console.log('comment pending')
			})
			.addCase(addNewComment.fulfilled, (state, action) => {
				state.isLoading = false
				state.comments.push(action.payload)
				console.log('comment fulfilled')
			})
			.addCase(addNewComment.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.error.message
				console.log('comment rejected')
			})

			.addCase(editComment.pending, state => {
				state.isLoading = true
				state.error = null
				console.log('edit comment pending')
			})
			.addCase(editComment.fulfilled, (state, action) => {
				state.isLoading = false
				const index = state.comments.findIndex(comment => comment.id === action.payload.id)
				state.comments[index] = action.payload
				console.log('edit comment fulfilled')
			})
			.addCase(editComment.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.error.message
				console.log('edit comment rejected')
			})

			.addCase(deleteComment.pending, state => {
				state.isLoading = true
				state.error = null
				console.log('delete comment pending')
			})
			.addCase(deleteComment.fulfilled, (state, action) => {
				state.isLoading = false
				state.comments = state.comments.filter(comment => comment.id !== action.payload)
				console.log('delete comment fulfilled')
			})
			.addCase(deleteComment.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.error.message
				console.log('delete comment rejected')
			})
	},
})
