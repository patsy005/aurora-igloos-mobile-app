import { StyleSheet, View } from 'react-native'
import { FontAwesome6, Ionicons, Octicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'

function StatIcon({ iconName, iconColor, iconType, size }) {
	let icon

	if (iconType === 'FontAwesome6') {
		icon = <FontAwesome6 name={iconName} color={iconColor} size={size} />
	}

	if (iconType === 'Ionicons') {
		icon = <Ionicons name={iconName} color={iconColor} size={size} />
	}

	if (iconType === 'Octicons') {
		icon = <Octicons name={iconName} color={iconColor} size={size} />
	}

	if (iconType === 'MaterialCommunityIcons') {
		icon = <MaterialCommunityIcons name={iconName} color={iconColor} size={size} />
	}

	return (
		<View style={styles.iconContainer}>
			{icon}
		</View>
	)
}

export default StatIcon

const styles = StyleSheet.create({
	iconContainer: {},
})
