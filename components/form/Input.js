import { StyleSheet, TextInput, View } from 'react-native'
import { Colors } from '../../constants/colors'

function Input({style, textInputConfig}) {
	return (
		<View style={styles.inputContainer}>
			<TextInput style={styles.input} {...textInputConfig} />
		</View>
	)
}

export default Input

const styles = StyleSheet.create({
	inputContainer: {
		height: 50,
		backgroundColor: Colors.primary6,
		width: '100%',
		alignItems: 'center',
		paddingHorizontal: 15,
		borderRadius: 8,
        justifyContent: 'center',

	},
	input: {
		color: Colors.white,
		width: '100%',
	},
})
