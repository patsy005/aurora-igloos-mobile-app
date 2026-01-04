import { ScrollView, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import TripDetail from '../../components/trips/TripDetail'
import Spinner from '../../components/shared/Spinner'
import { Colors } from '../../constants/colors'

function TripDetailsScreen({ route }) {
	const tripId = route.params.tripId
	const trips = useSelector(state => state.trips.trips)
	const trip = trips?.find(trip => trip.id === tripId)
	const isLoading = useSelector(state => state.trips.isFetching)

	return (
		<ScrollView style={styles.screen}>
			{isLoading && <Spinner />}
			{!isLoading && trip && <TripDetail trip={trip} />}
		</ScrollView>
	)
}

export default TripDetailsScreen

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.primary6,
		paddingVertical: 20,
		paddingHorizontal: 15,
	},
})
