import { Text } from 'react-native'
import { getForumPosts } from '../../constants/dummy-data'
import ListScreen from '../screen/ListScreen'
import ForumListItem from '../../components/forum/ForumListItem'
import { useDispatch, useSelector } from 'react-redux'
import { fetchForumPosts } from '../../slices/forumSlice'
import { useEffect } from 'react'
import Spinner from '../../components/shared/Spinner'

function ForumScreen({ navigation }) {
	const posts = useSelector(state => state.forum.forumPosts)
	const isLoading = useSelector(state => state.forum.isLoading)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchForumPosts())
	}, [dispatch])

	function addPostHandler() {
		navigation.navigate('PostForm')
	}

	function renderPostListItem(itemData) {
		return <ForumListItem post={itemData.item} />
	}

	return (
		<>
			{isLoading && <Spinner />}
			{!isLoading && (
				<ListScreen
					onAdd={addPostHandler}
					onRenderListItem={renderPostListItem}
					buttonLabel="Add post"
					data={posts}
					extraData={posts}
				/>
			)}
		</>
	)
}

export default ForumScreen
