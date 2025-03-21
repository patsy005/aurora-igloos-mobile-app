import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect } from 'react'
import { StyleSheet, Text } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import ForumForm from '../../components/forum/ForumForm'

function ForumFormScreen({route, navigation}) {
	const postId = route?.params?.postId

	const isEditing = !!postId

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? 'Edit post' : 'Add post',
		})
	}
	, [navigation, isEditing])

	return (
		<GestureHandlerRootView style={styles.screen}>
			<ForumForm postId={postId} />
		</GestureHandlerRootView>
	)
}

export default ForumFormScreen

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
})
