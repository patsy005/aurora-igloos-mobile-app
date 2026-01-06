import { StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../constants/colors'

function OverviewItem({ statName, statValue, statPerc, iconName, iconType = 'Ionicons' }) {
	const isPositive = statPerc >= 0

	return (
		<View style={styles.container}>
			{/* Icon */}
			<View style={styles.iconContainer}>
				<Ionicons name={iconName} size={28} color={Colors.primary37} />
			</View>

			{/* Stats */}
			<View style={styles.statsContainer}>
				<Text style={styles.statName}>{statName}</Text>
				<Text style={styles.statValue}>{statValue}</Text>
			</View>

			{/* Percentage Badge */}
			{statPerc !== 0 && (
				<View style={[styles.percentageContainer, isPositive ? styles.percentagePositive : styles.percentageNegative]}>
					<Ionicons
						name={isPositive ? 'trending-up' : 'trending-down'}
						size={14}
						color={isPositive ? Colors.primary97 : Colors.primary97}
					/>
					<Text style={styles.percentageText}>
						{isPositive ? '+' : ''}
						{statPerc}%
					</Text>
				</View>
			)}
		</View>
	)
}

export default OverviewItem

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: Colors.primary19,
		borderRadius: 12,
		padding: 16,
		borderWidth: 1,
		borderColor: Colors.primary37,
		gap: 12,
	},
	iconContainer: {
		width: 56,
		height: 56,
		borderRadius: 28,
		backgroundColor: Colors.primary6,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 2,
		borderColor: Colors.primary37,
	},
	statsContainer: {
		flex: 1,
		gap: 4,
	},
	statName: {
		fontSize: 12,
		color: Colors.primary67,
		textTransform: 'uppercase',
		letterSpacing: 0.5,
		fontWeight: '500',
	},
	statValue: {
		fontSize: 24,
		fontWeight: 'bold',
		color: Colors.primary97,
	},
	percentageContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderRadius: 12,
		gap: 4,
	},
	percentagePositive: {
		backgroundColor: 'rgba(34, 197, 94, 0.2)',
		borderWidth: 1,
		borderColor: 'rgba(34, 197, 94, 0.4)',
	},
	percentageNegative: {
		backgroundColor: 'rgba(239, 68, 68, 0.2)',
		borderWidth: 1,
		borderColor: 'rgba(239, 68, 68, 0.4)',
	},
	percentageText: {
		fontSize: 12,
		fontWeight: '600',
		color: Colors.primary97,
	},
})
