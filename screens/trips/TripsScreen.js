import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTrips } from '../../slices/tripsSlice'
import { fetchTripLevel } from '../../slices/tripLevelSlice'
import { fetchTripSeasons } from '../../slices/tripSeasonSlice'
import Spinner from '../../components/shared/Spinner'
import ListScreen from '../screen/ListScreen'
import TripListItem from '../../components/trips/TripListItem'

function TripsScreen({ navigation }) {
	const trips = useSelector(state => state.trips.trips)
	const isLoading = useSelector(state => state.trips.isFetching)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchTrips())
		dispatch(fetchTripLevel())
		dispatch(fetchTripSeasons())
	}, [])

	function addTripHandler() {
		navigation.navigate('TripForm')
	}

	function renderIglooListItem(itemData) {
		return <TripListItem trip={itemData.item} />
	}

	return (
		<>
			{isLoading && <Spinner />}
			{!isLoading && (
				<ListScreen
					onAdd={addTripHandler}
					onRenderListItem={renderIglooListItem}
					buttonLabel="Add trip"
					data={trips}
				/>
			)}
		</>
	)
}

export default TripsScreen
