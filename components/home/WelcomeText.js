import { StyleSheet, Text } from 'react-native'
import { Colors } from '../../constants/colors'

function WelcomeText({ loggedUserName }) {
	return <Text style={styles.welcomeText}>Welcome back, {loggedUserName}!</Text>
}

export default WelcomeText

const styles = StyleSheet.create({
	welcomeText: {
		fontWeight: 'bold',
		fontSize: 14,
		color: Colors.primary97,
	},
})
