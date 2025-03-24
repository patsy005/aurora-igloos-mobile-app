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

export const addNewBooking = createAsyncThunk('bookings/addNewBooking', async booking => {
	const res = await fetch(`${API_URL}/api/Bookings`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(booking),
	})

	if (!res.ok) {
		const errorMessage = await res.text()
		console.log(errorMessage)
		throw new Error('Failed to add booking')
	}

	const data = await res.json()

	return data
})

export const editBooking = createAsyncThunk('bookings/editBooking', async ({ id, booking }) => {
	console.log('Editing Booking with ID:', id)
	console.log('Booking Data:', booking)

	const bookingData = { id: id, ...booking }

	const res = await fetch(`${API_URL}/api/Bookings/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(bookingData),
	})

	if (!res.ok) {
		const errorMessage = await res.text()
		console.log(errorMessage)
		throw new Error('Failed to edit booking')
	}

	// const data = await res.json()

	// return data

	const text = await res.text()

	return text ? JSON.parse(text) : {}
})

export const deleteBooking = createAsyncThunk('bookings/deleteBooking', async id => {
	const res = await fetch(`${API_URL}/api/Bookings/${id}`, {
		method: 'DELETE',
	})

	if (!res.ok) {
		const errorMessage = await res.text()
		console.log(errorMessage)
		throw new Error('Failed to delete booking')
	}

	// const data = await res.json()

	// return data

	const text = await res.text()

	return text ? JSON.parse(text) : {}
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
				sortBookings()
			})
			.addCase(fetchBookings.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.error.message
				console.log('rejected', action.error.message)
			})

			.addCase(addNewBooking.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(addNewBooking.fulfilled, (state, action) => {
				state.isLoading = false
				state.bookings = [...state.bookings, action.payload]
				state.error = null
			})
			.addCase(addNewBooking.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.error.message
				console.log('rejected', action.error.message)
			})

			.addCase(editBooking.pending, state => {
				state.isLoading = true
				state.error = null
				console.log('editBooking.pending')
			})
			.addCase(editBooking.fulfilled, (state, action) => {
				state.isLoading = false
				// state.bookings = state.bookings.map(booking => (booking.id === action.payload.id ? action.payload : booking))
				const { id, booking } = action.payload
				const index = state.bookings.findIndex(booking => booking.id === id)
				state.bookings[index] = booking
				state.error = null
				console.log('editBooking.fulfilled')
			})
			.addCase(editBooking.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.error.message
				console.log('rejected', action.error.message)
			})

			.addCase(deleteBooking.pending, state => {
				state.isLoading = true
				state.error = null
				console.log('deleteBooking.pending')
			})
			.addCase(deleteBooking.fulfilled, (state, action) => {
				state.isLoading = false
				state.bookings = state.bookings.filter(booking => booking.id !== action.payload.id)
				state.error = null
				console.log('deleteBooking.fulfilled')
			})
			.addCase(deleteBooking.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.error.message
				console.log('rejected', action.error.message)
			})
	},
})

export default bookingsSlice.reducer
