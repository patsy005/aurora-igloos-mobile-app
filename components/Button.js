import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../constants/colors'

function Button({ children, onPress, mode = 'primary', style }) {
	let buttonStyles
	let textStyles

	if (mode === 'primary') {
		buttonStyles = [styles.button, styles.buttonPrimary]
        textStyles = [styles.text, styles.textPrimary]
	}

	if (mode === 'secondary') {
		buttonStyles = [styles.button, styles.buttonSecondary]
        textStyles = [styles.text, styles.textSecondary]
	}

	return (
		<View>
			<Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
				<View style={buttonStyles}>
					<Text style={textStyles}>{children}</Text>
				</View>
			</Pressable>
		</View>
	)
}

export default Button

const styles = StyleSheet.create({
	button: {
		// backgroundColor: Colors.primary86,
		borderRadius: 6,
		padding: 10,
		// color: Colors.primary6,
		width: 'auto',
		minWidth: 100,
		alignSelf: 'flex-end',
		textAlign: 'center',
		alignItems: 'center',
	},
	buttonPrimary: {
		backgroundColor: Colors.primary86,
		color: Colors.primary6,
	},
	buttonSecondary: {
		backgroundColor: 'transparent',
		borderWidth: 1,
		borderColor: Colors.greyLight,
	},
	text: {
		textAlign: 'center',
		fontWeight: 'bold',
	},
	textPrimary: {
		color: Colors.primary6,
	},
	textSecondary: {
		color: Colors.greyLight,
	},
	pressed: {
		opacity: 0.75,
	},
})
