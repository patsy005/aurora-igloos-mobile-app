import { useNavigation } from '@react-navigation/native'
import { getForumPosts } from '../../constants/dummy-data'
import DetailContainer from '../shared/DetailContainer'
import { Image, StyleSheet, Text, View, Pressable, Alert } from 'react-native'
import IconButton from '../IconButton'
import { Colors } from '../../constants/colors'
import { deleteForumPost, fetchForumPosts } from '../../slices/forumPostsSlice'
import { useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'

function ForumDetail({ post }) {
	const navigation = useNavigation()
	const tagsArray = post.tags ? post.tags.split(',').map(tag => tag.trim()) : []
	const dispatch = useDispatch()

	// Extract employee data from API structure
	const employeeName = post.employee?.person?.name || post.employeeName || 'Unknown'
	const employeeSurname = post.employee?.person?.surname || post.employeeSurname || ''
	const employeePhotoUrl = post.employee?.photoUrl || post.employeePhotoUrl

	function onEditPost() {
		navigation.navigate('PostForm', {
			postId: post.id,
		})
	}

	async function onDeletePost() {
		try {
			await dispatch(deleteForumPost(post.id)).unwrap?.()
			await dispatch(fetchForumPosts())
			Alert.alert('Success', 'Post deleted successfully', [{ text: 'OK' }])
			navigation.goBack()
		} catch (e) {
			console.log('Delete error:', e)
			Alert.alert('Error', 'Failed to delete post')
		}
	}

	function onShowPostComments() {
		navigation.navigate('PostComments', {
			postId: post.id,
		})
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
		<DetailContainer onEdit={() => onEditPost()} onDelete={onDeletePost}>
			{/* Header Section */}
			<View style={styles.headerSection}>
				<View style={styles.categoryBadge}>
					<Ionicons name="folder-outline" size={14} color={Colors.primary97} />
					<Text style={styles.categoryText}>{post.category}</Text>
				</View>
				<Text style={styles.postTitle}>{post.title}</Text>
				<View style={styles.metaInfo}>
					<Ionicons name="time-outline" size={14} color={Colors.primary67} />
					<Text style={styles.postDate}>{formatDate(post.postDate)}</Text>
				</View>
			</View>

			{/* Author Section */}
			<View style={styles.authorSection}>
				<View style={styles.authorContainer}>
					<View style={styles.avatarContainer}>
						{employeePhotoUrl ? (
							<Image source={{ uri: `http://10.0.2.2:5212/${employeePhotoUrl}` }} style={styles.avatarImage} />
						) : (
							<Ionicons name="person" size={24} color={Colors.primary97} />
						)}
					</View>
					<View style={styles.authorInfo}>
						<Text style={styles.authorLabel}>Author</Text>
						<Text style={styles.authorName}>
							{employeeName} {employeeSurname}
						</Text>
					</View>
				</View>
			</View>

			{/* Content Section */}
			<View style={styles.contentSection}>
				<View style={styles.contentHeader}>
					<Ionicons name="document-text-outline" size={18} color={Colors.primary67} />
					<Text style={styles.sectionTitle}>Content</Text>
				</View>
				<View style={styles.contentContainer}>
					<Text style={styles.postContent}>{post.postContent}</Text>
				</View>
			</View>

			{/* Tags Section */}
			{tagsArray.length > 0 && (
				<View style={styles.tagsSection}>
					<View style={styles.tagsHeader}>
						<Ionicons name="pricetags-outline" size={18} color={Colors.primary67} />
						<Text style={styles.sectionTitle}>Tags</Text>
					</View>
					<View style={styles.tagsContainer}>
						{tagsArray.map((tag, index) => (
							<View style={styles.tag} key={`${tag}-${index}`}>
								<Ionicons name="pricetag" size={10} color={Colors.primary67} />
								<Text style={styles.tagText}>{tag}</Text>
							</View>
						))}
					</View>
				</View>
			)}

			{/* Comments Section */}
			<View style={styles.commentsSection}>
				<View style={styles.commentsHeader}>
					<Ionicons name="chatbubbles-outline" size={18} color={Colors.primary67} />
					<Text style={styles.sectionTitle}>Comments</Text>
				</View>
				<Pressable style={styles.commentsButton} onPress={onShowPostComments}>
					<View style={styles.commentsButtonContent}>
						<Ionicons name="chatbubble-outline" size={20} color={Colors.primary97} />
						<Text style={styles.commentsButtonText}>
							View all {post.forumComment.length} {post.forumComment.length === 1 ? 'comment' : 'comments'}
						</Text>
					</View>
					<Ionicons name="chevron-forward" size={20} color={Colors.primary97} />
				</Pressable>
			</View>
		</DetailContainer>
	)
}

export default ForumDetail

const styles = StyleSheet.create({
	headerSection: {
		marginBottom: 24,
		gap: 12,
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
	postTitle: {
		fontSize: 26,
		fontWeight: 'bold',
		color: Colors.primary97,
		lineHeight: 34,
		letterSpacing: 0.5,
	},
	metaInfo: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	postDate: {
		fontSize: 13,
		color: Colors.primary67,
		fontWeight: '500',
	},
	authorSection: {
		marginBottom: 24,
		padding: 16,
		backgroundColor: Colors.primary19,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: Colors.primary37,
	},
	authorContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	avatarContainer: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: Colors.primary6,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 2,
		borderColor: Colors.primary37,
		overflow: 'hidden',
	},
	avatarImage: {
		width: 48,
		height: 48,
		borderRadius: 24,
	},
	authorInfo: {
		flex: 1,
		gap: 4,
	},
	authorLabel: {
		fontSize: 11,
		fontWeight: '600',
		color: Colors.primary67,
		textTransform: 'uppercase',
		letterSpacing: 0.5,
	},
	authorName: {
		fontSize: 15,
		fontWeight: '700',
		color: Colors.primary97,
	},
	contentSection: {
		marginBottom: 24,
		gap: 12,
	},
	contentHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	sectionTitle: {
		fontSize: 14,
		fontWeight: '700',
		color: Colors.primary86,
		textTransform: 'uppercase',
		letterSpacing: 0.5,
	},
	contentContainer: {
		backgroundColor: Colors.primary6,
		padding: 16,
		borderRadius: 12,
		borderLeftWidth: 3,
		borderLeftColor: Colors.primary37,
	},
	postContent: {
		fontSize: 15,
		color: Colors.primary97,
		lineHeight: 24,
	},
	tagsSection: {
		marginBottom: 24,
		gap: 12,
	},
	tagsHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	tagsContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
	},
	tag: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 16,
		backgroundColor: 'rgba(28, 139, 151, 0.2)',
		borderWidth: 1,
		borderColor: Colors.primary67,
	},
	tagText: {
		fontSize: 11,
		fontWeight: '700',
		color: Colors.primary67,
		textTransform: 'lowercase',
	},
	commentsSection: {
		gap: 12,
	},
	commentsHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	commentsButton: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: Colors.primary19,
		padding: 16,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: Colors.primary37,
	},
	commentsButtonContent: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	commentsButtonText: {
		fontSize: 15,
		fontWeight: '700',
		color: Colors.primary97,
	},
})
