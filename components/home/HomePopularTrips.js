import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useMemo } from 'react'
import { Colors } from '../../constants/colors'

function HomePopularTrips({ trips, bookings, navigation }) {
	const top5 = useMemo(() => {
		if (!trips?.length) return []

		// jeśli nie ma bookingów -> fallback (pierwsze 5)
		if (!bookings?.length) {
			return (trips ?? []).slice(0, 5).map(t => ({ ...t, bookingsCount: 0 }))
		}

		//  ile razy trip występuje w bookingach
		const countMap = {}
		for (const b of bookings) {
			const tripId = b?.idTrip
			if (!tripId) continue
			countMap[tripId] = (countMap[tripId] || 0) + 1
		}

		// połącz trip + count, usuń te bez bookingów, posortuj malejąco
		const ranked = trips
			.map(trip => ({
				...trip,
				bookingsCount: countMap[trip.id] || 0,
			}))
			.filter(t => t.bookingsCount > 0)
			.sort((a, b) => b.bookingsCount - a.bookingsCount)
			.slice(0, 5)

		// jeśli nic nie ma -> fallback
		if (ranked.length === 0) {
			return (trips ?? []).slice(0, 5).map(t => ({ ...t, bookingsCount: 0 }))
		}

		return ranked
	}, [trips, bookings])

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Ionicons name="trail-sign" size={20} color={Colors.primary37} />
				<Text style={styles.headerTitle}>Popular Trips</Text>
			</View>

			<View style={styles.scrollContainer}>
				<FlatList
					data={top5}
					keyExtractor={item => String(item.id)}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.listContent}
					renderItem={({ item }) => (
						<Pressable onPress={() => navigation?.navigate?.('TripDetails', { id: item.id })} style={styles.tripCard}>
							<View style={styles.tripImgBox}>
								{!!item.photoUrl ? (
									<Image source={{ uri: `http://10.0.2.2:5212/${item.photoUrl}` }} style={styles.tripImg} />
								) : (
									<View style={styles.tripImgPlaceholder}>
										<Ionicons name="image-outline" size={32} color={Colors.primary37} />
										<Text style={styles.noPhotoText}>No photo</Text>
									</View>
								)}
							</View>

							<View style={styles.tripInfo}>
								<Text style={styles.tripName} numberOfLines={1}>
									{item.name}
								</Text>
								<View style={styles.detailsRow}>
									<View style={styles.detailItem}>
										<Ionicons name="speedometer-outline" size={14} color={Colors.primary67} />
										<Text style={styles.detailText}>{item.levelOfDifficultyName || 'N/A'}</Text>
									</View>
									<View style={styles.detailItem}>
										<Ionicons name="sunny-outline" size={14} color={Colors.primary67} />
										<Text style={styles.detailText}>{item.seasonName || 'N/A'}</Text>
									</View>
								</View>
								<Text style={styles.priceText}>${item.pricePerPerson}/person</Text>
							</View>
						</Pressable>
					)}
				/>
			</View>
		</View>
	)
}

export default HomePopularTrips

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.boxBg,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: Colors.primary19,
		overflow: 'hidden',
		shadowColor: Colors.primary67,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 4,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: Colors.primary19,
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: Colors.primary37,
		gap: 8,
	},
	headerTitle: {
		fontSize: 16,
		fontWeight: '600',
		color: Colors.primary97,
		textTransform: 'uppercase',
		letterSpacing: 0.5,
	},
	scrollContainer: {
		paddingVertical: 14,
	},
	listContent: {
		paddingHorizontal: 16,
		gap: 12,
	},
	tripCard: {
		width: 180,
		backgroundColor: Colors.primary6,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: Colors.primary19,
		overflow: 'hidden',
	},
	tripImgBox: {
		width: '100%',
		height: 120,
		backgroundColor: Colors.primary19,
	},
	tripImg: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
	},
	tripImgPlaceholder: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 8,
	},
	noPhotoText: {
		color: Colors.primary67,
		fontSize: 12,
	},
	tripInfo: {
		padding: 12,
		gap: 6,
	},
	tripName: {
		fontSize: 15,
		fontWeight: '600',
		color: Colors.primary97,
	},
	detailsRow: {
		flexDirection: 'row',
		gap: 12,
	},
	detailItem: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	detailText: {
		fontSize: 11,
		color: Colors.primary67,
	},
	priceText: {
		fontSize: 13,
		fontWeight: '600',
		color: Colors.primary97,
	},
})
