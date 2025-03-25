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

export const addNewEmployee = createAsyncThunk('employees/addNewEmployee', async employee => {
	const res = await fetch(`${API_URL}/api/Employees`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(employee),
	})

	if (!res.ok) {
		const errorMessage = await res.text()
		console.log(errorMessage)
		throw new Error('Failed to add employee')
	}

	

	const data = await res.json()

	return data
})

export const editEmployee = createAsyncThunk('employees/editEmployee', async ({ id, employee }) => {
	console.log('Editing Employee with ID:', id)
	console.log('Employee Data:', employee)

	const employeeData = { id: id, ...employee }

	const res = await fetch(`${API_URL}/api/Employees/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(employeeData),
	})

	if (!res.ok) {
		const errorMessage = await res.text()
		console.log(errorMessage)
		throw new Error('Failed to edit employee')
	}

	if (res.status === 204) {
		console.log('No content returned, assuming success')
		return { id, ...employee }  // Zwróć zmienionego pracownika
	}

	const data = await res.json()

	return data
})

export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async id => {
	const res = await fetch(`${API_URL}/api/Employees/${id}`, {
		method: 'DELETE',
	})

	if (!res.ok) {
		const errorMessage = await res.text()
		console.log(errorMessage)
		throw new Error('Failed to delete employee')
	}

	return id
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

			.addCase(addNewEmployee.pending, state => {
				state.isLoading = true
				state.error = null
				console.log('employee pending')
			})
			.addCase(addNewEmployee.fulfilled, (state, action) => {
				state.isLoading = false
				state.employees.push(action.payload)
				console.log('emplotee fulfilled')
			})
			.addCase(addNewEmployee.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.error.message
				console.log('employee rejected')
			})

			.addCase(editEmployee.pending, state => {
				state.isLoading = true
				state.error = null
				console.log('employee edit pending')
			})
			.addCase(editEmployee.fulfilled, (state, action) => {
				state.isLoading = false
				const index = state.employees.findIndex(employee => employee.id === action.payload.id)
				state.employees[index] = action.payload
				console.log('employee edit fulfilled')
			})
			.addCase(editEmployee.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.error.message
				console.log('employee edit rejected')
			})

			.addCase(deleteEmployee.pending, state => {
				state.isLoading = true
				state.error = null
				console.log('employee ddeletion pending')
			})
			.addCase(deleteEmployee.fulfilled, (state, action) => {
				state.isLoading = false
				state.employees = state.employees.filter(employee => employee.id !== action.payload)
				console.log('employee deletion fulfilled')
			})
			.addCase(deleteEmployee.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.error.message
				console.log('employee deletion rejected')
			})
	},
})

export default employeesSlice.reducer
