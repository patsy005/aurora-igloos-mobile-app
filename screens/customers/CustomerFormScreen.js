import { useLayoutEffect } from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { Colors } from '../../constants/colors'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import CustomerForm from '../../components/customers/CustomerForm'
import { useSelector } from 'react-redux'

function CustomerFormScreen({ route, navigation }) {
	const customerId = route?.params?.customerId
	const isLoading = useSelector(state => state.customers.isLoading)

	const isEditing = !!customerId

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? 'Edit Customer' : 'Add Customer',
		})
	}, [navigation, isEditing])

	return (
		<GestureHandlerRootView style={styles.screen}>
			<ScrollView contentContainerStyle={{ paddingBottom: 200 }} style={styles.scroll}>
				{!isLoading && <CustomerForm customerId={customerId} />}
			</ScrollView>
		</GestureHandlerRootView>
	)
}

export default CustomerFormScreen

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	scroll: {
		backgroundColor: Colors.primary6,
	},
})
