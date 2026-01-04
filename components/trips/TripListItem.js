import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import ListItemContainer from '../shared/ListItemContainer'
import { Colors } from '../../constants/colors'
import { useNavigation } from '@react-navigation/native'

function TripListItem({ trip }) {
	const navigation = useNavigation()
	const tripLevels = useSelector(state => state.tripLevels.tripLevels)
	const tripSeasons = useSelector(state => state.tripSeasons.tripSeasons)

	console.log(trip)

	function getTripDetailHandler() {
		navigation.navigate('TripDetails', {
			tripId: trip.id,
		})
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
		<ListItemContainer>
			<Pressable style={({ pressed }) => pressed && styles.pressed} onPress={getTripDetailHandler}>
				<View style={styles.container}>
					<View style={styles.leftSection}>
						{trip.photoUrl && (
							<View style={styles.imageContainer}>
								<Image
									source={{ uri: `http://10.0.2.2:5212/${trip.photoUrl}` }}
									style={styles.tripImage}
									resizeMode="cover"
								/>
								<View style={styles.seasonBadge}>
									<Text style={styles.seasonIcon}>{getSeasonIcon(trip.seasonId)}</Text>
								</View>
							</View>
						)}
						<View style={styles.infoContainer}>
							<Text style={styles.tripName} numberOfLines={2}>
								{trip.name}
							</Text>
							<Text style={styles.description} numberOfLines={2}>
								{trip.shortDescription}
							</Text>

							<View style={styles.detailsRow}>
								<View style={styles.durationContainer}>
									<Text style={styles.durationIcon}>⏱️</Text>
									<Text style={styles.durationText}>
										{trip.duration} {trip.duration === 1 ? 'day' : 'days'}
									</Text>
								</View>

								<View style={styles.difficultyContainer}>
									<View
										style={[styles.difficultyDot, { backgroundColor: getDifficultyColor(trip.levelOfDifficultyId) }]}
									/>
									<Text style={styles.difficultyText}>{getDifficultyName(trip.levelOfDifficultyId)}</Text>
								</View>
							</View>

							<View style={styles.guideRow}>
								<Text style={styles.guideIcon}>👨‍🏫</Text>
								<Text style={styles.guideText}>Guide: {trip.guideName}</Text>
							</View>
						</View>
					</View>

					<View style={styles.rightSection}>
						<Text style={styles.priceLabel}>per person</Text>
						<Text style={styles.priceValue}>${trip.pricePerPerson}</Text>
						<Text style={styles.seasonText}>{getSeasonName(trip.seasonId)}</Text>
					</View>
				</View>
			</Pressable>
		</ListItemContainer>
	)
}

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
	tripImage: {
		width: 85,
		height: 85,
		borderRadius: 12,
		backgroundColor: Colors.primary19,
	},
	seasonBadge: {
		position: 'absolute',
		top: -6,
		right: -6,
		backgroundColor: Colors.primary19,
		borderRadius: 16,
		width: 32,
		height: 32,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: Colors.primary67,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 5,
	},
	seasonIcon: {
		fontSize: 16,
	},
	infoContainer: {
		flex: 1,
		gap: 6,
	},
	tripName: {
		fontSize: 18,
		fontWeight: 'bold',
		color: Colors.primary97,
		marginBottom: 2,
	},
	description: {
		color: Colors.greyLight,
		fontSize: 13,
		lineHeight: 18,
		opacity: 0.9,
	},
	detailsRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 16,
		marginTop: 4,
	},
	durationContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	durationIcon: {
		fontSize: 12,
	},
	durationText: {
		fontSize: 12,
		color: Colors.primary97,
		fontWeight: '500',
	},
	difficultyContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	difficultyDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
	},
	difficultyText: {
		fontSize: 12,
		color: Colors.greyLight,
		fontWeight: '500',
	},
	guideRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
		marginTop: 2,
	},
	guideIcon: {
		fontSize: 12,
	},
	guideText: {
		fontSize: 12,
		color: Colors.greyLight,
		fontStyle: 'italic',
		opacity: 0.8,
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
		fontSize: 22,
		fontWeight: 'bold',
		color: Colors.primary97,
		marginBottom: 4,
	},
	seasonText: {
		fontSize: 11,
		color: Colors.primary67,
		fontWeight: '600',
		textTransform: 'uppercase',
		opacity: 0.8,
	},
	pressed: {
		opacity: 0.75,
		transform: [{ scale: 0.98 }],
	},
})

export default TripListItem
