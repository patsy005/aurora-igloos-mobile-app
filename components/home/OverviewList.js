import { StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../constants/colors'
import OverviewItem from './OverviewItem'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDashboardStats } from '../../slices/dashboardSlice'
import Spinner from '../shared/Spinner'

function OverviewList() {
	const dispatch = useDispatch()
	const stats = useSelector(state => state.dashboard.stats)
	const isLoadingStats = useSelector(state => state.dashboard.isLoadingStats)

	useEffect(() => {
		dispatch(fetchDashboardStats({ days: 14 }))
	}, [dispatch])

	return (
		<View style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				<View style={styles.headerLeft}>
					<Ionicons name="stats-chart" size={20} color={Colors.primary37} />
					<Text style={styles.headerTitle}>Overview</Text>
				</View>
				<Text style={styles.periodText}>Statistics from last 14 days</Text>
			</View>

			{/* Stats Cards */}
			{isLoadingStats ? (
				<Spinner />
			) : (
				<View style={styles.statsContainer}>
					<OverviewItem
						statName="Bookings"
						statValue={stats?.bookings ?? 0}
						statPerc={stats?.bookingChangePercent ?? 0}
						iconName="calendar"
						iconType="Ionicons"
					/>

					<OverviewItem
						statName="Check-ins"
						statValue={stats?.checkIns ?? 0}
						statPerc={stats?.checkInChangePercent ?? 0}
						iconName="log-in"
						iconType="Ionicons"
					/>

					<OverviewItem
						statName="Occupancy"
						statValue={`${stats?.occupancy ?? 0}%`}
						statPerc={stats?.occupancyChangePercent ?? 0}
						iconName="business"
						iconType="Ionicons"
					/>
				</View>
			)}
		</View>
	)
}

export default OverviewList

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.boxBg,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: Colors.primary19,
		overflow: 'hidden',
		shadowColor: Colors.primary67,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 4,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: Colors.primary19,
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: Colors.primary37,
	},
	headerLeft: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		flex: 1,
	},
	headerTitle: {
		fontSize: 16,
		fontWeight: '600',
		color: Colors.primary97,
		textTransform: 'uppercase',
		letterSpacing: 0.5,
	},
	periodText: {
		fontSize: 13,
		color: Colors.primary67,
		fontStyle: 'italic',
	},
	statsContainer: {
		padding: 16,
		gap: 12,
	},
})
