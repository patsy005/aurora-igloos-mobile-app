import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import ListItemContainer from '../shared/ListItemContainer'
import { Colors } from '../../constants/colors'
import Rate from '../shared/Rate'
import { useNavigation } from '@react-navigation/native'

function IglooListItem({ igloo }) {
	const navigation = useNavigation()

	console.log(igloo)

	function getIglooDetailHandler() {
		navigation.navigate('IglooDetails', {
			iglooId: igloo.id,
		})
	}
	return (
		<ListItemContainer>
			<Pressable style={({ pressed }) => pressed && styles.pressed} onPress={getIglooDetailHandler}>
				<View style={styles.container}>
					<View style={styles.leftSection}>
						{igloo.photoUrl && (
							<View style={styles.imageContainer}>
								<Image source={{ uri: `http://10.0.2.2:5212/${igloo.photoUrl}` }} style={styles.iglooImage} resizeMode="cover" />
								{igloo.discount && (
									<View style={styles.discountBadge}>
										<Text style={styles.discountText}>-{igloo.discount.discount1}%</Text>
									</View>
								)}
							</View>
						)}
						<View style={styles.infoContainer}>
							<Text style={styles.iglooName}>{igloo.name}</Text>
							<Text style={styles.description} numberOfLines={2}>
								{igloo.description}
							</Text>
							<View style={styles.capacityContainer}>
								<Text style={styles.infoText}>
									Up to <Text style={styles.numOfGuests}>{igloo.capacity}</Text> guests
								</Text>
							</View>
							{igloo.discount && (
								<Text style={styles.discountInfo} numberOfLines={1}>
									{igloo.discount.name}
								</Text>
							)}
						</View>
					</View>
					<View style={styles.rightSection}>
						<Text style={styles.priceLabel}>per night</Text>
						<Text style={styles.priceValue}>${igloo.pricePerNight}</Text>
						{igloo.discount && (
							<Text style={styles.originalPrice}>
								${Math.round(igloo.pricePerNight / (1 - igloo.discount.discount1 / 100))}
							</Text>
						)}
					</View>
				</View>
			</Pressable>
		</ListItemContainer>
	)
}

export default IglooListItem

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		paddingVertical: 12,
		paddingHorizontal: 4,
	},
	leftSection: {
		flexDirection: 'row',
		flex: 1,
		marginRight: 12,
	},
	imageContainer: {
		position: 'relative',
		marginRight: 12,
	},
	iglooImage: {
		width: 80,
		height: 80,
		borderRadius: 12,
		backgroundColor: Colors.primary19,
	},
	discountBadge: {
		position: 'absolute',
		top: -6,
		right: -6,
		backgroundColor: Colors.pinkDark,
		borderRadius: 12,
		paddingHorizontal: 6,
		paddingVertical: 2,
		shadowColor: Colors.pinkDark,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.4,
		shadowRadius: 4,
		elevation: 6,
	},
	discountText: {
		color: Colors.white,
		fontSize: 10,
		fontWeight: 'bold',
	},
	infoContainer: {
		flex: 1,
		justifyContent: 'space-between',
	},
	iglooName: {
		fontSize: 18,
		fontWeight: 'bold',
		color: Colors.primary97,
		marginBottom: 4,
	},
	description: {
		color: Colors.greyLight,
		fontSize: 13,
		lineHeight: 18,
		marginBottom: 6,
		opacity: 0.9,
	},
	capacityContainer: {
		marginBottom: 4,
	},
	infoText: {
		color: Colors.greyLight,
		fontSize: 14,
	},
	numOfGuests: {
		color: Colors.primary97,
		fontWeight: 'bold',
		fontSize: 16,
	},
	discountInfo: {
		color: Colors.pinkLight,
		fontSize: 12,
		fontStyle: 'italic',
		opacity: 0.9,
	},
	rightSection: {
		alignItems: 'flex-end',
		justifyContent: 'center',
		minWidth: 80,
	},
	priceLabel: {
		fontSize: 11,
		color: Colors.greyLight,
		textTransform: 'uppercase',
		marginBottom: 4,
		opacity: 0.7,
	},
	priceValue: {
		fontSize: 20,
		fontWeight: 'bold',
		color: Colors.primary97,
	},
	originalPrice: {
		fontSize: 14,
		color: Colors.greyLight,
		textDecorationLine: 'line-through',
		marginTop: 2,
		opacity: 0.7,
	},
	pressed: {
		opacity: 0.75,
		transform: [{ scale: 0.98 }],
	},
})
