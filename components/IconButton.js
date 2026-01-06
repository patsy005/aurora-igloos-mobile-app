import { Pressable, StyleSheet } from 'react-native'
import { FontAwesome6 } from '@expo/vector-icons'
import { Octicons } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../constants/colors'

function IconButton({ iconName, iconType, color, size, onPress }) {
	let icon

	if (iconType === 'FontAwesome6') {
		icon = <FontAwesome6 name={iconName} color={color} size={size} />
	}

	if (iconType === 'Ionicons') {
		icon = <Ionicons name={iconName} color={color} size={size} />
	}

	if (iconType === 'Octicons') {
		icon = <Octicons name={iconName} color={color} size={size} />
	}

	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => [styles.iconContainer, pressed ? styles.iconContainerPressed : null]}>
			{icon}
		</Pressable>
	)
}

export default IconButton

const styles = StyleSheet.create({
	iconContainer: {
		padding: 10,
		borderWidth: 1,
		borderColor: Colors.primary37,
		backgroundColor: Colors.primary19,
		borderRadius: 10,
		shadowColor: Colors.primary67,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	iconContainerPressed: {
		backgroundColor: Colors.primary37,
		borderColor: Colors.primary67,
		transform: [{ scale: 0.95 }],
	},
})
