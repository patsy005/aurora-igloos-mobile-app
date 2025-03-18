import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../constants/colors'

function Button({ children, onPress, mode, style }) {
	return (
		<View>
			<Pressable onPress={onPress}>
				<View style={styles.button}>
					<Text>{children}</Text>
				</View>
			</Pressable>
		</View>
	)
}

export default Button

const styles = StyleSheet.create({
	button: {
		backgroundColor: Colors.btnBg,
		borderRadius: 6,
		padding: 10,
		color: Colors.primary6,
	},
})
