import { StyleSheet, Text, View } from 'react-native'
import Dropdown from '../Dropdown'
import { Colors } from '../../constants/colors'
import OverviewItem from './OverviewItem'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDashboardData, setDays } from '../../slices/dashboardSlice'
import Spinner from '../shared/Spinner'

function OverviewList() {
	const dispatch = useDispatch()
	// const days = useSelector(state => state.dashboard.days)
	const data = useSelector(state => state.dashboard.data)
	const [days, setDays] = useState(30)
	const isLoading = useSelector(state => state.dashboard.isLoading)

	console.log(data)

	useEffect(() => {
		dispatch(fetchDashboardData())
	}, [])

	function onChangeDays() {
		dispatch(fetchDashboardData(days))
		setDays(days)
	}

	const daysOptions = [
		{ label: 'Last 30 days', value: 30 },
		{ label: 'Last 60 days', value: 60 },
		{ label: 'Last 90 days', value: 90 },
	]
	return (
		<>
        {isLoading && <Spinner />}
			{!isLoading && data && (
				<View style={styles.container}>
					<View>
						<Text style={styles.sectionText}>Overview</Text>
						<Dropdown
							data={daysOptions}
							onChange={onChangeDays}
							placeholder="Select number of days"
							selectedValue={days}
							isEditing={false}
						/>
					</View>

					<OverviewItem
						statName="Bookings"
						statValue={data.bookings}
						statPerc={data.bookingChangePercent}
						color={Colors.pinkLight}
						iconName="calendar-heart"
						iconColor={Colors.pinkDark}
						iconType="MaterialCommunityIcons"
						size={24}
					/>

					<OverviewItem
						statName="check ins"
						statValue={data.checkIns}
						statPerc={data.checkInChangePercent}
						color={Colors.greenLight}
						iconName="bag-suitcase-outline"
						iconColor={Colors.greenDark}
						iconType="MaterialCommunityIcons"
						size={24}
					/>

					<OverviewItem
						statName="occupancy"
						statValue={data.occupancy}
						statPerc={data.occupancyChangePercent}
						color={Colors.orangeLight}
						iconName="stats-chart"
						iconColor={Colors.orangeDark}
						iconType="Ionicons"
						size={24}
					/>
				</View>
			)}
		</>
	)
}

export default OverviewList

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.primary13,
		gap: 20,
		paddingVertical: 20,
		paddingHorizontal: 15,
		borderRadius: 8,
		elevation: 4,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 5,
		shadowOpacity: 0.26,
	},
	sectionText: {
		color: Colors.primary97,
		fontWeight: 'bold',
		letterSpacing: 1,
		marginBottom: 20,
		fontSize: 16,
	},
})
