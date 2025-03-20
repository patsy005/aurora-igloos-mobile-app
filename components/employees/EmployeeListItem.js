import { useNavigation } from '@react-navigation/native'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import ListItemContainer from '../shared/ListItemContainer'
import { Colors } from '../../constants/colors'

function EmployeeListItem({ employee }) {
	const navigation = useNavigation()

	function getEmployeeDetailHandler() {
		navigation.navigate('EmployeeDetails', {
			employeeId: employee.id,
		})
	}

	return (
		<ListItemContainer>
			<Pressable
				onPress={() => getEmployeeDetailHandler()}
				style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}>
				<View style={styles.container}>
					<View style={styles.textContainer}>
						<Text style={styles.nameText}>
							{employee.name} {employee.surname}
						</Text>
						<Text style={styles.emailText}>{employee.email}</Text>
					</View>

					<View style={styles.roleContainer}>
						<Text style={styles.roleText}>{employee.role}</Text>
					</View>
				</View>
			</Pressable>
		</ListItemContainer>
	)
}

export default EmployeeListItem

const styles = StyleSheet.create({
	pressable: {
		width: '100%',
	},
	pressed: {
		opacity: 0.75,
	},
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		flex: 1,
	},
	textContainer: {
		flex: 1,
	},
	nameText: {
		color: Colors.white,
		fontSize: 16,
		fontWeight: 'bold',
		letterSpacing: 1,
	},
	emailText: {
		color: Colors.greyLight,
		fontSize: 14,
	},
	roleContainer: {
		flexShrink: 1,
		maxWidth: '50%',
	},
	roleText: {
		textTransform: 'uppercase',
		color: Colors.primary86,
		flexWrap: 'wrap',
		fontWeight: 'lighter',
	},
})
