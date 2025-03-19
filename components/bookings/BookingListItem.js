import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../constants/colors'
import { useNavigation } from '@react-navigation/native'

function BookingListItem({ booking }) {
	const navigation = useNavigation()

	function getBookingDetailsHandler() {
		navigation.navigate('BookingDetails', {
			bookingId: booking.id,
		})
	}

	return (
		<View style={styles.container}>
			<Pressable onPress={() => getBookingDetailsHandler()} style={({ pressed }) => pressed && styles.pressed}>
				<View>
					<View style={styles.cabinAndDateContainer}>
						<Text style={styles.cabinName}>{booking.iglooName}</Text>
						<Text style={styles.datesText}>
							{booking.checkIn} - {booking.checkOut}
						</Text>
					</View>
					<View style={styles.customerDataContainer}>
						<Text style={[styles.textShared, styles.customerDataText, styles.customerName]}>
							{booking.customerName} {booking.customerSurname}
						</Text>
						<Text style={[styles.textShared, styles.customerDataText, styles.customerEmail]}>
							{booking.customerEmail}
						</Text>
					</View>

					<View style={styles.amountContainer}>
						<Text style={[styles.textShared, styles.amountText]}>${booking.amount.toFixed(2)}</Text>
					</View>
				</View>
			</Pressable>
		</View>
	)
}

export default BookingListItem

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		paddingVertical: 8,
		paddingHorizontal: 10,
		backgroundColor: Colors.primary13,
		borderRadius: 8,
	},
	textShared: {
		color: Colors.white,
	},
	cabinAndDateContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 15,
	},
	cabinName: {
		fontSize: 18,
		fontWeight: 'bold',
		color: Colors.primary97,
	},
	datesText: {
		color: Colors.greyLight,
		fontWeight: 'bold',
	},
	customerDataContainer: {
		flexDirection: 'row',
		gap: 10,
	},
	customerDataText: {
		fontSize: 15,
	},
	customerName: {
		fontWeight: 'bold',
		fontSize: 15,
	},
	customerEmail: {
		color: Colors.greyLight,
	},
	amountContainer: {
		alignSelf: 'flex-end',
		backgroundColor: Colors.primary86,
		color: Colors.primary6,
		borderRadius: 5,
		padding: 5,
		elevation: 4,
		shadowColor: Colors.primary6,
		shadowRadius: 5,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.5,
	},
	amountText: {
		color: Colors.primary6,
		fontWeight: 'bold',
		fontSize: 15,
	},
	pressed: {
		opacity: 0.75,
	},
})
