import { Text } from 'react-native'
import { getEmployees } from '../../constants/dummy-data'
import EmployeeListItem from '../../components/employees/EmployeeListItem'
import ListScreen from '../screen/ListScreen'

function EmployeesScreen({ navigation }) {
	const employeesData = getEmployees()

	function onAddEmployee() {
		navigation.navigate('EmployeeForm')
	}

	function renderEmployeeListItem(itemData) {
		return <EmployeeListItem employee={itemData.item} />
	}

	return (
		<ListScreen
			onAdd={onAddEmployee}
			onRenderListItem={renderEmployeeListItem}
			buttonLabel="Add employee"
			data={employeesData}
		/>
	)
}

export default EmployeesScreen
