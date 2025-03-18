import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../constants/colors'

function BookingListItem({ booking }) {
	return (
		<View style={styles.container}>
			<Pressable onPress={() => console.log('booking list item pressed')}>
				<View style={styles.itemContainer}>
					<Text style={styles.textShared}>{booking.iglooName}</Text>
					<View>
						<Text style={styles.textShared}>
							{booking.customerName} {booking.customerSurname}
						</Text>
						<Text style={styles.textShared}>{booking.customerEmail}</Text>
					</View>
					<View>
						<Text style={styles.textShared}>
							{booking.checkIn}
						</Text>
						<Text style={styles.textShared}>
							{booking.checkOut}
						</Text>
					</View>
					<View>
						<Text style={styles.textShared}>{booking.amount.toFixed(2)}</Text>
					</View>
				</View>
			</Pressable>
		</View>
	)
}

export default BookingListItem

const styles = StyleSheet.create({
	container: {
		paddingVertical: 8,
		paddingHorizontal: 10,
		backgroundColor: Colors.primary6,
		borderBottomColor: Colors.primary13,
		borderBottomWidth: 1,
	},
    itemContainer: {
        flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
    },
    textShared: {
        color: Colors.white
    },
})
