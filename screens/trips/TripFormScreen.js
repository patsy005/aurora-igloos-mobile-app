import { useLayoutEffect } from 'react'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Spinner from '../../components/shared/Spinner'
import TripForm from '../../components/trips/TripForm'

function TripFormScreen({ route, navigation }) {
	const tripId = route?.params?.tripId
	const isLoading = useSelector(state => state.trips.isFetching)

	const isEditing = !!tripId

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? 'Edit trip' : 'Add trip',
		})
	}, [navigation, tripId])

	return (
		<GestureHandlerRootView style={styles.screen}>
			{isLoading && <Spinner />}
			{!isLoading && <TripForm tripId={tripId} />}
		</GestureHandlerRootView>
	)
}

export default TripFormScreen

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
})
