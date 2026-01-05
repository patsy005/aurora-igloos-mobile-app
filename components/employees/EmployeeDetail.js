import { Image, StyleSheet, Text, View, ScrollView, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import DetailContainer from '../shared/DetailContainer'
import { Colors } from '../../constants/colors'
import { deleteEmployee, fetchEmployees } from '../../slices/employeesSlice'
import { useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'

function EmployeeDetail({ employee }) {
	const navigation = useNavigation()
	const dispatch = useDispatch()

	// Guard clause - if employee is undefined, return null
	if (!employee) {
		return null
	}

	function onEditEmployee() {
		navigation.navigate('EmployeeForm', {
			employeeId: employee.id,
		})
	}

	async function onDeleteEmployee() {
		try {
			await dispatch(deleteEmployee(employee.id)).unwrap?.()
			await dispatch(fetchEmployees())
			Alert.alert('Success', 'Employee deleted successfully', [{ text: 'OK' }])
			navigation.goBack()
		} catch (e) {
			console.log('Delete error:', e)
			Alert.alert('Error', 'Failed to delete employee')
		}
	}

	return (
		<DetailContainer onEdit={onEditEmployee} onDelete={onDeleteEmployee}>
			{/* Header with Avatar and Basic Info */}
			<View style={styles.headerSection}>
				<View style={styles.avatarContainer}>
					{employee.photoUrl ? (
						<Image source={{ uri: `http://10.0.2.2:5212/${employee.photoUrl}` }} style={styles.avatarImage} />
					) : (
						<Ionicons name="person" size={48} color={Colors.primary97} />
					)}
				</View>
				<Text style={styles.nameText}>
					{employee.name} {employee.surname}
				</Text>
				<Text style={styles.emailText}>{employee.email}</Text>
				<View style={styles.roleBadge}>
					<Text style={styles.roleText}>{employee.role}</Text>
				</View>
			</View>

			{/*  Info Cards */}
			<View style={styles.quickInfoSection}>
				<View style={styles.infoCard}>
					<Ionicons name="call" size={20} color={Colors.primary37} />
					<Text style={styles.infoLabel}>Phone</Text>
					<Text style={styles.infoValue}>{employee.phoneNumber}</Text>
				</View>

				<View style={styles.infoCard}>
					<Ionicons name="briefcase" size={20} color={Colors.primary37} />
					<Text style={styles.infoLabel}>Position</Text>
					<Text style={styles.infoValue}>{employee.role}</Text>
				</View>
			</View>

			{/* Login Information */}
			{employee.login && (
				<View style={styles.loginSection}>
					<Text style={styles.sectionTitle}>Account Information</Text>
					<View style={styles.loginCard}>
						<Ionicons name="person-circle" size={20} color={Colors.primary37} />
						<View style={styles.loginInfo}>
							<Text style={styles.loginLabel}>Login</Text>
							<Text style={styles.loginValue}>{employee.login}</Text>
						</View>
					</View>
				</View>
			)}

			{/* Address Section */}
			<View style={styles.addressSection}>
				<Text style={styles.sectionTitle}>Address</Text>
				<View style={styles.addressCard}>
					<Ionicons name="location" size={20} color={Colors.primary37} />
					<View style={styles.addressInfo}>
						<Text style={styles.addressText}>
							{employee.street} {employee.streetNumber}
						</Text>
						<Text style={styles.addressText}>{employee.city}</Text>
						<Text style={styles.addressText}>{employee.country}</Text>
						<Text style={styles.addressText}>{employee.postalCode}</Text>
					</View>
				</View>
			</View>
		</DetailContainer>
	)
}

export default EmployeeDetail

const styles = StyleSheet.create({
	headerSection: {
		alignItems: 'center',
		marginBottom: 24,
		paddingBottom: 20,
		borderBottomWidth: 1,
		borderBottomColor: Colors.primary19,
	},
	avatarContainer: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: Colors.primary19,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 16,
		shadowColor: Colors.primary67,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 6,
		overflow: 'hidden',
	},
	avatarImage: {
		width: 80,
		height: 80,
		borderRadius: 40,
	},
	nameText: {
		fontSize: 24,
		fontWeight: 'bold',
		color: Colors.primary97,
		marginBottom: 8,
		textAlign: 'center',
	},
	emailText: {
		fontSize: 16,
		color: Colors.primary86,
		textAlign: 'center',
		marginBottom: 12,
	},
	roleBadge: {
		backgroundColor: Colors.primary37,
		borderRadius: 16,
		paddingHorizontal: 16,
		paddingVertical: 6,
	},
	roleText: {
		fontSize: 13,
		fontWeight: '600',
		color: Colors.primary97,
		textTransform: 'uppercase',
		letterSpacing: 0.5,
	},
	quickInfoSection: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 24,
		gap: 12,
	},
	infoCard: {
		flex: 1,
		backgroundColor: Colors.boxBg,
		borderRadius: 12,
		padding: 16,
		alignItems: 'center',
		borderWidth: 1,
		borderColor: Colors.primary19,
	},
	infoLabel: {
		fontSize: 12,
		color: Colors.greyLight,
		textTransform: 'uppercase',
		marginTop: 8,
		marginBottom: 4,
	},
	infoValue: {
		fontSize: 14,
		fontWeight: 'bold',
		color: Colors.primary97,
		textAlign: 'center',
	},
	loginSection: {
		marginBottom: 24,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: '600',
		color: Colors.primary97,
		marginBottom: 12,
		textTransform: 'uppercase',
		letterSpacing: 0.5,
	},
	loginCard: {
		flexDirection: 'row',
		backgroundColor: Colors.boxBg,
		borderRadius: 12,
		padding: 16,
		borderWidth: 1,
		borderColor: Colors.primary19,
		alignItems: 'center',
	},
	loginInfo: {
		marginLeft: 12,
		flex: 1,
	},
	loginLabel: {
		fontSize: 12,
		color: Colors.greyLight,
		textTransform: 'uppercase',
		marginBottom: 4,
	},
	loginValue: {
		fontSize: 16,
		fontWeight: '600',
		color: Colors.primary97,
	},
	addressSection: {
		marginBottom: 24,
	},
	addressCard: {
		flexDirection: 'row',
		backgroundColor: Colors.boxBg,
		borderRadius: 12,
		padding: 16,
		borderWidth: 1,
		borderColor: Colors.primary19,
		alignItems: 'flex-start',
	},
	addressInfo: {
		marginLeft: 12,
		flex: 1,
	},
	addressText: {
		fontSize: 14,
		color: Colors.primary86,
		marginBottom: 4,
	},
})
