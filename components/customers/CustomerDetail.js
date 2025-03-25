import { useNavigation } from '@react-navigation/native'
import { getCustomers } from '../../constants/dummy-data'
import { Image, StyleSheet, Text, View } from 'react-native'
import DetailContainer from '../shared/DetailContainer'
import { Colors } from '../../constants/colors'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchBookings } from '../../slices/bookingsSlice'
import { deleteCustomer, getCustomerBooking } from '../../slices/customersSlice'

function CustomerDetail({ customer }) {
	const bookings = useSelector(state => state.bookings.bookings)
	const dispatch = useDispatch()
	const navigation = useNavigation()

	const customerBookings = bookings.filter(b => b.idCustomer === customer.id) ?? []

	function onEditCustomer() {
		navigation.navigate('CustomerForm', {
			customerId: customer.id,
		})
	}

	function onDeleteCustomer(){
		dispatch(deleteCustomer(customer.id))
	}

	return (
		<>
			{customerBookings.length > 0 && (
				<DetailContainer onEdit={onEditCustomer} onDelete={onDeleteCustomer}>
					<View style={styles.imageContainer}>
						<Image source={require('../../assets/images/user.jpg')} style={styles.image} />
					</View>

					<View>
						<Text style={styles.nameText}>
							{customer.name} {customer.surname}
						</Text>
					</View>

					<View>
						<Text style={styles.detailTitle}>email address</Text>
						<Text style={styles.detail}>{customer.email}</Text>
					</View>

					<View style={styles.boxesContainer}>
						<View style={styles.boxContainer}>
							<Text style={[styles.detailTitle, styles.boxTitle]}>phone number</Text>
							<Text style={[styles.detail, styles.boxDetail]}>{customer.phone}</Text>
						</View>

						<View style={styles.boxContainer}>
							<Text style={[styles.detailTitle, styles.boxTitle]}>number of bookings</Text>
							<Text style={[styles.detail, styles.boxDetail]}>{customerBookings.length}</Text>
						</View>

						<View style={styles.boxContainer}>
							<Text style={[styles.detailTitle, styles.boxTitle]}>Address</Text>
							<View style={styles.addressBox}>
								<Text style={[styles.detail, styles.boxDetail]}>
									{customer.street} {customer.streetNumber}
								</Text>
								<Text style={styles.addressText}>{customer.city}</Text>
								<Text style={styles.addressText}>{customer.country}</Text>
							</View>
						</View>
					</View>
				</DetailContainer>
			)}
		</>
	)
}

export default CustomerDetail

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
