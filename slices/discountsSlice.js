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

export const addNewDiscount = createAsyncThunk('discounts/addNewDiscount', async discount => {
	const res = await fetch(`${API_URL}/api/Discounts`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(discount),
	})

	if (!res.ok) {
		throw new Error('Failed to add new discount')
	}

	if (res.status === 204) return { ...discount, id: Date.now() }

	const data = await res.json()

	return data
})

export const editDiscount = createAsyncThunk('discounts/editDiscount', async ({ id, discount }) => {
	const discountData = { id: id, ...discount }

	const res = await fetch(`${API_URL}/api/Discounts/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(discountData),
	})

	if (!res.ok) {
		const errorMessage = await res.text()
		console.log(errorMessage)
		throw new Error('Failed to edit discount')
	}

	if (res.status === 204) return discount

	const data = await res.json()

	return data
})

export const deleteDiscount = createAsyncThunk('discounts/deleteDiscount', async id => {
	const res = await fetch(`${API_URL}/api/Discounts/${id}`, {
		method: 'DELETE',
	})

	if (!res.ok) {
		throw new Error('Failed to delete discount')
	}

	return id
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

			.addCase(addNewDiscount.pending, state => {
				state.isLoading = true
				state.error = null
				console.log('new discount pending')
			})
			.addCase(addNewDiscount.fulfilled, (state, action) => {
				state.isLoading = false
				state.discounts.push(action.payload)
				state.error = null
				console.log('new discount fulfilled')
			})
			.addCase(addNewDiscount.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.error.message
				console.log('new discount rejected')
			})

			.addCase(editDiscount.pending, state => {
				state.isLoading = true
				state.error = null
				console.log('edit discount pending')
			})
			.addCase(editDiscount.fulfilled, (state, action) => {
				state.isLoading = false
				const index = state.discounts.findIndex(discount => discount.id === action.payload.id)
				state.discounts[index] = action.payload
				state.error = null
				console.log('edit discount fulfilled')
			})
			.addCase(editDiscount.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.error.message
				console.log('edit discount rejected')
			})

			.addCase(deleteDiscount.pending, state => {
				state.isLoading = true
				state.error = null
				console.log('delete discount pending')
			})
			.addCase(deleteDiscount.fulfilled, (state, action) => {
				state.isLoading = false
				state.discounts = state.discounts.filter(discount => discount.id !== action.payload)
				state.error = null
				console.log('delete discount fulfilled')
			})
			.addCase(deleteDiscount.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.error.message
				console.log('delete discount rejected')
			})
	},
})

export default discountsSlice.reducer
