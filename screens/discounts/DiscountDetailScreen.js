import { ScrollView, StyleSheet, Text } from 'react-native'
import { Colors } from '../../constants/colors'
import DiscountDetail from '../../components/discounts/DiscountDetail'

function DiscountDetailScreen({ route }) {
	const discountId = route.params.discountId

	return (
		<ScrollView style={styles.screen}>
			<DiscountDetail discountId={discountId} />
		</ScrollView>
	)
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
