import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_URL } from '../constants/consts'

const initialState = {
	paymentMethods: [],
	isLoading: false,
	error: null,
}

export const fetchPaymentMethods = createAsyncThunk('bookings/fetchPaymentMethods', async () => {
	const response = await fetch(`${API_URL}/api/PaymentMethods`)
	if (!response.ok) {
		throw new Error('Failed to fetch payment methods')
	}

	const data = await response.json()

	return data
})

export const paymentMethodsSlice = createSlice({
	name: 'paymentMethods',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchPaymentMethods.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(fetchPaymentMethods.fulfilled, (state, action) => {
				state.isLoading = false
				state.paymentMethods = action.payload
				state.error = null
			})
			.addCase(fetchPaymentMethods.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.error.message
				console.log('rejected', action.error.message)
			})
	},
})

export default paymentMethodsSlice.reducer
