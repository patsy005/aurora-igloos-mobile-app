import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { Colors } from '../../constants/colors'

function Spinner() {
	return (
		<View style={styles.spinnerContainer}>
			<ActivityIndicator size="large" color={Colors.primary86} />
		</View>
	)
}

export default Spinner

const styles = StyleSheet.create({
	spinnerContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.primary6,
	},
})
