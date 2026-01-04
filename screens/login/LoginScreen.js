import { StyleSheet, View } from 'react-native'
import LoginForm from '../../components/login/LoginForm'
import { Colors } from '../../constants/colors'

function LoginScreen() {
	return (
		<View style={styles.screen}>
			<LoginForm />
		</View>
	)
}

export default LoginScreen

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	scroll: {
		backgroundColor: Colors.primary6,
	},
})
