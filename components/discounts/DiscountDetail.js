import { StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import DetailContainer from '../shared/DetailContainer'
import { Colors } from '../../constants/colors'
import { useDispatch } from 'react-redux'
import { deleteDiscount, fetchDiscounts } from '../../slices/discountsSlice'

function DiscountDetail({ discount }) {
	const navigation = useNavigation()
	const dispatch = useDispatch()

	function onEditDiscount() {
		navigation.navigate('DiscountForm', {
			discountId: discount.id,
		})
	}

	function onDeleteDiscount() {
		dispatch(deleteDiscount(discount.id))
			.unwrap()
			.then(() => navigation.goBack())
			.then(() => dispatch(fetchDiscounts()))
	}

	return (
		<DetailContainer onEdit={onEditDiscount} onDelete={onDeleteDiscount}>
			<View>
				<Text style={styles.discountName}>{discount.name}</Text>
			</View>

			<View>
				<Text style={styles.detailTitle}>Description</Text>
				<Text style={styles.detail}>{discount.description}</Text>
			</View>

			<View style={styles.boxesContainer}>
				<View style={styles.boxContainer}>
					<Text style={[styles.detailTitle, styles.boxTitle]}>Discount</Text>
					<Text style={[styles.detail, styles.boxDetail]}>{discount.discount}% off</Text>
				</View>
			</View>
		</DetailContainer>
	)
}

export default DiscountDetail

const styles = StyleSheet.create({
	discountName: {
		fontSize: 22,
		fontWeight: 'bold',
		color: Colors.primary97,
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
})
