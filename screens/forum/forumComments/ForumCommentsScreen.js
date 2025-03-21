import { ScrollView, StyleSheet, Text } from 'react-native'
import ForumCommentListItem from '../../../components/forum/forumComment/ForumCommentListItem'
import { Colors } from '../../../constants/colors'
import { getForumPosts } from '../../../constants/dummy-data'
import ListScreen from '../../screen/ListScreen'

function ForumCommentsScreen({ route, navigation }) {
	const postId = route.params.postId

	const postComments = getForumPosts().find(post => post.id === postId).comments

	function addCommentHandler() {
		navigation.navigate('CommentForm', {
			postId: postId,
		})
	}

	function renderPostCommentListItem(itemData) {
		return <ForumCommentListItem comment={itemData.item} />
	}

	return (
		<ListScreen
			onAdd={addCommentHandler}
			onRenderListItem={renderPostCommentListItem}
			buttonLabel="Add comment"
			data={postComments}
		/>
	)
}

export default ForumCommentsScreen
