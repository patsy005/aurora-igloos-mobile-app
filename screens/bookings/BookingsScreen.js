import { StyleSheet, Text, View } from 'react-native'
import { DUMMY_BOOKINGS, DUMMY_CUSTOMERS, DUMMY_IGLOOS, getBookings } from '../../constants/dummy-data'
import Button from '../../components/Button'
import { Colors } from '../../constants/colors'
import { FlatList } from 'react-native-gesture-handler'
import BookingListItem from '../../components/bookings/BookingListItem'

function BookingsScreen() {
	// const bookings = DUMMY_BOOKINGS
	// const customers = DUMMY_CUSTOMERS
	// const igloos = DUMMY_IGLOOS

	// const bookingsData = bookings.map(booking => {
	// 	const customer = customers.find(customer => customer.id === booking.idCustomer)
	// 	const igloo = igloos.find(igloo => igloo.id === booking.idIgloo)

	// 	return {
	// 		...booking,
	// 		iglooName: igloo.name,
	// 		customerName: customer.name,
	// 		customerSurname: customer.surname,
	// 		customerEmail: customer.email,
	// 	}
	// })

    const bookingsData = getBookings()

	function renderBookingListItem(itemData) {
		return <BookingListItem booking={itemData.item} />
	}

	return (
		<View style={styles.container}>
			<View>
				{/* <View> */}
				<Button onPress={() => {}}>Add booking</Button>
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
