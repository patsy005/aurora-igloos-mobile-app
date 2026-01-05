import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Colors } from '../../constants/colors'
import OverviewList from '../../components/home/OverviewList'
import { fetchMe, selectUser } from '../../slices/authSlice'
import { fetchDashboardStats, fetchDashboardSales } from '../../slices/dashboardSlice'
import Spinner from '../../components/shared/Spinner'
import HomePopularIgloos from '../../components/home/HomePopularIgloos'
import HomePopularTrips from '../../components/home/HomePopularTrips'
import SalesSection from '../../components/home/SalesSection'
import { fetchIgloos } from '../../slices/igloosSlice'
import { fetchTrips } from '../../slices/tripsSlice'
import { fetchBookings } from '../../slices/bookingsSlice'

function HomeScreen() {
	const dispatch = useDispatch()
	const user = useSelector(selectUser)
	const token = useSelector(state => state.auth.accessToken)
	const isLoadingStats = useSelector(state => state.dashboard.isLoadingStats)
	const hasStats = useSelector(state => state.dashboard.stats != null)
	const igloos = useSelector(state => state.igloos.igloos)
	const bookings = useSelector(state => state.bookings.bookings)
	const trips = useSelector(state => state.trips.trips)

	// Sales data
	const sales = useSelector(state => state.dashboard.sales)
	const salesMonths = useSelector(state => state.dashboard.salesMonths)
	const isLoadingSales = useSelector(state => state.dashboard.isLoadingSales)
	const salesError = useSelector(state => state.dashboard.salesError)

	useEffect(() => {
		if (token) dispatch(fetchMe())
	}, [token, dispatch])

	useEffect(() => {
		dispatch(fetchDashboardStats({ days: 30 }))
		dispatch(fetchDashboardSales({ months: 12 }))
		dispatch(fetchIgloos())
		dispatch(fetchTrips())
		dispatch(fetchBookings())
	}, [dispatch])

	console.log(trips)

	const showSpinner = isLoadingStats && !hasStats

	if (showSpinner) return <Spinner />

	const userName = user?.person?.name || user?.name || 'User'
	const userSurname = user?.person?.surname || user?.surname || ''

	const handleRefreshSales = months => {
		dispatch(fetchDashboardSales({ months }))
	}

	return (
		<ScrollView style={styles.screen} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
			{/* Welcome Box */}
			<View style={styles.welcomeBox}>
				<View style={styles.header}>
					<Ionicons name="home" size={24} color={Colors.primary37} />
					<Text style={styles.headerTitle}>Dashboard</Text>
				</View>
				<View style={styles.welcomeContent}>
					<Text style={styles.welcomeLabel}>Welcome back,</Text>
					<Text style={styles.userName}>
						{userName} {userSurname}!
					</Text>
				</View>
			</View>
			<OverviewList />
			<HomePopularIgloos igloos={igloos} bookings={bookings} /> <HomePopularTrips trips={trips} bookings={bookings} />{' '}
			<SalesSection
				months={salesMonths}
				sales={sales}
				isLoading={isLoadingSales}
				error={salesError}
				onRefresh={handleRefreshSales}
			/>
		</ScrollView>
	)
}

export default HomeScreen

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.primary6,
	},
	scrollContent: {
		paddingVertical: 20,
		paddingHorizontal: 15,
		paddingBottom: 40,
		gap: 20,
	},
	welcomeBox: {
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
		alignItems: 'center',
		backgroundColor: Colors.primary19,
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: Colors.primary37,
		gap: 8,
	},
	headerTitle: {
		fontSize: 16,
		fontWeight: '600',
		color: Colors.primary97,
		textTransform: 'uppercase',
		letterSpacing: 0.5,
	},
	welcomeContent: {
		padding: 20,
		gap: 4,
	},
	welcomeLabel: {
		fontSize: 14,
		color: Colors.primary67,
	},
	userName: {
		fontSize: 24,
		fontWeight: 'bold',
		color: Colors.primary97,
	},
})
