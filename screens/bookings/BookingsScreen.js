import { StyleSheet, Text, View } from 'react-native'
import { DUMMY_BOOKINGS, DUMMY_CUSTOMERS, DUMMY_IGLOOS, getBookings } from '../../constants/dummy-data'
import Button from '../../components/Button'
import { Colors } from '../../constants/colors'
import { FlatList } from 'react-native-gesture-handler'
import BookingListItem from '../../components/bookings/BookingListItem'
import ListScreen from '../screen/ListScreen'

function BookingsScreen({ navigation }) {
	const bookingsData = getBookings()

	function onAddBooking() {
		navigation.navigate('BookingForm')
	}

	function renderBookingListItem(itemData) {
		return <BookingListItem booking={itemData.item} />
	}

	return (
		<ListScreen
			onAdd={onAddBooking}
			onRenderListItem={renderBookingListItem}
			buttonLabel="Add booking"
			data={bookingsData}
		/>
	)
}

export default BookingsScreen
