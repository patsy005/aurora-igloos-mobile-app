import { Image, StyleSheet, Text, View, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import DetailContainer from '../shared/DetailContainer'
import { Colors } from '../../constants/colors'
import { deleteTrip, fetchTrips } from '../../slices/tripsSlice'

function TripDetail({ trip }) {
	const navigation = useNavigation()
	const dispatch = useDispatch()
	const tripLevels = useSelector(state => state.tripLevels.tripLevels)
	const tripSeasons = useSelector(state => state.tripSeasons.tripSeasons)

	function onEditTrip() {
		navigation.navigate('TripForm', {
			tripId: trip.id,
		})
	}

	function onDeleteTrip() {
		dispatch(deleteTrip(trip.id))
			.then(() => dispatch(fetchTrips()))
			.then(() => navigation.goBack())
	}

	const getDifficultyColor = levelId => {
		const level = tripLevels.find(l => l.id === levelId)
		const levelName = level?.name || 'Unknown'

		switch (levelName) {
			case 'Easy':
				return Colors.greenBright
			case 'Moderate':
				return Colors.orangeDark
			case 'Hard':
				return Colors.red
			default:
				return Colors.greyLight
		}
	}

	const getDifficultyName = levelId => {
		const level = tripLevels.find(l => l.id === levelId)
		return level?.name || 'Unknown'
	}

	const getSeasonIcon = seasonId => {
		const season = tripSeasons.find(s => s.id === seasonId)
		const seasonName = season?.name || 'Unknown'

		switch (seasonName) {
			case 'Winter':
				return '❄️'
			case 'Summer':
				return '☀️'
			case 'Spring':
				return '🌸'
			case 'Autumn':
				return '🍂'
			default:
				return '🌍'
		}
	}

	const getSeasonName = seasonId => {
		const season = tripSeasons.find(s => s.id === seasonId)
		return season?.name || 'Unknown'
	}

	return (
		<DetailContainer onEdit={onEditTrip} onDelete={onDeleteTrip}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				style={styles.scrollView}
				contentContainerStyle={styles.scrollContent}>
				{/* Hero Image */}
				<View style={styles.imageContainer}>
					<Image source={{ uri: `http://10.0.2.2:5212/${trip.photoUrl}` }} style={styles.image} />
					<View style={styles.seasonBadge}>
						<Text style={styles.seasonIcon}>{getSeasonIcon(trip.seasonId)}</Text>
					</View>
					<View style={styles.difficultyBadge}>
						<View style={[styles.difficultyDot, { backgroundColor: getDifficultyColor(trip.levelOfDifficultyId) }]} />
						<Text style={styles.difficultyText}>{getDifficultyName(trip.levelOfDifficultyId)}</Text>
					</View>
				</View>

				{/* Title Section */}
				<View style={styles.titleSection}>
					<Text style={styles.tripName}>{trip.name}</Text>
					<View style={styles.priceContainer}>
						<Text style={styles.priceLabel}>per person</Text>
						<Text style={styles.priceValue}>${trip.pricePerPerson}</Text>
					</View>
				</View>

				{/* Quick Info Cards */}
				<View style={styles.quickInfoGrid}>
					<View style={styles.infoCard}>
						<Text style={styles.infoIcon}>⏱️</Text>
						<Text style={styles.infoLabel}>Duration</Text>
						<Text style={styles.infoValue}>
							{trip.duration} {trip.duration === 1 ? 'day' : 'days'}
						</Text>
					</View>

					<View style={styles.infoCard}>
						<Text style={styles.infoIcon}>{getSeasonIcon(trip.seasonId)}</Text>
						<Text style={styles.infoLabel}>Season</Text>
						<Text style={styles.infoValue}>{getSeasonName(trip.seasonId)}</Text>
					</View>

					<View style={styles.infoCard}>
						<Text style={styles.infoIcon}>👨‍🏫</Text>
						<Text style={styles.infoLabel}>Guide</Text>
						<Text style={styles.infoValue}>{trip.guideName}</Text>
					</View>
				</View>

				{/* Short Description */}
				<View style={styles.descriptionSection}>
					<Text style={styles.sectionTitle}>Overview</Text>
					<Text style={styles.shortDescription}>{trip.shortDescription}</Text>
				</View>

				{/* Full Description */}
				{trip.longDescription && (
					<View style={styles.descriptionSection}>
						<Text style={styles.sectionTitle}>Full Description</Text>
						<Text style={styles.longDescription}>{trip.longDescription}</Text>
					</View>
				)}

				{/* Guide Section */}
				{trip.guide && (
					<View style={styles.guideSection}>
						<Text style={styles.sectionTitle}>Guide</Text>
						<View style={styles.guideCard}>
							{trip.guide.photoUrl && (
								<Image source={{ uri: `http://10.0.2.2:5212/${trip.guide.photoUrl}` }} style={styles.guideImage} />
							)}
							<View style={styles.guideInfo}>
								<Text style={styles.guideName}>{trip.guideName}</Text>
								<Text style={styles.guideRole}>Professional Guide</Text>
								<Text style={styles.guideDescription}>
									Experienced guide with local knowledge of Iceland's best spots.
								</Text>
							</View>
						</View>
					</View>
				)}

				{/* Trip Details */}
				<View style={styles.detailsSection}>
					<Text style={styles.sectionTitle}>Trip Details</Text>
					<View style={styles.detailsList}>
						<View style={styles.detailItem}>
							<Text style={styles.detailLabel}>Created:</Text>
							<Text style={styles.detailValue}>{trip.createdAt}</Text>
						</View>
						<View style={styles.detailItem}>
							<Text style={styles.detailLabel}>Last Updated:</Text>
							<Text style={styles.detailValue}>{trip.updatedAt}</Text>
						</View>
						<View style={styles.detailItem}>
							<Text style={styles.detailLabel}>Trip ID:</Text>
							<Text style={styles.detailValue}>#{trip.id}</Text>
						</View>
					</View>
				</View>
			</ScrollView>
		</DetailContainer>
	)
}

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
		height: 260,
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
	seasonBadge: {
		position: 'absolute',
		top: 16,
		right: 16,
		backgroundColor: Colors.primary19,
		borderRadius: 20,
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: Colors.primary67,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 6,
	},
	seasonIcon: {
		fontSize: 20,
	},
	difficultyBadge: {
		position: 'absolute',
		bottom: 16,
		left: 16,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
		borderRadius: 20,
		paddingHorizontal: 12,
		paddingVertical: 6,
		gap: 6,
	},
	difficultyDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
	},
	difficultyText: {
		color: Colors.white,
		fontSize: 12,
		fontWeight: '600',
	},
	titleSection: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		marginBottom: 24,
	},
	tripName: {
		fontSize: 28,
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
	priceValue: {
		fontSize: 26,
		fontWeight: 'bold',
		color: Colors.primary97,
	},
	quickInfoGrid: {
		flexDirection: 'row',
		gap: 12,
		marginBottom: 24,
	},
	infoCard: {
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
	infoIcon: {
		fontSize: 24,
		marginBottom: 8,
	},
	infoLabel: {
		fontSize: 11,
		color: Colors.greyLight,
		textTransform: 'uppercase',
		marginBottom: 4,
		opacity: 0.8,
	},
	infoValue: {
		fontSize: 14,
		fontWeight: 'bold',
		color: Colors.primary97,
		textAlign: 'center',
	},
	descriptionSection: {
		marginBottom: 24,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: '600',
		color: Colors.primary97,
		marginBottom: 12,
		textTransform: 'uppercase',
		letterSpacing: 0.5,
	},
	shortDescription: {
		fontSize: 16,
		lineHeight: 24,
		color: Colors.greyLight,
		opacity: 0.9,
	},
	longDescription: {
		fontSize: 15,
		lineHeight: 22,
		color: Colors.greyLight,
		opacity: 0.9,
	},
	guideSection: {
		marginBottom: 24,
	},
	guideCard: {
		flexDirection: 'row',
		backgroundColor: Colors.primary6,
		borderRadius: 12,
		padding: 16,
		gap: 12,
		elevation: 4,
		shadowColor: Colors.primary67,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
	},
	guideImage: {
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: Colors.primary19,
	},
	guideInfo: {
		flex: 1,
		gap: 4,
	},
	guideName: {
		fontSize: 18,
		fontWeight: 'bold',
		color: Colors.primary97,
	},
	guideRole: {
		fontSize: 13,
		color: Colors.primary67,
		fontWeight: '500',
	},
	guideDescription: {
		fontSize: 13,
		color: Colors.greyLight,
		opacity: 0.8,
		marginTop: 4,
	},
	detailsSection: {
		marginBottom: 20,
	},
	detailsList: {
		gap: 12,
	},
	detailItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: Colors.primary13,
		borderRadius: 8,
		padding: 12,
	},
	detailLabel: {
		fontSize: 14,
		color: Colors.greyLight,
		opacity: 0.8,
	},
	detailValue: {
		fontSize: 14,
		color: Colors.primary97,
		fontWeight: '500',
	},
})

export default TripDetail
