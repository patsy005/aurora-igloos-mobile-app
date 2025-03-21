import { useNavigation } from '@react-navigation/native'
import { Image, StyleSheet, Text, View } from 'react-native'
import DetailContainer from '../../shared/DetailContainer'
import { Colors } from '../../../constants/colors'
import { getForumPosts } from '../../../constants/dummy-data'

function ForumCommentListItem({ comment }) {
	const navigation = useNavigation()
	const post = getForumPosts().find(post => post.id === comment.idPost)

	function getPostCommentDetailHandler() {
		navigation.navigate('CommentDetails', {
			commentId: comment.id,
		})
	}

	function onEditComment() {
		navigation.navigate('CommentForm', {
			commentId: comment.id,
			postId: post.id,
		})
	}

	return (
		<DetailContainer onEdit={onEditComment}>
			<View style={styles.topContainer}>
				<View style={styles.authorContainer}>
					<View style={styles.imageContainer}>
						<Image source={require('../../../assets/images/user.jpg')} style={styles.image} />
					</View>
					<Text style={styles.authorName}>
						{post.employee.name} {post.employee.surname}
					</Text>
				</View>
				<Text style={styles.postDate}>{comment.commentDate}</Text>
			</View>

			<View>
				<Text style={styles.postTitle}>{post.title}</Text>
				<Text style={styles.postCategory}>{post.category.categoryName}</Text>
			</View>

			<View>
				<Text style={styles.header}>Comment</Text>
				<View style={styles.commentContainer}>
					<Text style={styles.commentText}>{comment.comment}</Text>
				</View>
			</View>
		</DetailContainer>
	)
}

export default ForumCommentListItem

const styles = StyleSheet.create({
	postTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		letterSpacing: 1,
		color: Colors.primary97,
	},
	postDate: {
		color: Colors.greyLight,
		fontWeight: 'bold',
		alignSelf: 'flex-start',
	},
	postContent: {
		color: Colors.white,
		fontSize: 15,
	},
	imageContainer: {
		width: 70,
		height: 70,
		borderRadius: 50,
		borderWidth: 1,
		borderColor: Colors.primary67,
		overflow: 'hidden',
	},
	image: {
		width: '100%',
		height: '100%',
		// borderRadius: 50,
		objectFit: 'cover',
		aspectRatio: 1 / 1,
	},
	tagsContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 10,
		marginBottom: 15,
	},
	tag: {
		padding: 7,
		borderWidth: 1,
		borderColor: '#1c8b97',
		borderRadius: 50,
		backgroundColor: Colors.primary97,
	},
	tagText: {
		color: '#1c8b97',
		textTransform: 'uppercase',
		fontSize: 12,
	},
	header: {
		color: Colors.white,
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 8,
	},
	commentContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	commentText: {
		color: Colors.primary67,
		fontSize: 20,
		fontWeight: 'bold',
	},
	authorContainer: {
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
	},
	authorName: {
		color: Colors.white,
		fontSize: 16,
		alignSelf: 'flex-start',
	},
	topContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	postCategory: {
		color: Colors.greyLight,
		fontWeight: 'bold',
	},
})
