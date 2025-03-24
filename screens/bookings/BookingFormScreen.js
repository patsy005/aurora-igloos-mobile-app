import { ScrollView, StyleSheet } from 'react-native'
import BookingForm from '../../components/bookings/BookingForm'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import Spinner from '../../components/shared/Spinner'
import { Colors } from '../../constants/colors'

function BookingFormScreen({ route }) {
	const bookingId = route?.params?.bookingId
	const isLoading = useSelector(state => state.bookings.isLoading)
	const navigation = useNavigation()

	const isEditing = !!bookingId

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? 'Edit booking' : 'Add booking',
		})
	}, [navigation, isEditing])

	return (
		<GestureHandlerRootView style={styles.screen}>
			<ScrollView contentContainerStyle={{ paddingBottom: 200 }} style={styles.scroll}>
				{isLoading && <Spinner />}
				{!isLoading && <BookingForm bookingId={bookingId} />}
			</ScrollView>
		</GestureHandlerRootView>
	)
}

export default BookingFormScreen

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	scroll: {
		backgroundColor: Colors.primary6,
	},
})
