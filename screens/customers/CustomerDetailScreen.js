import { ScrollView, StyleSheet, Text } from 'react-native'
import CustomerDetail from '../../components/customers/CustomerDetail'
import { Colors } from '../../constants/colors'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchBookings } from '../../slices/bookingsSlice'

function CustomerDetailScreen({ route }) {
	const customerId = route.params.customerId
	const customers = useSelector(state => state.customers.customers)
	const customer = customers?.find(customer => customer.id === customerId)
	const isLoading = useSelector(state => state.customers.isLoading)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchBookings())
	}, [])

	return (
		<ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 100 }}>
			{!isLoading && <CustomerDetail customer={customer} />}
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
