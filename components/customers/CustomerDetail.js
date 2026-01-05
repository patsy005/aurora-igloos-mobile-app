import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native'
import DetailContainer from '../shared/DetailContainer'
import { Colors } from '../../constants/colors'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCustomer, fetchCustomers } from '../../slices/customersSlice'
import { Ionicons } from '@expo/vector-icons'

function CustomerDetail({ customer }) {
	const bookings = useSelector(state => state.bookings.bookings)
	const dispatch = useDispatch()
	const navigation = useNavigation()

	if (!customer) return null
	const customerBookings = bookings.filter(b => b.idCustomer === customer.id) ?? []

	function onEditCustomer() {
		navigation.navigate('CustomerForm', {
			customerId: customer.id,
		})
	}

	function onDeleteCustomer() {
		dispatch(deleteCustomer(customer.id))
			.then(() => dispatch(fetchCustomers()))
			.then(() => {
				if (navigation.canGoBack()) navigation.goBack()
				else navigation.navigate('DrawerNavigation', { screen: 'Customers' })
			})
	}

	function renderBookingItem({ item: booking }) {
		return (
			<View style={styles.bookingCard}>
				<View style={styles.bookingHeader}>
					<View style={styles.iglooIconContainer}>
						<Ionicons name="home" size={20} color={Colors.primary97} />
					</View>
					<View style={styles.bookingInfo}>
						<Text style={styles.iglooName}>{booking.iglooName}</Text>
						<Text style={styles.bookingDates}>
							{booking.checkIn} - {booking.checkOut}
						</Text>
					</View>
				</View>
			</View>
		)
	}

	return (
		<DetailContainer onEdit={onEditCustomer} onDelete={onDeleteCustomer}>
			{/* Header with Avatar and Basic Info */}
			<View style={styles.headerSection}>
				<View style={styles.avatarContainer}>
					<Ionicons name="person" size={48} color={Colors.primary97} />
				</View>
				<Text style={styles.nameText}>
					{customer.name} {customer.surname}
				</Text>
				<Text style={styles.emailText}>{customer.email}</Text>
			</View>

			{/* Quick Info Cards */}
			<View style={styles.quickInfoSection}>
				<View style={styles.infoCard}>
					<Ionicons name="call" size={20} color={Colors.primary37} />
					<Text style={styles.infoLabel}>Phone</Text>
					<Text style={styles.infoValue}>{customer.phone}</Text>
				</View>

				<View style={styles.infoCard}>
					<Ionicons name="calendar" size={20} color={Colors.primary37} />
					<Text style={styles.infoLabel}>Bookings</Text>
					<Text style={styles.infoValue}>{customerBookings.length}</Text>
				</View>
			</View>

			{/* Address Section */}
			<View style={styles.addressSection}>
				<Text style={styles.sectionTitle}>Address</Text>
				<View style={styles.addressCard}>
					<Ionicons name="location" size={20} color={Colors.primary37} />
					<View style={styles.addressInfo}>
						<Text style={styles.addressText}>
							{customer.street} {customer.streetNumber}
						</Text>
						<Text style={styles.addressText}>{customer.city}</Text>
						<Text style={styles.addressText}>{customer.country}</Text>
					</View>
				</View>
			</View>

			{/* Bookings Section */}
			<View style={styles.bookingsSection}>
				<Text style={styles.sectionTitle}>Recent Bookings</Text>
				<FlatList
					data={customerBookings.slice(0, 5)}
					renderItem={renderBookingItem}
					keyExtractor={item => item.id.toString()}
					scrollEnabled={false}
					showsVerticalScrollIndicator={false}
				/>
			</View>
		</DetailContainer>
	)
}

export default CustomerDetail

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
		fontSize: 18,
		fontWeight: 'bold',
		color: Colors.primary97,
	},
	addressSection: {
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
	bookingsSection: {
		marginBottom: 16,
	},
	bookingCard: {
		backgroundColor: Colors.boxBg,
		borderRadius: 12,
		marginBottom: 12,
		borderWidth: 1,
		borderColor: Colors.primary19,
		overflow: 'hidden',
	},
	bookingHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 16,
	},
	iglooIconContainer: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: Colors.primary19,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 12,
	},
	bookingInfo: {
		flex: 1,
	},
	iglooName: {
		fontSize: 16,
		fontWeight: '600',
		color: Colors.primary97,
		marginBottom: 4,
	},
	bookingDates: {
		fontSize: 14,
		color: Colors.primary86,
	},
})
