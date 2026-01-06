import { Image, StyleSheet, Text, View, ScrollView, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import DetailContainer from '../shared/DetailContainer'
import { Colors } from '../../constants/colors'
import { useDispatch } from 'react-redux'
import { deleteIgloo, fetchIgloos } from '../../slices/igloosSlice'

function IglooDetail({ igloo }) {
	const navigation = useNavigation()
	const dispatch = useDispatch()

	const hasDiscount = igloo?.discount && igloo.discount.discount1 > 0
	const originalPrice = hasDiscount
		? Math.round(igloo.pricePerNight / (1 - igloo.discount.discount1 / 100))
		: igloo.pricePerNight

	function onEditIgloo() {
		navigation.navigate('IglooForm', {
			iglooId: igloo.id,
		})
	}

	async function onDeleteIgloo() {
		Alert.alert('Delete Igloo', 'Are you sure you want to delete this igloo?', [
			{ text: 'Cancel', style: 'cancel' },
			{
				text: 'Delete',
				style: 'destructive',
				onPress: async () => {
					try {
						await dispatch(deleteIgloo(igloo.id)).unwrap()
						await dispatch(fetchIgloos())
						Alert.alert('Success', 'Igloo deleted successfully')
						navigation.goBack()
					} catch (err) {
						Alert.alert('Error', 'Failed to delete igloo')
					}
				},
			},
		])
	}

	return (
		<DetailContainer onEdit={onEditIgloo} onDelete={onDeleteIgloo}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				style={styles.scrollView}
				contentContainerStyle={styles.scrollContent}>
				{/* Hero Image */}
				<View style={styles.imageContainer}>
					<Image source={{ uri: `http://10.0.2.2:5212/${igloo.photoUrl}` }} style={styles.image} />
					{hasDiscount && (
						<View style={styles.discountOverlay}>
							<Text style={styles.discountBadgeText}>-{igloo.discount.discount1}%</Text>
						</View>
					)}
				</View>

				{/* Title Section */}
				<View style={styles.titleSection}>
					<Text style={styles.iglooName}>{igloo.name}</Text>
					<View style={styles.priceContainer}>
						<Text style={styles.priceLabel}>Price per night</Text>
						<View style={styles.priceRow}>
							<Text style={styles.currentPrice}>${igloo.pricePerNight}</Text>
							{hasDiscount && <Text style={styles.originalPrice}>${originalPrice}</Text>}
						</View>
					</View>
				</View>

				{/* Description */}
				{igloo.description && (
					<View style={styles.descriptionSection}>
						<Text style={styles.sectionTitle}>Description</Text>
						<Text style={styles.description}>{igloo.description}</Text>
					</View>
				)}

				{/* Details Grid */}
				<View style={styles.detailsGrid}>
					<View style={styles.detailCard}>
						<View style={styles.cardIcon}>
							<Text style={styles.iconText}>👥</Text>
						</View>
						<Text style={styles.cardTitle}>Capacity</Text>
						<Text style={styles.cardValue}>{igloo.capacity} guests</Text>
					</View>

					<View style={styles.detailCard}>
						<View style={styles.cardIcon}>
							<Text style={styles.iconText}>🏠</Text>
						</View>
						<Text style={styles.cardTitle}>Igloo ID</Text>
						<Text style={styles.cardValue}>#{igloo.id}</Text>
					</View>
				</View>

				{/* Promotion Section */}
				{hasDiscount && (
					<View style={styles.promotionSection}>
						<Text style={styles.sectionTitle}>Active Promotion</Text>
						<View style={styles.promotionCard}>
							<View style={styles.promotionHeader}>
								<Text style={styles.promotionName}>{igloo.discount.name}</Text>
								<Text style={styles.promotionDiscount}>-{igloo.discount.discount1}%</Text>
							</View>
							<Text style={styles.promotionDescription}>{igloo.discount.description}</Text>
							<View style={styles.promotionDates}>
								<Text style={styles.promotionDateLabel}>Valid period:</Text>
								<Text style={styles.promotionDateText}>
									{igloo.discount.validFrom} - {igloo.discount.validTo}
								</Text>
							</View>
						</View>
					</View>
				)}
			</ScrollView>
		</DetailContainer>
	)
}

export default IglooDetail

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
	},
	scrollContent: {
		paddingBottom: 60,
	},
	imageContainer: {
		position: 'relative',
		borderRadius: 16,
		overflow: 'hidden',
		width: '100%',
		height: 240,
		elevation: 8,
		shadowColor: Colors.primary67,
		shadowOffset: { width: 0, height: 4 },
		shadowRadius: 8,
		shadowOpacity: 0.3,
		marginBottom: 20,
	},
	image: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
	},
	discountOverlay: {
		position: 'absolute',
		top: 16,
		right: 16,
		backgroundColor: Colors.pinkDark,
		borderRadius: 20,
		paddingHorizontal: 12,
		paddingVertical: 6,
		shadowColor: Colors.pinkDark,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.4,
		shadowRadius: 4,
		elevation: 6,
	},
	discountBadgeText: {
		color: Colors.white,
		fontSize: 14,
		fontWeight: 'bold',
	},
	titleSection: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		marginBottom: 20,
	},
	iglooName: {
		fontSize: 26,
		fontWeight: 'bold',
		color: Colors.primary97,
		flex: 1,
		marginRight: 16,
	},
	priceContainer: {
		alignItems: 'flex-end',
	},
	priceLabel: {
		fontSize: 12,
		color: Colors.greyLight,
		textTransform: 'uppercase',
		marginBottom: 4,
		opacity: 0.8,
	},
	priceRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	currentPrice: {
		fontSize: 24,
		fontWeight: 'bold',
		color: Colors.primary97,
	},
	originalPrice: {
		fontSize: 18,
		color: Colors.greyLight,
		textDecorationLine: 'line-through',
		opacity: 0.7,
	},
	descriptionSection: {
		marginBottom: 24,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: '600',
		color: Colors.primary97,
		marginBottom: 12,
		textTransform: 'uppercase',
		letterSpacing: 0.5,
	},
	description: {
		fontSize: 16,
		lineHeight: 24,
		color: Colors.greyLight,
		opacity: 0.9,
	},
	detailsGrid: {
		flexDirection: 'row',
		gap: 16,
		marginBottom: 24,
	},
	detailCard: {
		flex: 1,
		backgroundColor: Colors.primary6,
		borderRadius: 12,
		padding: 16,
		alignItems: 'center',
		elevation: 4,
		shadowColor: Colors.primary67,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
	},
	cardIcon: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: Colors.primary19,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 12,
	},
	iconText: {
		fontSize: 24,
	},
	cardTitle: {
		fontSize: 12,
		color: Colors.greyLight,
		textTransform: 'uppercase',
		marginBottom: 4,
		opacity: 0.8,
	},
	cardValue: {
		fontSize: 16,
		fontWeight: 'bold',
		color: Colors.primary97,
		textAlign: 'center',
	},
	promotionSection: {
		marginBottom: 24,
	},
	promotionCard: {
		backgroundColor: Colors.primary6,
		borderRadius: 12,
		padding: 16,
		borderWidth: 1,
		borderColor: Colors.pinkDark,
	},
	promotionHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 8,
	},
	promotionName: {
		fontSize: 16,
		fontWeight: 'bold',
		color: Colors.primary97,
		flex: 1,
	},
	promotionDiscount: {
		fontSize: 18,
		fontWeight: 'bold',
		color: Colors.pinkDark,
	},
	promotionDescription: {
		fontSize: 14,
		color: Colors.greyLight,
		marginBottom: 12,
		opacity: 0.9,
	},
	promotionDates: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	promotionDateLabel: {
		fontSize: 12,
		color: Colors.greyLight,
		opacity: 0.7,
	},
	promotionDateText: {
		fontSize: 12,
		color: Colors.primary97,
		fontWeight: '500',
	},
})
