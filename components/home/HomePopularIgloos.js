// import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
// import { Ionicons } from '@expo/vector-icons'
// import { useMemo } from 'react'
// import { Colors } from '../../constants/colors'

// function HomePopularIgloos({ igloos, navigation }) {
// 	const top5 = useMemo(() => (igloos ?? []).slice(0, 5), [igloos])

// 	console.log(igloos)

// 	return (
// 		<View style={styles.container}>
// 			<View style={styles.header}>
// 				<Ionicons name="snow" size={20} color={Colors.primary37} />
// 				<Text style={styles.headerTitle}>Popular Igloos</Text>
// 			</View>

// 			<View style={styles.scrollContainer}>
// 				<FlatList
// 					data={top5}
// 					keyExtractor={item => String(item.id)}
// 					horizontal
// 					showsHorizontalScrollIndicator={false}
// 					contentContainerStyle={styles.listContent}
// 					renderItem={({ item }) => (
// 						<Pressable onPress={() => navigation?.navigate?.('IglooDetails', { id: item.id })} style={styles.iglooCard}>
// 							<View style={styles.iglooImgBox}>
// 								{!!item.photoUrl ? (
// 									<Image source={{ uri: `http://10.0.2.2:5212/${item.photoUrl}` }} style={styles.iglooImg} />
// 								) : (
// 									<View style={styles.iglooImgPlaceholder}>
// 										<Ionicons name="image-outline" size={32} color={Colors.primary37} />
// 										<Text style={styles.noPhotoText}>No photo</Text>
// 									</View>
// 								)}
// 							</View>

// 							<View style={styles.iglooInfo}>
// 								<Text style={styles.iglooName} numberOfLines={1}>
// 									{item.name}
// 								</Text>
// 								<Text style={styles.capacityText}>Capacity: {item.capacity} guests</Text>
// 								<Text style={styles.priceText}>${item.pricePerNight}/night</Text>
// 							</View>
// 						</Pressable>
// 					)}
// 				/>
// 			</View>
// 		</View>
// 	)
// }

// export default HomePopularIgloos

// const styles = StyleSheet.create({
// 	container: {
// 		backgroundColor: Colors.boxBg,
// 		borderRadius: 16,
// 		borderWidth: 1,
// 		borderColor: Colors.primary19,
// 		overflow: 'hidden',
// 		shadowColor: Colors.primary67,
// 		shadowOffset: { width: 0, height: 2 },
// 		shadowOpacity: 0.1,
// 		shadowRadius: 8,
// 		elevation: 4,
// 	},
// 	header: {
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		backgroundColor: Colors.primary19,
// 		paddingHorizontal: 16,
// 		paddingVertical: 12,
// 		borderBottomWidth: 1,
// 		borderBottomColor: Colors.primary37,
// 		gap: 8,
// 	},
// 	headerTitle: {
// 		fontSize: 16,
// 		fontWeight: '600',
// 		color: Colors.primary97,
// 		textTransform: 'uppercase',
// 		letterSpacing: 0.5,
// 	},
// 	scrollContainer: {
// 		paddingVertical: 14,
// 	},
// 	listContent: {
// 		paddingHorizontal: 16,
// 		gap: 12,
// 	},
// 	iglooCard: {
// 		width: 180,
// 		backgroundColor: Colors.primary6,
// 		borderRadius: 12,
// 		borderWidth: 1,
// 		borderColor: Colors.primary19,
// 		overflow: 'hidden',
// 	},
// 	iglooImgBox: {
// 		width: '100%',
// 		height: 120,
// 		backgroundColor: Colors.primary19,
// 	},
// 	iglooImg: {
// 		width: '100%',
// 		height: '100%',
// 		resizeMode: 'cover',
// 	},
// 	iglooImgPlaceholder: {
// 		width: '100%',
// 		height: '100%',
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		gap: 8,
// 	},
// 	noPhotoText: {
// 		color: Colors.primary67,
// 		fontSize: 12,
// 	},
// 	iglooInfo: {
// 		padding: 12,
// 		gap: 6,
// 	},
// 	iglooName: {
// 		fontSize: 15,
// 		fontWeight: '600',
// 		color: Colors.primary97,
// 	},
// 	capacityText: {
// 		fontSize: 12,
// 		color: Colors.primary67,
// 	},
// 	priceText: {
// 		fontSize: 13,
// 		fontWeight: '600',
// 		color: Colors.primary97,
// 	},
// })

import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useMemo } from 'react'
import { Colors } from '../../constants/colors'

function HomePopularIgloos({ igloos, bookings, navigation }) {
	const top5 = useMemo(() => {
		if (!igloos?.length) return []

		// jeśli nie ma bookingów -> fallback (np. pierwsze 5)
		if (!bookings?.length) {
			return (igloos ?? []).slice(0, 5).map(i => ({ ...i, bookingsCount: 0 }))
		}

		// policz ile razy igloo występuje w bookingach
		const countMap = {}
		for (const b of bookings) {
			const iglooId = b?.idIgloo // <-- jeśli masz inną nazwę pola, zmień tutaj
			if (!iglooId) continue
			countMap[iglooId] = (countMap[iglooId] || 0) + 1
		}

		// połącz igloo + count, usuń te bez bookingów, posortuj malejąco
		const ranked = igloos
			.map(igloo => ({
				...igloo,
				bookingsCount: countMap[igloo.id] || 0,
			}))
			.filter(i => i.bookingsCount > 0)
			.sort((a, b) => b.bookingsCount - a.bookingsCount)
			.slice(0, 5)

		// jeśli nic nie ma (np. wszystkie bookingi to trip) -> fallback
		if (ranked.length === 0) {
			return (igloos ?? []).slice(0, 5).map(i => ({ ...i, bookingsCount: 0 }))
		}

		return ranked
	}, [igloos, bookings])

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Ionicons name="snow" size={20} color={Colors.primary37} />
				<Text style={styles.headerTitle}>Popular Igloos</Text>
			</View>

			<View style={styles.scrollContainer}>
				<FlatList
					data={top5}
					keyExtractor={item => String(item.id)}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.listContent}
					renderItem={({ item }) => (
						<Pressable onPress={() => navigation?.navigate?.('IglooDetails', { id: item.id })} style={styles.iglooCard}>
							<View style={styles.iglooImgBox}>
								{!!item.photoUrl ? (
									<Image source={{ uri: `http://10.0.2.2:5212/${item.photoUrl}` }} style={styles.iglooImg} />
								) : (
									<View style={styles.iglooImgPlaceholder}>
										<Ionicons name="image-outline" size={32} color={Colors.primary37} />
										<Text style={styles.noPhotoText}>No photo</Text>
									</View>
								)}

								{/* Badge popularności */}
								{item.bookingsCount > 0 && (
									<View style={styles.popularityBadge}>
										<Ionicons name="flame" size={12} color={Colors.white} />
										<Text style={styles.popularityText}>{item.bookingsCount}</Text>
									</View>
								)}
							</View>

							<View style={styles.iglooInfo}>
								<Text style={styles.iglooName} numberOfLines={1}>
									{item.name}
								</Text>

								<Text style={styles.capacityText}>Capacity: {item.capacity} guests</Text>

								{!!item.pricePerNight && <Text style={styles.priceText}>${item.pricePerNight}/night</Text>}

								{item.bookingsCount > 0 ? (
									<Text style={styles.bookingsText}>Booked {item.bookingsCount}x</Text>
								) : (
									<Text style={styles.bookingsTextMuted}>No bookings yet</Text>
								)}
							</View>
						</Pressable>
					)}
				/>
			</View>
		</View>
	)
}

export default HomePopularIgloos

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

	iglooCard: {
		width: 180,
		backgroundColor: Colors.primary6,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: Colors.primary19,
		overflow: 'hidden',
	},

	iglooImgBox: {
		width: '100%',
		height: 120,
		backgroundColor: Colors.primary19,
	},
	iglooImg: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
	},
	iglooImgPlaceholder: {
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

	// 🔥 badge
	popularityBadge: {
		position: 'absolute',
		top: 8,
		right: 8,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
		backgroundColor: Colors.primary37,
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 999,
	},
	popularityText: {
		color: Colors.white,
		fontSize: 12,
		fontWeight: '700',
	},

	iglooInfo: {
		padding: 12,
		gap: 6,
	},
	iglooName: {
		fontSize: 15,
		fontWeight: '600',
		color: Colors.primary97,
	},
	capacityText: {
		fontSize: 12,
		color: Colors.primary67,
	},
	priceText: {
		fontSize: 13,
		fontWeight: '600',
		color: Colors.primary97,
	},

	bookingsText: {
		marginTop: 2,
		fontSize: 12,
		color: Colors.primary97,
		opacity: 0.9,
	},
	bookingsTextMuted: {
		marginTop: 2,
		fontSize: 12,
		color: Colors.primary67,
		opacity: 0.8,
	},
})
