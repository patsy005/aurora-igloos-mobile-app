import { useNavigation } from '@react-navigation/native'
import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import ListItemContainer from '../shared/ListItemContainer'
import { Colors } from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons'

function EmployeeListItem({ employee }) {
	const navigation = useNavigation()

	function getEmployeeDetailHandler() {
		navigation.navigate('EmployeeDetails', {
			employeeId: employee.id,
		})
	}

	return (
		<ListItemContainer>
			<Pressable style={({ pressed }) => pressed && styles.pressed} onPress={getEmployeeDetailHandler}>
				<View style={styles.container}>
					<View style={styles.leftContainer}>
						<View style={styles.avatarContainer}>
							{employee.photoUrl ? (
								<Image source={{ uri: `http://10.0.2.2:5212/${employee.photoUrl}` }} style={styles.avatarImage} />
							) : (
								<Ionicons name="person" size={24} color={Colors.primary97} />
							)}
						</View>
						<View style={styles.textContainer}>
							<Text style={styles.nameText}>
								{employee.name} {employee.surname}
							</Text>
							<Text style={styles.emailText}>{employee.email}</Text>
							<Text style={styles.phoneText}>{employee.phoneNumber}</Text>
						</View>
					</View>

					<View style={styles.rightContainer}>
						<View style={styles.roleBadge}>
							<Text style={styles.roleText}>{employee.role}</Text>
						</View>
						<Ionicons name="chevron-forward" size={20} color={Colors.greyLight} />
					</View>
				</View>
			</Pressable>
		</ListItemContainer>
	)
}

export default EmployeeListItem

const styles = StyleSheet.create({
	pressed: {
		opacity: 0.75,
		transform: [{ scale: 0.98 }],
	},
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 12,
		paddingHorizontal: 4,
	},
	leftContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
	},
	avatarContainer: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: Colors.primary19,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 12,
		overflow: 'hidden',
	},
	avatarImage: {
		width: 48,
		height: 48,
		borderRadius: 24,
	},
	textContainer: {
		flex: 1,
	},
	nameText: {
		fontSize: 16,
		fontWeight: '600',
		color: Colors.primary97,
		marginBottom: 2,
	},
	emailText: {
		fontSize: 14,
		color: Colors.primary86,
		marginBottom: 2,
	},
	phoneText: {
		fontSize: 12,
		color: Colors.greyLight,
	},
	rightContainer: {
		alignItems: 'center',
		marginLeft: 12,
	},
	roleBadge: {
		backgroundColor: Colors.primary37,
		borderRadius: 12,
		paddingHorizontal: 10,
		paddingVertical: 4,
		marginBottom: 8,
	},
	roleText: {
		fontSize: 11,
		fontWeight: '600',
		color: Colors.primary97,
		textTransform: 'uppercase',
		letterSpacing: 0.5,
	},
})
