import { useLayoutEffect } from 'react'
import { StyleSheet, Text } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import DiscountForm from '../../components/discounts/DiscountForm'
import { useSelector } from 'react-redux'
import Spinner from '../../components/shared/Spinner'

function DiscountFormScreen({ route, navigation }) {
	const discountId = route?.params?.discountId
	const isLoading = useSelector(state => state.discounts.isLoading)

	const isEditing = !!discountId

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? 'Edit discount' : 'Add discount',
		})
	}, [navigation, discountId])

	return (
		<GestureHandlerRootView style={styles.screen}>
			{isLoading && <Spinner />}
			{!isLoading && <DiscountForm discountId={discountId} />}
		</GestureHandlerRootView>
	)
}

export default DiscountFormScreen

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
})
