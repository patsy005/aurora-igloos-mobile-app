import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_URL } from '../constants/consts'

const initialState = {
	employees: [],
	isLoading: false,
	error: null,
}

export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
	const res = await fetch(`${API_URL}/api/Employees`)

	if (!res.ok) {
		throw new Error('Failed to fetch employees')
	}

	const data = await res.json()
	return data
})

export const employeesSlice = createSlice({
	name: 'employees',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchEmployees.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(fetchEmployees.fulfilled, (state, action) => {
				state.isLoading = false
				state.employees = action.payload
			})
			.addCase(fetchEmployees.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.error.message
			})
	},
})

export default employeesSlice.reducer
