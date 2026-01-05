import { Alert, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../constants/colors'
import { useNavigation } from '@react-navigation/native'
import DetailContainer from '../shared/DetailContainer'
import { useDispatch } from 'react-redux'
import { deleteBooking, fetchBookings } from '../../slices/bookingsSlice'

function BookingDetail({ booking }) {
	const navigation = useNavigation()
	const dispatch = useDispatch()

	function onEditBooking() {
		navigation.navigate('BookingForm', {
			bookingId: booking.id,
		})
	}

	async function onDeleteBooking() {
		Alert.alert('Delete Booking', 'Are you sure you want to delete this booking?', [
			{ text: 'Cancel', style: 'cancel' },
			{
				text: 'Delete',
				style: 'destructive',
				onPress: async () => {
					try {
						await dispatch(deleteBooking(booking.id)).unwrap()
						await dispatch(fetchBookings())
						Alert.alert('Success', 'Booking deleted successfully')
						navigation.goBack()
					} catch (err) {
						Alert.alert('Error', 'Failed to delete booking')
					}
				},
			},
		])
	}

	const hasIgloo = booking.iglooName && booking.iglooName.trim() !== ''
	const hasTrip = booking.tripName && booking.tripName.trim() !== ''

	const getBookingType = () => {
		if (hasIgloo && hasTrip) return 'Igloo & Trip Booking'
		if (hasIgloo) return 'Igloo Booking'
		if (hasTrip) return 'Trip Booking'
		return 'Booking'
	}

	return (
		<DetailContainer onEdit={onEditBooking} onDelete={onDeleteBooking}>
			{/* Header */}
			<View style={styles.header}>
				<Ionicons name="calendar" size={28} color={Colors.primary37} />
				<Text style={styles.headerTitle}>
					{getBookingType()} #{booking.id}
				</Text>
			</View>

			{/* Igloo/Trip Section */}
			{(hasIgloo || hasTrip) && (
				<View style={styles.section}>
					<View style={styles.sectionHeader}>
						<Ionicons name="location" size={20} color={Colors.primary37} />
						<Text style={styles.sectionTitle}>Location</Text>
					</View>
					<View style={styles.sectionContent}>
						{hasIgloo && (
							<View style={styles.row}>
								<Ionicons name="home" size={20} color={Colors.primary67} />
								<View style={styles.infoColumn}>
									<Text style={styles.label}>Igloo</Text>
									<Text style={styles.value}>{booking.iglooName}</Text>
								</View>
							</View>
						)}
						{hasTrip && (
							<View style={styles.row}>
								<Ionicons name="snow" size={20} color={Colors.primary67} />
								<View style={styles.infoColumn}>
									<Text style={styles.label}>Trip</Text>
									<Text style={styles.value}>{booking.tripName}</Text>
									{booking.tripDate && <Text style={styles.subValue}>{booking.tripDate}</Text>}
								</View>
							</View>
						)}
					</View>
				</View>
			)}

			{/* Dates Section - only for igloo */}
			{hasIgloo && (
				<View style={styles.section}>
					<View style={styles.sectionHeader}>
						<Ionicons name="calendar-outline" size={20} color={Colors.primary37} />
						<Text style={styles.sectionTitle}>Stay Dates</Text>
					</View>
					<View style={styles.sectionContent}>
						<View style={styles.row}>
							<Ionicons name="log-in" size={20} color={Colors.primary67} />
							<View style={styles.infoColumn}>
								<Text style={styles.label}>Check-in</Text>
								<Text style={styles.value}>{booking.checkIn}</Text>
							</View>
						</View>
						<View style={styles.row}>
							<Ionicons name="log-out" size={20} color={Colors.primary67} />
							<View style={styles.infoColumn}>
								<Text style={styles.label}>Check-out</Text>
								<Text style={styles.value}>{booking.checkOut}</Text>
							</View>
						</View>
						{(booking.earlyCheckInRequest || booking.lateCheckOutRequest) && (
							<View style={styles.badgesRow}>
								{booking.earlyCheckInRequest && (
									<View style={styles.badgeEarly}>
										<Ionicons name="time" size={14} color={Colors.primary97} />
										<Text style={styles.badgeText}>Early Check-in</Text>
									</View>
								)}
								{booking.lateCheckOutRequest && (
									<View style={styles.badgeLate}>
										<Ionicons name="time" size={14} color={Colors.primary97} />
										<Text style={styles.badgeText}>Late Check-out</Text>
									</View>
								)}
							</View>
						)}
					</View>
				</View>
			)}

			{/* Booking Details Section */}
			<View style={styles.section}>
				<View style={styles.sectionHeader}>
					<Ionicons name="information-circle" size={20} color={Colors.primary37} />
					<Text style={styles.sectionTitle}>Booking Details</Text>
				</View>
				<View style={styles.sectionContent}>
					<View style={styles.detailGrid}>
						<View style={styles.detailItem}>
							<Ionicons name="cash" size={20} color={Colors.primary67} />
							<View style={styles.infoColumn}>
								<Text style={styles.label}>Amount</Text>
								<Text style={styles.valueHighlight}>${booking.amount?.toFixed(2)}</Text>
							</View>
						</View>
						<View style={styles.detailItem}>
							<Ionicons name="card" size={20} color={Colors.primary67} />
							<View style={styles.infoColumn}>
								<Text style={styles.label}>Payment</Text>
								<Text style={styles.value}>{booking.paymentMethodName}</Text>
							</View>
						</View>
					</View>
					<View style={styles.detailGrid}>
						<View style={styles.detailItem}>
							<Ionicons name="people" size={20} color={Colors.primary67} />
							<View style={styles.infoColumn}>
								<Text style={styles.label}>Guests</Text>
								<Text style={styles.value}>
									{booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}
								</Text>
							</View>
						</View>
						<View style={styles.detailItem}>
							<Ionicons name="calendar" size={20} color={Colors.primary67} />
							<View style={styles.infoColumn}>
								<Text style={styles.label}>Booking Date</Text>
								<Text style={styles.value}>{booking.bookingDate}</Text>
							</View>
						</View>
					</View>
				</View>
			</View>

			{/* Customer Section */}
			<View style={styles.section}>
				<View style={styles.sectionHeader}>
					<Ionicons name="person" size={20} color={Colors.primary37} />
					<Text style={styles.sectionTitle}>Customer Information</Text>
				</View>
				<View style={styles.customerContent}>
					<View style={styles.customerAvatar}>
						<Ionicons name="person" size={32} color={Colors.primary37} />
					</View>
					<View style={styles.customerInfo}>
						<Text style={styles.customerName}>
							{booking.customerName} {booking.customerSurname}
						</Text>
						<View style={styles.contactRow}>
							<Ionicons name="mail" size={16} color={Colors.primary67} />
							<Text style={styles.contactText}>{booking.customerEmail}</Text>
						</View>
						{booking.customerPhone && (
							<View style={styles.contactRow}>
								<Ionicons name="call" size={16} color={Colors.primary67} />
								<Text style={styles.contactText}>{booking.customerPhone}</Text>
							</View>
						)}
					</View>
				</View>
			</View>
		</DetailContainer>
	)
}

export default BookingDetail

const styles = StyleSheet.create({
	header: {
		alignItems: 'center',
		paddingVertical: 20,
		gap: 12,
	},
	headerTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		color: Colors.primary97,
		textAlign: 'center',
	},

	section: {
		backgroundColor: Colors.boxBg,
		borderRadius: 16,
		marginBottom: 16,
		borderWidth: 1,
		borderColor: Colors.primary19,
		overflow: 'hidden',
		shadowColor: Colors.primary67,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 4,
	},
	sectionHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: Colors.primary19,
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: Colors.primary37,
		gap: 8,
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: '600',
		color: Colors.primary97,
		textTransform: 'uppercase',
		letterSpacing: 0.5,
	},
	sectionContent: {
		padding: 16,
		gap: 16,
	},

	row: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		gap: 12,
	},
	infoColumn: {
		flex: 1,
		gap: 4,
	},
	label: {
		fontSize: 13,
		color: Colors.primary67,
		textTransform: 'uppercase',
		letterSpacing: 0.5,
	},
	value: {
		fontSize: 16,
		fontWeight: '600',
		color: Colors.primary97,
	},
	valueHighlight: {
		fontSize: 22,
		fontWeight: 'bold',
		color: Colors.primary97,
	},
	subValue: {
		fontSize: 14,
		color: Colors.primary67,
	},

	detailGrid: {
		flexDirection: 'row',
		gap: 16,
	},
	detailItem: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-start',
		gap: 12,
		backgroundColor: Colors.primary19,
		padding: 12,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: Colors.primary37,
	},

	badgesRow: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
		marginTop: 4,
	},
	badgeEarly: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'rgba(34, 197, 94, 0.2)',
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: 'rgba(34, 197, 94, 0.4)',
		gap: 6,
	},
	badgeLate: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'rgba(249, 115, 22, 0.2)',
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: 'rgba(249, 115, 22, 0.4)',
		gap: 6,
	},
	badgeText: {
		fontSize: 12,
		fontWeight: '600',
		color: Colors.primary97,
	},

	customerContent: {
		flexDirection: 'row',
		padding: 16,
		gap: 16,
	},
	customerAvatar: {
		width: 64,
		height: 64,
		borderRadius: 32,
		backgroundColor: Colors.primary19,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 2,
		borderColor: Colors.primary37,
	},
	customerInfo: {
		flex: 1,
		gap: 8,
	},
	customerName: {
		fontSize: 20,
		fontWeight: 'bold',
		color: Colors.primary97,
	},
	contactRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	contactText: {
		fontSize: 14,
		color: Colors.primary67,
	},
})
