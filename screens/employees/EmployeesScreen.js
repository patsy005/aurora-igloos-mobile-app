import { Text } from 'react-native'
import { getEmployees } from '../../constants/dummy-data'
import EmployeeListItem from '../../components/employees/EmployeeListItem'
import ListScreen from '../screen/ListScreen'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchEmployees } from '../../slices/employeesSlice'

function EmployeesScreen({ navigation }) {
	const employeesData = useSelector(state => state.employees.employees)
	const isLoading = useSelector(state => state.employees.isLoading)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchEmployees())
	}, [])

	function onAddEmployee() {
		navigation.navigate('EmployeeForm')
	}

	function renderEmployeeListItem(itemData) {
		return <EmployeeListItem employee={itemData.item} />
	}

	return (
		<>
			{!isLoading && (
				<ListScreen
					onAdd={onAddEmployee}
					onRenderListItem={renderEmployeeListItem}
					buttonLabel="Add employee"
					data={employeesData}
				/>
			)}
		</>
	)
}

export default EmployeesScreen
