import { ScrollView, StyleSheet, Text } from 'react-native'
import { Colors } from '../../constants/colors'
import EmployeeDetail from '../../components/employees/EmployeeDetail'
import { useSelector } from 'react-redux'

function EmployeeDetailScreen({ route }) {
	const employeeId = route.params.employeeId
	const employees = useSelector(state => state.employees.employees)
	const employee = employees?.find(employee => employee.id === employeeId)
	const isLoading = useSelector(state => state.employees.isLoading)

	return (
		<ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 100 }}>
			{!isLoading && employee && <EmployeeDetail employeeId={employeeId} employee={employee} />}
		</ScrollView>
	)
}

export default EmployeeDetailScreen

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.primary6,
		paddingVertical: 20,
		paddingHorizontal: 15,
	},
})
