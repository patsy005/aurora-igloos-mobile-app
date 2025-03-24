import { StyleSheet, Text, View } from 'react-native'
import { DUMMY_BOOKINGS, DUMMY_CUSTOMERS, DUMMY_IGLOOS, getBookings } from '../../constants/dummy-data'
import Button from '../../components/Button'
import { Colors } from '../../constants/colors'
import { FlatList } from 'react-native-gesture-handler'
import BookingListItem from '../../components/bookings/BookingListItem'
import ListScreen from '../screen/ListScreen'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect } from 'react'
import { fetchBookings } from '../../slices/bookingsSlice'
import Spinner from '../../components/shared/Spinner'

function BookingsScreen({ navigation }) {
	// const bookingsData = getBookings()
	const bookingsData = useSelector(state => state.bookings.bookings)
	const isLoading = useSelector(state => state.bookings.isLoading)
	const dispatch = useDispatch()

	const fetchBookingsFallback = useCallback(() => {
		dispatch(fetchBookings())
	}, [bookingsData])

	useEffect(() => {
		dispatch(fetchBookings())
	}, [dispatch])

	function onAddBooking() {
		navigation.navigate('BookingForm')
	}

	function renderBookingListItem(itemData) {
		return <BookingListItem booking={itemData.item} />
	}

	return (
		<>
			{isLoading && <Spinner />}
			{!isLoading && (
				<ListScreen
					onAdd={onAddBooking}
					onRenderListItem={renderBookingListItem}
					buttonLabel="Add booking"
					data={bookingsData}
					extraData={bookingsData}
				/>
			)}
		</>
	)
}

export default BookingsScreen
