import { Image, StyleSheet, Text, View } from 'react-native'
import { getBookings } from '../../constants/dummy-data'
import { Colors } from '../../constants/colors'
import IconButton from '../IconButton'
import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect } from 'react'
import DetailContainer from '../shared/DetailContainer'
import { useSelector } from 'react-redux'

function BookingDetail({ booking }) {
	const navigation = useNavigation()

	function onEditBooking() {
		navigation.navigate('BookingForm', {
			bookingId: booking.id,
		})
	}

	return (
		<DetailContainer onEdit={onEditBooking}>
			<View style={styles.imageContainer}>
				<Image source={require('../../assets/images/igloo_6.jpg')} style={styles.image} />
			</View>

			<View style={styles.iglooNameAndDateContainer}>
				<Text style={styles.iglooName}>{booking.iglooName}</Text>
				<Text style={styles.datesText}>
					{booking.checkIn} - {booking.checkOut}
				</Text>
			</View>

			<View style={styles.detailsContainer}>
				<View>
					<Text style={styles.detailTitle}>Amount</Text>
					<Text style={styles.detail}>${booking.amount.toFixed(2)}</Text>
				</View>

				<View>
					<Text style={styles.detailTitle}>Payment</Text>
					<Text style={styles.detail}>{booking.paymentMethodName}</Text>
				</View>

				<View>
					<Text style={styles.detailTitle}>Created by</Text>
					<Text style={styles.detail}>
						{booking.employeeName} {booking.employeeSurname}
					</Text>
				</View>
			</View>

			<View style={styles.customersContainer}>
				<View style={styles.customerContainer}>
					<Text style={[styles.detailTitle, styles.customerTitleText]}>Name</Text>
					<Text style={[styles.detail, styles.customerDetailText]}>
						{booking.customerName} {booking.customerSurname}
					</Text>
				</View>

				<View style={styles.customerContainer}>
					<Text style={[styles.detailTitle, styles.customerTitleText]}>Email</Text>
					<Text style={[styles.detail, styles.customerDetailText]}>{booking.customerEmail}</Text>
				</View>

				<View style={styles.customerContainer}>
					<Text style={[styles.detailTitle, styles.customerTitleText]}>Phone</Text>
					<Text style={[styles.detail, styles.customerDetailText]}>{booking.customerPhone}</Text>
				</View>
			</View>
		</DetailContainer>
	)
}

export default BookingDetail

const styles = StyleSheet.create({
	imageContainer: {
		borderRadius: 8,
		overflow: 'hidden',
		width: '100%',
		height: 200,
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
		resizeMode: 'center',
	},
	iglooNameAndDateContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 10,
	},
	iglooName: {
		fontSize: 22,
		fontWeight: 'bold',
		color: Colors.primary97,
	},
	datesText: {
		color: Colors.greyLight,
		fontWeight: 'bold',
	},
	detailsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 20,
		alignItems: 'center',
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
		alignSelf: 'flex-end',
	},
	customersContainer: {
		gap: 20,
	},
	customerContainer: {
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
	customerTitleText: {
		fontSize: 15,
	},
	customerDetailText: {
		fontSize: 20,
		alignSelf: 'flex-start',
	},
})
