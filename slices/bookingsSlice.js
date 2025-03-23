import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_URL } from '../constants/consts'

const initialState = {
	bookings: [],
	isLoading: false,
	error: null,
}

export const fetchBookings = createAsyncThunk('bookings/fetchBookings', async () => {
	const response = await fetch(`${API_URL}/api/Bookings`)

	if (!response.ok) {
		throw new Error('Failed to fetch bookings')
	}

	const data = await response.json()
	return data
})

export const bookingsSlice = createSlice({
	name: 'bookings',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchBookings.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(fetchBookings.fulfilled, (state, action) => {
				state.isLoading = false
				state.bookings = action.payload
				state.error = null
			})
			.addCase(fetchBookings.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.error.message
				console.log('rejected', action.error.message)
			})
	},
})

export default bookingsSlice.reducer
