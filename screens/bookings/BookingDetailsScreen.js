import { ScrollView, StyleSheet, Text, View } from 'react-native'
import BookingDetail from '../../components/bookings/BookingDetail'
import { Colors } from '../../constants/colors'

function BookingDetailsScreen({ route }) {
	const bookingId = route.params.bookingId

	return (
		<ScrollView style={styles.screen}>
			<BookingDetail bookingId={bookingId} />
		</ScrollView>
	)
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
