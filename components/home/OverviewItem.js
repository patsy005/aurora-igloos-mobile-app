import { StyleSheet, Text, View } from 'react-native'
import StatIcon from './StatIcon'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Colors } from '../../constants/colors'

function OverviewItem({ statName, statValue, statPerc, color, iconName, iconColor, iconType, size }) {
	const isPositive = statPerc > 0 ? true : false

	const iconContainerStyles = {
		backgroundColor: color,
		borderRadius: 50,
		height: 40,
		width: 40,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 10,
	}

	const statPercentageContainerStyle = () => {
		return {
			backgroundColor: isPositive ? '#4bf84724' : '#c1040f36',
			borderRadius: 8,
			padding: 5,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			gap: 5,
		}
	}

	const statPercentageStyle = () => {
		return {
			color: isPositive ? Colors.greenBright : Colors.red,
			fontWeight: 'bold',
			fontSize: 12,
		}
	}
	return (
		<View style={style.container}>
			<View style={iconContainerStyles}>
				<StatIcon iconName={iconName} iconColor={iconColor} iconType={iconType} size={size} />
			</View>

			<View style={style.statsContainer}>
				<Text style={style.statName}>{statName}</Text>
				<Text style={style.statValue}>{statName === 'occupancy' ? statValue + '%' : statValue}</Text>
			</View>

			<View style={statPercentageContainerStyle()}>
				<Text style={statPercentageStyle()}>{isPositive ? '+' : '-'}</Text>
				<Text style={statPercentageStyle()}>{statPerc}%</Text>
			</View>
		</View>
	)
}

export default OverviewItem

const style = StyleSheet.create({
	container: {
		backgroundColor: Colors.primary6,
		borderRadius: 8,
		elevation: 4,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 5,
		shadowOpacity: 0.26,
		paddingVertical: 15,
		paddingHorizontal: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	statsContainer: {
		gap: 10,
		marginBottom: 10,
	},
	statName: {
		color: Colors.greyLight,
		textTransform: 'uppercase',
		letterSpacing: 1,
	},
	statValue: {
		fontSize: 18,
		fontWeight: 'bold',
		color: Colors.primary97,
	},
})
