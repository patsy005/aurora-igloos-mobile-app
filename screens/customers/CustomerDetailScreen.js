import { ScrollView, StyleSheet, Text } from 'react-native'
import CustomerDetail from '../../components/customers/CustomerDetail'
import { Colors } from '../../constants/colors'

function CustomerDetailScreen({ route }) {
	const customerId = route.params.customerId
	return (
		<ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 100 }}>
			<CustomerDetail customerId={customerId} />
		</ScrollView>
	)
}

export default CustomerDetailScreen

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.primary6,
		paddingVertical: 20,
		paddingHorizontal: 15,
	},
})
