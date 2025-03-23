import { ScrollView, StyleSheet, Text, View } from 'react-native'
import BookingDetail from '../../components/bookings/BookingDetail'
import { Colors } from '../../constants/colors'
import { useSelector } from 'react-redux'

function BookingDetailsScreen({ route }) {
	const bookingId = route.params.bookingId
	const bookings = useSelector(state => state.bookings.bookings)
	const booking = bookings?.find(booking => booking.id === bookingId)
	const isLoading = useSelector(state => state.bookings.isLoading)

	return <ScrollView style={styles.screen}>{!isLoading && booking && <BookingDetail booking={booking} />}</ScrollView>
}

export default BookingDetailsScreen

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.primary6,
		paddingVertical: 20,
		paddingHorizontal: 15,
	},
})
