import { useLayoutEffect } from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import EmployeeForm from '../../components/employees/EmployeeForm'
import { Colors } from '../../constants/colors'

function EmployeeFormScreen({ route, navigation }) {
	const employeeId = route?.params?.employeeId

	const isEditing = !!employeeId

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? 'Edit Employee' : 'Add Employee',
		})
	}, [navigation, isEditing])

	return (
		<GestureHandlerRootView style={styles.screen}>
			<ScrollView contentContainerStyle={{ paddingBottom: 200 }} style={styles.scroll}>
				<EmployeeForm employeeId={employeeId} />
			</ScrollView>
		</GestureHandlerRootView>
	)
}

export default EmployeeFormScreen

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	scroll: {
		backgroundColor: Colors.primary6,
	},
})
