import { useLayoutEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import IglooForm from '../../components/igloos/IglooForm'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

function IglooFormScreen({ route, navigation }) {
	const iglooId = route?.params?.iglooId
	const isLoading = useSelector(state => state.igloos.isLoading)

	const isEditing = !!iglooId

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? 'Edit igloo' : 'Add igloo',
		})
	}, [navigation, iglooId])

	return (
		<GestureHandlerRootView style={styles.screen}>
			{!isLoading && <IglooForm iglooId={iglooId} />}
		</GestureHandlerRootView>
	)
}

export default IglooFormScreen

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
})
