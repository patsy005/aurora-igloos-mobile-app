import { useNavigation } from '@react-navigation/native'
import ListItemContainer from '../shared/ListItemContainer'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../constants/colors'
import { useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'

function CustomerListItem({ customer }) {
	const bookings = useSelector(state => state.bookings.bookings) ?? []
	const navigation = useNavigation()

	const customerBookings = (bookings ?? []).filter(b => b.idCustomer === customer.id)

	function getCustomerDetailHandler() {
		navigation.navigate('CustomerDetails', {
			customerId: customer.id,
		})
	}
	return (
		<ListItemContainer>
			<Pressable style={({ pressed }) => pressed && styles.pressed} onPress={getCustomerDetailHandler}>
				<View style={styles.container}>
					<View style={styles.leftContainer}>
						<View style={styles.avatarContainer}>
							<Ionicons name="person" size={24} color={Colors.primary97} />
						</View>
						<View style={styles.textContainer}>
							<Text style={styles.nameText}>
								{customer.name} {customer.surname}
							</Text>
							<Text style={styles.emailText}>{customer.email}</Text>
							<Text style={styles.phoneText}>{customer.phone}</Text>
						</View>
					</View>

					<View style={styles.rightContainer}>
						<View style={styles.badgeContainer}>
							<Text style={styles.badgeText}>{customerBookings?.length || 0}</Text>
						</View>
						<Text style={styles.bookingsLabelText}>bookings</Text>
						<Ionicons name="chevron-forward" size={20} color={Colors.greyLight} />
					</View>
				</View>
			</Pressable>
		</ListItemContainer>
	)
}

export default CustomerListItem

const styles = StyleSheet.create({
	pressed: {
		opacity: 0.75,
		transform: [{ scale: 0.98 }],
	},
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 16,
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
	badgeContainer: {
		backgroundColor: Colors.primary37,
		borderRadius: 12,
		paddingHorizontal: 8,
		paddingVertical: 4,
		minWidth: 32,
		alignItems: 'center',
		marginBottom: 4,
	},
	badgeText: {
		fontSize: 12,
		fontWeight: '700',
		color: Colors.primary97,
	},
	bookingsLabelText: {
		fontSize: 10,
		color: Colors.greyLight,
		marginBottom: 8,
	},
})
