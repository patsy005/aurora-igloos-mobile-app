import { ScrollView, StyleSheet, Text } from 'react-native'
import ForumCommentListItem from '../../../components/forum/forumComment/ForumCommentListItem'
import { Colors } from '../../../constants/colors'
import { getForumPosts } from '../../../constants/dummy-data'
import ListScreen from '../../screen/ListScreen'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchForumPosts } from '../../../slices/forumSlice'
import Spinner from '../../../components/shared/Spinner'

function ForumCommentsScreen({ route, navigation }) {
	const postId = route.params.postId
	const posts = useSelector(state => state.forum.forumPosts)
	const isLoading = useSelector(state => state.forum.isLoading)
	const dispatch = useDispatch()

	const postComments = posts?.find(post => post.id === postId).forumComment

	useEffect(() => {
		dispatch(fetchForumPosts())
	}, [])

	function addCommentHandler() {
		navigation.navigate('CommentForm', {
			postId: postId,
		})
	}

	function renderPostCommentListItem(itemData) {
		return <ForumCommentListItem comment={itemData.item} posts={posts} />
	}

	return (
		<>
		{isLoading && <Spinner />}
			{!isLoading && (
				<ListScreen
					onAdd={addCommentHandler}
					onRenderListItem={renderPostCommentListItem}
					buttonLabel="Add comment"
					data={postComments}
				/>
			)}
		</>
	)
}

export default ForumCommentsScreen
