import { Text } from 'react-native'
import { getCustomers } from '../../constants/dummy-data'
import ListScreen from '../screen/ListScreen'
import CustomerListItem from '../../components/customers/CustomerListItem'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchCustomers } from '../../slices/customersSlice'
import { fetchBookings } from '../../slices/bookingsSlice'

function CustomersScreen({ navigation }) {
	const customersData = useSelector(state => state.customers.customers)
	const isLoading = useSelector(state => state.customers.isLoading)
	const isBookingsLoading = useSelector(state => state.bookings.isLoading)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchCustomers())
		dispatch(fetchBookings())
	}, [])

	function onAddCustomer() {
		navigation.navigate('CustomerForm')
	}

	function renderCustomerListItem(itemData) {
		return <CustomerListItem customer={itemData.item} />
	}
	return (
		<>
			{!isLoading && !isBookingsLoading && (
				<ListScreen
					onAdd={onAddCustomer}
					onRenderListItem={renderCustomerListItem}
					buttonLabel="Add customer"
					data={customersData}
				/>
			)}
		</>
	)
}

export default CustomersScreen
