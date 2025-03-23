import { ScrollView, StyleSheet, Text } from 'react-native'
import { Colors } from '../../constants/colors'
import ForumDetail from '../../components/forum/ForumDetail'
import { useSelector } from 'react-redux'
import Spinner from '../../components/shared/Spinner'

function ForumDetilScreen({ route }) {
	const postId = route.params.postId
	const posts = useSelector(state => state.forum.forumPosts)
	const post = posts?.find(post => post.id === postId)
	const isLoading = useSelector(state => state.forum.isLoading)

	return (
		<ScrollView style={styles.screen}>
			{isLoading && <Spinner />} 
			{!isLoading && <ForumDetail post={post} />}
		</ScrollView>
	)
}

export default ForumDetilScreen

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.primary6,
		paddingVertical: 20,
		paddingHorizontal: 15,
	},
})
