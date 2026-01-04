import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { saveAuth, loadAuth, clearAuth } from '../utils/authStorage'

const API = 'http://10.0.2.2:5212/api'

const initialState = {
	accessToken: null,
	user: null,
	status: 'idle',
	error: null,
	isHydrated: false,
}

export const hydrateAuth = createAsyncThunk('auth/hydrate', async () => {
	return await loadAuth()
})

export const login = createAsyncThunk('auth/login', async ({ login, password }, thunkApi) => {
	try {
		const res = await fetch(`${API}/auth/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ login, password }),
		})

		if (!res.ok) {
			const text = await res.text().catch(() => '')
			return thunkApi.rejectWithValue(text || 'Invalid credentials')
		}

		const data = await res.json()

		const user = {
			id: data.userId,
			login: data.login,
			role: data.role,
			userType: data.userType,
		}

		await saveAuth(data.token, user)

		return { token: data.token, user }
	} catch (e) {
		return thunkApi.rejectWithValue(e.message)
	}
})

export const fetchMe = createAsyncThunk('auth/fetchMe', async (_, thunkApi) => {
	try {
		const token = thunkApi.getState().auth.accessToken
		if (!token) return thunkApi.rejectWithValue('No token found')

		const res = await fetch(`${API}/auth/me`, {
			headers: { Authorization: `Bearer ${token}` },
		})

		if (!res.ok) {
			const text = await res.text().catch(() => '')
			return thunkApi.rejectWithValue(text || 'Unauthorized')
		}

		const user = await res.json()
		await saveAuth(token, user)

		return user
	} catch (e) {
		return thunkApi.rejectWithValue(e.message)
	}
})

// logout do apiFetch
export const logoutThunk = createAsyncThunk('auth/logout', async () => {
	await clearAuth()
	return true
})

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		clearError(state) {
			state.error = null
		},
	},
	extraReducers: builder => {
		builder
			.addCase(hydrateAuth.pending, state => {
				state.isHydrated = false
			})
			.addCase(hydrateAuth.fulfilled, (state, action) => {
				state.accessToken = action.payload.accessToken
				state.user = action.payload.user
				state.isHydrated = true
			})
			.addCase(hydrateAuth.rejected, state => {
				state.isHydrated = true
			})

			.addCase(login.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(login.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.accessToken = action.payload.token
				state.user = action.payload.user
			})
			.addCase(login.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload || action.error.message
			})

			.addCase(fetchMe.fulfilled, (state, action) => {
				state.user = action.payload
			})
			.addCase(fetchMe.rejected, state => {
				state.accessToken = null
				state.user = null
			})
			.addCase(fetchMe.pending, state => {
				// optional: set loading state
			})

			.addCase(logoutThunk.fulfilled, state => {
				state.accessToken = null
				state.user = null
				state.status = 'idle'
				state.error = null
			})
			.addCase(logoutThunk.rejected, state => {
				// optional: handle error
			})
			.addCase(logoutThunk.pending, state => {
				// optional: set loading state
			})
	},
})

export const { clearError } = authSlice.actions

export const selectAuth = state => state.auth

export const selectIsAuth = state => Boolean(state.auth.accessToken)

export const selectUser = state => state.auth.user

export const selectRole = state => state.auth.user?.role ?? null

export const selectIsAdmin = state => selectRole(state) === 'Admin'

export const selectCanManage = state => ['Admin', 'Staff'].includes(selectRole(state))

export const selectCanView = state => ['Admin', 'Staff', 'ReadOnly'].includes(selectRole(state))

export const selectCanDelete = state => selectRole(state) === 'Admin'

export const selectCeadOnly = state => selectRole(state) === 'Guest'

export const selectIsCustomer = state => selectRole(state) === 'Customer'

export default authSlice.reducer
