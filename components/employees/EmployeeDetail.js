import { Image, StyleSheet, Text, View } from 'react-native'
import { getEmployees } from '../../constants/dummy-data'
import { useNavigation } from '@react-navigation/native'
import DetailContainer from '../shared/DetailContainer'
import { Colors } from '../../constants/colors'

function EmployeeDetail({ employee }) {
	const navigation = useNavigation()

	function onEditEmployee() {
        navigation.navigate('EmployeeForm', {
            employeeId: employee.id,
        })
    }

	return (
		<DetailContainer onEdit={onEditEmployee}>
			<View style={styles.imageContainer}>
				<Image source={require('../../assets/images/user.jpg')} style={styles.image} />
			</View>

			<View>
				<Text style={styles.nameText}>
					{employee.name} {employee.surname}
				</Text>
			</View>

			<View>
				<Text style={styles.detailTitle}>emaill address</Text>
				<Text style={styles.detail}>{employee.email}</Text>
			</View>

			<View style={styles.boxesContainer}>
				<View style={styles.boxContainer}>
					<Text style={[styles.detailTitle, styles.boxTitle]}>phone number</Text>
					<Text style={[styles.detail, styles.boxDetail]}>{employee.phoneNumber}</Text>
				</View>

				<View style={styles.boxContainer}>
					<Text style={[styles.detailTitle, styles.boxTitle]}>position</Text>
					<Text style={[styles.detail, styles.boxDetail]}>{employee.role}</Text>
				</View>

				<View style={styles.boxContainer}>
					<Text style={[styles.detailTitle, styles.boxTitle]}>Address</Text>
					<View style={styles.addressBox}>
						<Text style={[styles.detail, styles.boxDetail]}>
							{employee.street} {employee.streetNumber}
						</Text>
						<Text style={styles.addressText}>{employee.city}</Text>
						<Text style={styles.addressText}>{employee.country}</Text>
					</View>
				</View>
			</View>
		</DetailContainer>
	)
}

export default EmployeeDetail

const styles = StyleSheet.create({
	imageContainer: {
		borderRadius: 8,
		overflow: 'hidden',
		width: '100%',
		height: 300,
		elevation: 4,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 5,
		shadowOpacity: 0.26,
	},
	image: {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
		resizeMode: 'contain',
		// aspectRatio: 16/9,
	},
	nameText: {
		fontSize: 22,
		fontWeight: 'bold',
		color: Colors.primary97,
		letterSpacing: 1,
	},
	detailTitle: {
		textTransform: 'uppercase',
		fontWeight: 'light',
		fontSize: 18,
		color: Colors.greyLight,
	},
	detail: {
		fontWeight: 'bold',
		color: Colors.primary67,
		alignSelf: 'flex-start',
	},
	boxesContainer: {
		gap: 20,
	},
	boxContainer: {
		backgroundColor: Colors.primary6,
		borderRadius: 6,
		padding: 7,
		gap: 10,
		elevation: 4,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 5,
		shadowOpacity: 0.26,
	},
	boxTitle: {
		fontSize: 15,
	},
	boxDetail: {
		fontSize: 20,
		alignSelf: 'flex-start',
	},
	addressBox: {
		// flexDirection: 'row',
	},
	addressText: {
		color: Colors.greyLight,
	},
})
