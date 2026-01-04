import AsyncStorage from '@react-native-async-storage/async-storage'
import { TOKEN_KEY, USER_KEY } from '../constants/consts'

export async function saveAuth(accessToken, user) {
	// token
	if (accessToken) {
		await AsyncStorage.setItem(TOKEN_KEY, accessToken)
	} else {
		await AsyncStorage.removeItem(TOKEN_KEY)
	}

	// user
	if (user) {
		await AsyncStorage.setItem(USER_KEY, JSON.stringify(user))
	} else {
		await AsyncStorage.removeItem(USER_KEY)
	}
}

export async function loadAuth() {
	const token = await AsyncStorage.getItem(TOKEN_KEY)
	const userRaw = await AsyncStorage.getItem(USER_KEY)

	return {
		accessToken: token ?? null,
		user: userRaw ? JSON.parse(userRaw) : null,
	}
}

export async function clearAuth() {
	await AsyncStorage.removeItem(TOKEN_KEY)
	await AsyncStorage.removeItem(USER_KEY)
}
