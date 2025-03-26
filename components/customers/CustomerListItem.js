import { useNavigation } from '@react-navigation/native'
import ListItemContainer from '../shared/ListItemContainer'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../constants/colors'
import { useSelector } from 'react-redux'

function CustomerListItem({ customer }) {
	const bookings = useSelector(state => state.bookings.bookings)
	const navigation = useNavigation()

	const customerBookings = bookings.filter(b => b.idCustomer === customer.id) ?? []

	function getCustomerDetailHandler() {
		navigation.navigate('CustomerDetails', {
			customerId: customer.id,
		})
	}
	return (
		<>
			{customerBookings.length > 0 && (
				<ListItemContainer>
					<Pressable
						onPress={() => getCustomerDetailHandler()}
						style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}>
						<View style={styles.container}>
							<View style={styles.textContainer}>
								<Text style={styles.nameText}>
									{customer.name} {customer.surname}
								</Text>
								<Text style={styles.emailText}>{customer.email}</Text>
							</View>

							<View>
								<Text style={styles.numOfBookingsText}>Number of bookings</Text>
								<Text style={styles.bookingsNumberText}>{customerBookings?.length}</Text>
							</View>
						</View>
					</Pressable>
				</ListItemContainer>
			)}
		</>
	)
}

export default CustomerListItem

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
	numOfBookingsText: {
		color: Colors.greyLight,
		fontSize: 14,
	},
	bookingsNumberText: {
		color: Colors.primary67,
		fontWeight: 'bold',
		fontSize: 18,
		alignSelf: 'flex-end',
	},
})
