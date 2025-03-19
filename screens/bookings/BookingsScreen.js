import { StyleSheet, Text, View } from 'react-native'
import { DUMMY_BOOKINGS, DUMMY_CUSTOMERS, DUMMY_IGLOOS, getBookings } from '../../constants/dummy-data'
import Button from '../../components/Button'
import { Colors } from '../../constants/colors'
import { FlatList } from 'react-native-gesture-handler'
import BookingListItem from '../../components/bookings/BookingListItem'

function BookingsScreen({navigation}) {

    const bookingsData = getBookings()

	function onAddBooking(){
		navigation.navigate('BookingForm')
	}

	function renderBookingListItem(itemData) {
		return <BookingListItem booking={itemData.item} />
	}

	return (
		<View style={styles.container}>
			<View>
				{/* <View> */}
				<Button onPress={onAddBooking}>Add booking</Button>
				{/* </View> */}

				<View style={styles.listContainer}>
					<FlatList
						data={bookingsData}
						keyExtractor={item => item.id}
						renderItem={renderBookingListItem}
						contentContainerStyle={{ paddingBottom: 40 }}
					/>
				</View>
			</View>
		</View>
	)
}

export default BookingsScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.primary6,
		paddingVertical: 20,
		paddingHorizontal: 15,
	},
	listContainer: {
		marginBottom: 40,
	},
})
