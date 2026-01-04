import { useNavigation } from '@react-navigation/native'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import ListItemContainer from '../shared/ListItemContainer'
import { Colors } from '../../constants/colors'

function DiscountListItem({ discount }) {
	const navigation = useNavigation()

	console.log(discount)

	function getDiscountDetailHandler() {
		navigation.navigate('DiscountDetails', {
			discountId: discount.id,
		})
	}

	return (
		<ListItemContainer>
			<Pressable style={({ pressed }) => pressed && styles.pressed} onPress={getDiscountDetailHandler}>
				<View style={styles.itemContainer}>
					<View style={styles.leftSection}>
						<View style={styles.discountBadge}>
							<Text style={styles.discountIcon}>%</Text>
						</View>
						<View style={styles.contentContainer}>
							<Text style={styles.discountName}>{discount.name}</Text>
							<Text style={styles.description} numberOfLines={2}>
								{discount.description}
							</Text>
						</View>
					</View>
					<View style={styles.rightSection}>
						<Text style={styles.datesText}>Valid period</Text>
						<Text style={styles.dates}>{discount.validFrom}</Text>
						<Text style={styles.dateSeparator}>to</Text>
						<Text style={styles.dates}>{discount.validTo}</Text>
					</View>
				</View>
			</Pressable>
		</ListItemContainer>
	)
}

export default DiscountListItem

const styles = StyleSheet.create({
	itemContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 12,
		paddingHorizontal: 4,
	},
	leftSection: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
		marginRight: 16,
	},
	discountBadge: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: Colors.primary19,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 12,
		shadowColor: Colors.primary67,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 5,
	},
	discountIcon: {
		fontSize: 24,
		fontWeight: 'bold',
		color: Colors.primary97,
	},
	contentContainer: {
		flex: 1,
	},
	discountName: {
		fontSize: 18,
		fontWeight: '600',
		color: Colors.primary97,
		textTransform: 'uppercase',
		marginBottom: 4,
		letterSpacing: 0.5,
	},
	description: {
		color: Colors.greyLight,
		fontSize: 14,
		lineHeight: 20,
		opacity: 0.9,
	},
	rightSection: {
		alignItems: 'flex-end',
		justifyContent: 'center',
		minWidth: 80,
	},
	datesText: {
		fontSize: 12,
		color: Colors.greyLight,
		fontWeight: '500',
		marginBottom: 4,
		textTransform: 'uppercase',
		opacity: 0.7,
	},
	dates: {
		fontSize: 13,
		color: Colors.primary97,
		fontWeight: '600',
	},
	dateSeparator: {
		fontSize: 11,
		color: Colors.greyLight,
		opacity: 0.6,
		marginVertical: 2,
	},
	pressed: {
		opacity: 0.75,
		transform: [{ scale: 0.98 }],
	},
})
