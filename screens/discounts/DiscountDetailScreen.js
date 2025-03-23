import { ScrollView, StyleSheet, Text } from 'react-native'
import { Colors } from '../../constants/colors'
import DiscountDetail from '../../components/discounts/DiscountDetail'
import { useSelector } from 'react-redux'

function DiscountDetailScreen({ route }) {
	const discountId = route.params.discountId
	const discounts = useSelector(state => state.discounts.discounts)
	const discount = discounts?.find(discount => discount.id === discountId)
	const isLoading = useSelector(state => state.discounts.isLoading)

	return <ScrollView style={styles.screen}>{!isLoading && <DiscountDetail discount={discount} />}</ScrollView>
}

export default DiscountDetailScreen

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.primary6,
		paddingVertical: 20,
		paddingHorizontal: 15,
	},
})
