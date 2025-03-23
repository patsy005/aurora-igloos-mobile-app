import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_URL } from '../constants/consts'

const initialState = {
	discounts: [],
	isLoading: false,
	error: null,
}

export const fetchDiscounts = createAsyncThunk('discounts/fetchDiscounts', async () => {
	const res = await fetch(`${API_URL}/api/Discounts`)

	if (!res.ok) {
		throw new Error('Failed to fetch discounts')
	}

	const data = await res.json()

	return data
})

export const discountsSlice = createSlice({
	name: 'discounts',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchDiscounts.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(fetchDiscounts.fulfilled, (state, action) => {
				state.isLoading = false
				state.discounts = action.payload
			})
			.addCase(fetchDiscounts.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.error.message
			})
	},
})

export default discountsSlice.reducer
