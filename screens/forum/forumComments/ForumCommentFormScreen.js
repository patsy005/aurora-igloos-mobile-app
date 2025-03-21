import { useLayoutEffect } from 'react'
import { StyleSheet, Text } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import ForumCommentForm from '../../../components/forum/forumComment/ForumCommentForm'

function ForumCommentFormScreen({ route, navigation }) {
	const postId = route?.params?.postId
	const commentId = route?.params?.commentId

	const isEditing = !!commentId

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? 'Edit comment' : 'Add comment',
		})
	}, [navigation, isEditing])

	return (
        <GestureHandlerRootView style={styles.screen}>
            <ForumCommentForm postId={postId} commentId={commentId} />
        </GestureHandlerRootView>
    )
}

export default ForumCommentFormScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
})