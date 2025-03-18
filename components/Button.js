import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../constants/colors'

function Button({ children, onPress, mode, style }) {
	return (
		<View>
			<Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
				<View style={styles.button}>
					<Text style={styles.text}>{children}</Text>
				</View>
			</Pressable>
		</View>
	)
}

export default Button

const styles = StyleSheet.create({
	button: {
		backgroundColor: Colors.primary86,
		borderRadius: 6,
		padding: 10,
		color: Colors.primary6,
		width: 'auto',
		minWidth: 100,
		alignSelf: 'flex-end',
		textAlign: 'center',
		alignItems: 'center',
	},
	text: {
		color: Colors.primary6,
		textAlign: 'center',
		fontWeight: 'bold',
	},
	pressed: {
		opacity: 0.75,
	},
})
