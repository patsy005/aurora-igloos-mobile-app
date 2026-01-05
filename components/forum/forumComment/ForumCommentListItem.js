import { useNavigation } from '@react-navigation/native'
import { Image, StyleSheet, Text, View, Alert } from 'react-native'
import DetailContainer from '../../shared/DetailContainer'
import { Colors } from '../../../constants/colors'
import { getForumPosts } from '../../../constants/dummy-data'
import { useDispatch } from 'react-redux'
import { deleteForumComment } from '../../../slices/forumCommentSlice'
import { fetchForumPosts } from '../../../slices/forumPostsSlice'
import { Ionicons } from '@expo/vector-icons'

function ForumCommentListItem({ comment, posts }) {
	const navigation = useNavigation()
	const post = posts?.find(post => post.id === comment.idPost)
	const dispatch = useDispatch()

	// Extract employee data from post
	const employeeName = post?.employee?.person?.name || post?.employeeName || 'Unknown'
	const employeeSurname = post?.employee?.person?.surname || post?.employeeSurname || ''
	const employeePhotoUrl = post?.employee?.photoUrl || post?.employeePhotoUrl

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

	async function onDeleteComment() {
		try {
			await dispatch(deleteForumComment(comment.id)).unwrap?.()
			await dispatch(fetchForumPosts())
			Alert.alert('Success', 'Comment deleted successfully', [{ text: 'OK' }])
			navigation.goBack()
		} catch (e) {
			console.log('Delete error:', e)
			Alert.alert('Error', 'Failed to delete comment')
		}
	}

	// Format date
	const formatDate = dateString => {
		const date = new Date(dateString)
		const now = new Date()
		const diffTime = Math.abs(now - date)
		const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

		if (diffDays === 0) return 'Today'
		if (diffDays === 1) return 'Yesterday'
		if (diffDays < 7) return `${diffDays} days ago`
		if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
		if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
		return dateString
	}

	return (
		<DetailContainer onEdit={onEditComment} onDelete={onDeleteComment}>
			{/* Author Header */}
			<View style={styles.headerSection}>
				<View style={styles.authorContainer}>
					<View style={styles.avatarContainer}>
						{employeePhotoUrl ? (
							<Image source={{ uri: `http://10.0.2.2:5212/${employeePhotoUrl}` }} style={styles.avatarImage} />
						) : (
							<Ionicons name="person" size={28} color={Colors.primary97} />
						)}
					</View>
					<View style={styles.authorInfo}>
						<Text style={styles.authorName}>
							{employeeName} {employeeSurname}
						</Text>
						<View style={styles.metaInfo}>
							<Ionicons name="time-outline" size={12} color={Colors.primary67} />
							<Text style={styles.dateText}>{formatDate(comment.commentDate)}</Text>
						</View>
					</View>
				</View>
			</View>

			{/* Post Reference */}
			<View style={styles.postReferenceSection}>
				<View style={styles.postReferenceHeader}>
					<Ionicons name="chatbox-ellipses-outline" size={18} color={Colors.primary67} />
					<Text style={styles.postReferenceLabel}>Comment on post</Text>
				</View>
				<View style={styles.postReferenceContent}>
					<Text style={styles.postTitle} numberOfLines={1}>
						{post?.title}
					</Text>
					<View style={styles.categoryBadge}>
						<Ionicons name="folder-outline" size={12} color={Colors.primary97} />
						<Text style={styles.categoryText}>{post?.category}</Text>
					</View>
				</View>
			</View>

			{/* Comment Content */}
			<View style={styles.commentSection}>
				<View style={styles.commentHeader}>
					<Ionicons name="chatbubble-outline" size={18} color={Colors.primary67} />
					<Text style={styles.commentHeaderText}>Comment</Text>
				</View>
				<View style={styles.commentContentContainer}>
					<Text style={styles.commentText}>{comment.comment}</Text>
				</View>
			</View>
		</DetailContainer>
	)
}

export default ForumCommentListItem

const styles = StyleSheet.create({
	headerSection: {
		marginBottom: 20,
		paddingBottom: 16,
		borderBottomWidth: 1,
		borderBottomColor: Colors.primary19,
	},
	authorContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	avatarContainer: {
		width: 56,
		height: 56,
		borderRadius: 28,
		backgroundColor: Colors.primary19,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 2,
		borderColor: Colors.primary37,
		overflow: 'hidden',
	},
	avatarImage: {
		width: 56,
		height: 56,
		borderRadius: 28,
	},
	authorInfo: {
		flex: 1,
		gap: 6,
	},
	authorName: {
		fontSize: 16,
		fontWeight: '700',
		color: Colors.primary97,
		letterSpacing: 0.3,
	},
	metaInfo: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	dateText: {
		fontSize: 13,
		color: Colors.primary67,
		fontWeight: '500',
	},
	postReferenceSection: {
		marginBottom: 20,
		padding: 16,
		backgroundColor: Colors.primary19,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: Colors.primary37,
		gap: 12,
	},
	postReferenceHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	postReferenceLabel: {
		fontSize: 12,
		fontWeight: '600',
		color: Colors.primary67,
		textTransform: 'uppercase',
		letterSpacing: 0.5,
	},
	postReferenceContent: {
		gap: 8,
	},
	postTitle: {
		fontSize: 16,
		fontWeight: '700',
		color: Colors.primary97,
		lineHeight: 22,
	},
	categoryBadge: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		backgroundColor: Colors.primary37,
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 12,
		alignSelf: 'flex-start',
	},
	categoryText: {
		fontSize: 11,
		fontWeight: '700',
		color: Colors.primary97,
		textTransform: 'uppercase',
		letterSpacing: 0.5,
	},
	commentSection: {
		gap: 12,
	},
	commentHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	commentHeaderText: {
		fontSize: 14,
		fontWeight: '700',
		color: Colors.primary86,
		textTransform: 'uppercase',
		letterSpacing: 0.5,
	},
	commentContentContainer: {
		backgroundColor: Colors.primary6,
		padding: 16,
		borderRadius: 12,
		borderLeftWidth: 3,
		borderLeftColor: Colors.primary37,
	},
	commentText: {
		fontSize: 15,
		color: Colors.primary97,
		lineHeight: 22,
	},
})
