import { Text } from 'react-native'
import { getCustomers } from '../../constants/dummy-data'
import ListScreen from '../screen/ListScreen'
import CustomerListItem from '../../components/customers/CustomerListItem'

function CustomersScreen({ navigation }) {
	const customersData = getCustomers()

	function onAddCustomer() {
		navigation.navigate('CustomerForm')
	}

	function renderCustomerListItem(itemData) {
		return <CustomerListItem customer={itemData.item} />
	}
	return (
		<ListScreen
			onAdd={onAddCustomer}
			onRenderListItem={renderCustomerListItem}
			buttonLabel="Add customer"
			data={customersData}
		/>
	)
}

export default CustomersScreen
