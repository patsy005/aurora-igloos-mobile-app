import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../constants/colors'
import { useNavigation } from '@react-navigation/native'

function BookingListItem({ booking }) {
	const navigation = useNavigation()

	function getBookingDetailsHandler() {
		navigation.navigate('BookingDetails', {
			bookingId: booking.id,
		})
	}

	const hasIgloo = booking.iglooName && booking.iglooName.trim() !== ''
	const hasTrip = booking.tripName && booking.tripName.trim() !== ''

	const getBookingType = () => {
		if (hasIgloo && hasTrip) return 'Igloo & Trip'
		if (hasIgloo) return 'Igloo'
		if (hasTrip) return 'Trip'
		return 'Booking'
	}

	return (
		<Pressable
			onPress={getBookingDetailsHandler}
			style={({ pressed }) => [styles.container, pressed && styles.pressed]}>
			{/* Header */}
			<View style={styles.header}>
				<View style={styles.headerLeft}>
					<Ionicons name="calendar" size={20} color={Colors.primary37} />
					<Text style={styles.bookingId}>
						{getBookingType()} #{booking.id}
					</Text>
				</View>
				<View style={styles.amountBadge}>
					<Text style={styles.amountText}>${booking.amount?.toFixed(2)}</Text>
				</View>
			</View>

			{/* Igloo/Trip Section */}
			{(hasIgloo || hasTrip) && (
				<View style={styles.section}>
					{hasIgloo && (
						<View style={styles.row}>
							<Ionicons name="home" size={18} color={Colors.primary67} />
							<Text style={styles.locationText}>{booking.iglooName}</Text>
						</View>
					)}
					{hasTrip && (
						<View style={styles.row}>
							<Ionicons name="snow" size={18} color={Colors.primary67} />
							<View style={styles.tripInfo}>
								<Text style={styles.locationText}>{booking.tripName}</Text>
								{booking.tripDate && <Text style={styles.tripDate}>{booking.tripDate}</Text>}
							</View>
						</View>
					)}
				</View>
			)}

			{/* Dates Section - only for igloo bookings */}
			{hasIgloo && (
				<View style={styles.section}>
					<View style={styles.row}>
						<Ionicons name="log-in" size={18} color={Colors.primary67} />
						<Text style={styles.dateLabel}>Check-in:</Text>
						<Text style={styles.dateValue}>{booking.checkIn}</Text>
					</View>
					<View style={styles.row}>
						<Ionicons name="log-out" size={18} color={Colors.primary67} />
						<Text style={styles.dateLabel}>Check-out:</Text>
						<Text style={styles.dateValue}>{booking.checkOut}</Text>
					</View>
				</View>
			)}

			{/* Customer Section */}
			<View style={styles.customerSection}>
				<View style={styles.customerAvatar}>
					<Ionicons name="person" size={20} color={Colors.primary37} />
				</View>
				<View style={styles.customerInfo}>
					<Text style={styles.customerName}>
						{booking.customerName} {booking.customerSurname}
					</Text>
					<Text style={styles.customerEmail}>{booking.customerEmail}</Text>
					{booking.customerPhone && <Text style={styles.customerPhone}>{booking.customerPhone}</Text>}
				</View>
			</View>

			{/* Footer */}
			<View style={styles.footer}>
				<View style={styles.footerItem}>
					<Ionicons name="people" size={16} color={Colors.primary67} />
					<Text style={styles.footerText}>
						{booking.guests} guest{booking.guests !== 1 ? 's' : ''}
					</Text>
				</View>
				<View style={styles.footerItem}>
					<Ionicons name="card" size={16} color={Colors.primary67} />
					<Text style={styles.footerText}>{booking.paymentMethodName}</Text>
				</View>
				{booking.earlyCheckInRequest && (
					<View style={styles.badgeEarly}>
						<Text style={styles.badgeText}>Early Check-in</Text>
					</View>
				)}
				{booking.lateCheckOutRequest && (
					<View style={styles.badgeLate}>
						<Text style={styles.badgeText}>Late Check-out</Text>
					</View>
				)}
			</View>
		</Pressable>
	)
}

export default BookingListItem

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.boxBg,
		borderRadius: 16,
		marginBottom: 24,
		borderWidth: 1,
		borderColor: Colors.primary19,
		overflow: 'hidden',
		shadowColor: Colors.primary67,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 4,
	},
	pressed: {
		opacity: 0.8,
		transform: [{ scale: 0.98 }],
	},

	// Header
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: Colors.primary19,
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: Colors.primary37,
	},
	headerLeft: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	bookingId: {
		fontSize: 16,
		fontWeight: '600',
		color: Colors.primary97,
	},
	amountBadge: {
		backgroundColor: Colors.primary37,
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 20,
	},
	amountText: {
		fontSize: 16,
		fontWeight: 'bold',
		color: Colors.primary97,
	},

	// Sections
	section: {
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: Colors.primary19,
		gap: 8,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	locationText: {
		fontSize: 16,
		fontWeight: '600',
		color: Colors.primary97,
		flex: 1,
	},
	tripInfo: {
		flex: 1,
		gap: 4,
	},
	tripDate: {
		fontSize: 13,
		color: Colors.primary67,
	},
	dateLabel: {
		fontSize: 14,
		color: Colors.primary67,
		minWidth: 80,
	},
	dateValue: {
		fontSize: 14,
		fontWeight: '600',
		color: Colors.primary97,
		flex: 1,
	},

	// Customer
	customerSection: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: Colors.primary19,
		gap: 12,
	},
	customerAvatar: {
		width: 44,
		height: 44,
		borderRadius: 22,
		backgroundColor: Colors.primary19,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 2,
		borderColor: Colors.primary37,
	},
	customerInfo: {
		flex: 1,
		gap: 2,
	},
	customerName: {
		fontSize: 16,
		fontWeight: '600',
		color: Colors.primary97,
	},
	customerEmail: {
		fontSize: 13,
		color: Colors.primary67,
	},
	customerPhone: {
		fontSize: 13,
		color: Colors.primary67,
	},

	// Footer
	footer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 12,
		gap: 12,
	},
	footerItem: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	footerText: {
		fontSize: 13,
		color: Colors.primary67,
	},
	badgeEarly: {
		backgroundColor: 'rgba(34, 197, 94, 0.2)',
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: 'rgba(34, 197, 94, 0.4)',
	},
	badgeLate: {
		backgroundColor: 'rgba(249, 115, 22, 0.2)',
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: 'rgba(249, 115, 22, 0.4)',
	},
	badgeText: {
		fontSize: 11,
		fontWeight: '600',
		color: Colors.primary97,
	},
})
