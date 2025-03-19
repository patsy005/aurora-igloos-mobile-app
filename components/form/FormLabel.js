import { StyleSheet, Text } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'

function FormLabel({ children }) {
	return <Text style={styles.labelText}>{children}</Text>
}

export default FormLabel

const styles = StyleSheet.create({
	labelText: {
		fontSize: 16,
		color: Colors.white,
	},
})
