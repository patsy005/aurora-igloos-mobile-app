import { logoutThunk } from '../slices/authSlice'

const API = 'http://10.0.2.2:5212/api'

async function safeJson(res) {
	try {
		return await res.json()
	} catch {
		return null
	}
}

export async function apiFetch(path, options = {}, thunkApi) {
	const state = thunkApi.getState()
	const token = state.auth.accessToken
	const isHydrated = state.auth.isHydrated

	const res = await fetch(`${API}${path}`, {
		...options,
		headers: {
			...(options.headers || {}),
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		},
	})

	if ((res.status === 401 || res.status === 403) && isHydrated) {
		thunkApi.dispatch(logoutThunk())
		return thunkApi.rejectWithValue({ code: res.status, message: 'Sesja wygasła' })
	}

	if (!res.ok) {
		const text = await res.text().catch(() => '')
		const body = await safeJson(res)
		return thunkApi.rejectWithValue({
			code: res.status,
			message: body?.message || text || `Request failed (${res.status})`,
		})
	}

	if (res.status === 204) return null
	return await safeJson(res)
}
