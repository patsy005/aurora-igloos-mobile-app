import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_URL } from '../constants/consts'

const initialState = {
	customers: [],
	isLoading: false,
	error: null,
}

export const fetchCustomers = createAsyncThunk('customers/fetchCustomers', async () => {
	const response = await fetch(`${API_URL}/api/Customers?page=1&size=50`)

	if (!response.ok) {
		throw new Error('Failed to fetch customers')
	}

	const data = await response.json()
	return data
})

export const addNewCustomer = createAsyncThunk('customers/addNewCustomer', async customer => {
	const res = await fetch(`${API_URL}/api/Customers`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(customer),
	})

	if (!res.ok) {
		const errorMessage = await res.text()
		console.log(errorMessage)
		throw new Error('Failed to add customer')
	}

	const data = await res.json()

	return data
})

export const editCustomer = createAsyncThunk('customers/editCustomer', async ({id, customer}) => {
	console.log('editing customer with id: ', id)
	console.log('customer data: ', customer)

	const customerData = {id: id, ...customer}

	const res = await fetch(`${API_URL}/api/Customers/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(customerData),
	})

	if (!res.ok) {
		const errorMessage = await res.text()
		console.log(errorMessage)
		throw new Error('Failed to edit customer')
	}

	if(res.status === 204){
		return customerData
	}

	const data = await res.json()

	return data
})

export const deleteCustomer = createAsyncThunk('customers/deleteCustomer', async id => {
	const res = await fetch(`${API_URL}/api/Customers/${id}`, {
		method: 'DELETE',
	})

	if (!res.ok) {
		const errorMessage = await res.text()
		console.log(errorMessage)
		throw new Error('Failed to delete customer')
	}

	return id
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
				console.log('fetch customers pending')
			})
			.addCase(fetchCustomers.fulfilled, (state, action) => {
				state.isLoading = false
				state.customers = action.payload
				state.error = null
				console.log('fetch customers fulfilled')
			})
			.addCase(fetchCustomers.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.error.message
				console.log('fetch customers rejected')
			})

			.addCase(addNewCustomer.pending, state => {
				state.isLoading = true
				state.error = null
				console.log('add custumer pending')
			})
			.addCase(addNewCustomer.fulfilled, (state, action) => {
				state.isLoading = false
				state.customers.push(action.payload)
				console.log('add customer fulfilled')
			})
			.addCase(addNewCustomer.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.error.message
				console.log('add customer rejected')
			})

			.addCase(editCustomer.pending, state => {
				state.isLoading = true
				state.error = null
				console.log('edit customer pending')
			})
			.addCase(editCustomer.fulfilled, (state, action) => {
				state.isLoading = false
				const index = state.customers.findIndex(customer => customer.id === action.payload.id)
				state.customers[index] = action.payload
				console.log('edit customer fulfilled')
			})
			.addCase(editCustomer.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.error.message
				console.log('edit customer rejected')
			})

			.addCase(deleteCustomer.pending, state => {
				state.isLoading = true
				state.error = null
				console.log('delete customer pending')
			})
			.addCase(deleteCustomer.fulfilled, (state, action) => {
				state.isLoading = false
				state.customers = state.customers.filter(customer => customer.id !== action.payload)
				console.log('delete customer fulfilled')
			})
			.addCase(deleteCustomer.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.error.message
				console.log('delete customer rejected')
			})
	},
})

export default customersSlice.reducer
