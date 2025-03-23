import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_URL } from '../constants/consts'

const initialState = {
	customers: [],
	isLoading: false,
	error: null,
}

export const fetchCustomers = createAsyncThunk('customers/fetchCustomers', async () => {
	const response = await fetch(`${API_URL}/api/Customers`)

	if (!response.ok) {
		throw new Error('Failed to fetch customers')
	}

	const data = await response.json()
	return data
})

export const customersSlice = createSlice({
	name: 'customers',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchCustomers.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(fetchCustomers.fulfilled, (state, action) => {
				state.isLoading = false
				state.customers = action.payload
				state.error = null
			})
			.addCase(fetchCustomers.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.error.message
			})
	},
})

export default customersSlice.reducer
