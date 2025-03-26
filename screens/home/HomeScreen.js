import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../constants/colors'
import WelcomeText from '../../components/home/WelcomeText'
import OverviewList from '../../components/home/OverviewList'

function HomeScreen() {
	return (
		<View style={styles.screen}>
			<WelcomeText loggedUserName="Alice" />

			<OverviewList />
		</View>
	)
}

export default HomeScreen

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.primary6,
		gap: 20,
		paddingVertical: 20,
		paddingHorizontal: 15,
	},
	welcomeText: {
		fontWeight: 'bold',
		fontSize: 14,
		color: Colors.primary97,
	},
})
