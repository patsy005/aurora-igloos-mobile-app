import { ScrollView, StyleSheet, Text } from 'react-native'
import { Colors } from '../../constants/colors'
import EmployeeDetail from '../../components/employees/EmployeeDetail'

function EmployeeDetailScreen({ route }) {
	const employeeId = route.params.employeeId

	return (
		<ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 100 }}>
			<EmployeeDetail employeeId={employeeId} />
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
