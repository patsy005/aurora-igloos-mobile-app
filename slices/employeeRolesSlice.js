import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_URL } from '../constants/consts'

const initialState = {
	employeeRoles: [],
	loading: false,
	error: null,
}

export const fetchEmploteeRoles = createAsyncThunk('employeeRoles/fetchEmployeeRoles', async () => {
	const res = await fetch(`${API_URL}/api/EmployeeRoles`)

	if (!res.ok) {
		throw new Error('Failed to fetch employee roles')
	}

	const data = await res.json()

	return data
})

export const employeeRolesSlice = createSlice({
	name: 'employeeRoles',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchEmploteeRoles.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchEmploteeRoles.fulfilled, (state, action) => {
				state.employeeRoles = action.payload
				state.loading = false
			})
			.addCase(fetchEmploteeRoles.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message
			})
	},
})

export default employeeRolesSlice.reducer
