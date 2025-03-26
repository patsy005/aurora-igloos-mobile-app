import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_URL } from '../constants/consts'

const initialState = {
	days: 30,
	isLoading: false,
	error: null,
    data: [],
}

export const fetchDashboardData = createAsyncThunk(
	'dashboard/fetchDashboardData',
	async (days = 30, { rejectWithValue }) => {
		try {
			const response = await fetch(`${API_URL}/stats?days=${days}`)
			if (!response.ok) {
				throw new Error('Server error')
			}
			const data = await response.json()
			return data
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

export const dashboardSlice = createSlice({
	name: 'dashboard',
	initialState,
	reducers: {
		setDays: (state, action) => {
			state.days = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchDashboardData.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(fetchDashboardData.fulfilled, (state, action) => {
				state.isLoading = false
				state.error = null
				state.data = action.payload
			})
			.addCase(fetchDashboardData.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload
			})
	},
})

export const { setDays } = dashboardSlice.actions
export default dashboardSlice.reducer
