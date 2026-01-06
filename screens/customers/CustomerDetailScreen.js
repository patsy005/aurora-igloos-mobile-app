import { ScrollView, StyleSheet } from 'react-native'
import CustomerDetail from '../../components/customers/CustomerDetail'
import { Colors } from '../../constants/colors'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo } from 'react'
import { fetchBookings } from '../../slices/bookingsSlice'
import Spinner from '../../components/shared/Spinner'
import { useNavigation } from '@react-navigation/native'

function CustomerDetailScreen({ route }) {
	const navigation = useNavigation()
	const dispatch = useDispatch()

	const customerId = route.params.customerId

	const customers = useSelector(state => state.customers.customers) ?? []
	const isLoading = useSelector(state => state.customers.isFetching)

	const customer = useMemo(() => {
		return customers.find(c => c.id === customerId)
	}, [customers, customerId])

	useEffect(() => {
		dispatch(fetchBookings())
	}, [dispatch])

	// jeśli customer zniknie (np. po delete) -> wyjdź z detail
	useEffect(() => {
		if (!isLoading && !customer) {
			navigation.goBack()
		}
	}, [customer, isLoading, navigation])

	return (
		<ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 100 }}>
			{isLoading && <Spinner />}
			{!isLoading && customer && <CustomerDetail customer={customer} />}
		</ScrollView>
	)
}

export default CustomerDetailScreen

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.primary6,
		paddingVertical: 20,
		paddingHorizontal: 15,
	},
})
