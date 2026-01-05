import { useNavigation } from '@react-navigation/native'
import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import ListItemContainer from '../shared/ListItemContainer'
import IconButton from '../IconButton'
import { Colors } from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons'

function ForumListItem({ post }) {
	const navigation = useNavigation()
	const tagsArray = post.tags ? post.tags.split(',').map(tag => tag.trim()) : []

	// Extract employee data from API structure
	const employeeName = post.employee?.person?.name || post.employeeName || 'Unknown'
	const employeeSurname = post.employee?.person?.surname || post.employeeSurname || ''
	const employeePhotoUrl = post.employee?.photoUrl || post.employeePhotoUrl

	function getPostDetaulHandler() {
		navigation.navigate('PostDetails', {
			postId: post.id,
		})
	}

	function onShowPostComments() {
		navigation.navigate('PostComments', {
			postId: post.id,
		})
	}

	// Format date to be more readable
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
		<ListItemContainer>
			<Pressable style={({ pressed }) => pressed && styles.pressed} onPress={getPostDetaulHandler}>
				<View style={styles.container}>
					{/* Header with Author Info */}
					<View style={styles.headerContainer}>
						<View style={styles.authorContainer}>
							<View style={styles.avatarContainer}>
								{employeePhotoUrl ? (
									<Image source={{ uri: `http://10.0.2.2:5212/${employeePhotoUrl}` }} style={styles.avatarImage} />
								) : (
									<Ionicons name="person" size={20} color={Colors.primary97} />
								)}
							</View>
							<View style={styles.authorInfo}>
								<Text style={styles.authorName}>
									{employeeName} {employeeSurname}
								</Text>
								<View style={styles.metaInfo}>
									<Ionicons name="time-outline" size={12} color={Colors.primary67} />
									<Text style={styles.postDate}>{formatDate(post.postDate)}</Text>
								</View>
							</View>
						</View>
						<View style={styles.categoryBadge}>
							<Ionicons name="folder-outline" size={14} color={Colors.primary97} />
							<Text style={styles.categoryText}>{post.category}</Text>
						</View>
					</View>

					{/* Title */}
					<View style={styles.contentContainer}>
						<Text style={styles.postTitle} numberOfLines={2}>
							{post.title}
						</Text>
						<Text style={styles.postContent} numberOfLines={3}>
							{post.postContent}
						</Text>
					</View>

					{/* Tags */}
					{tagsArray.length > 0 && (
						<View style={styles.tagsContainer}>
							{tagsArray.map((tag, index) => (
								<View style={styles.tag} key={`${tag}-${index}`}>
									<Ionicons name="pricetag" size={10} color={Colors.primary37} />
									<Text style={styles.tagText}>{tag}</Text>
								</View>
							))}
						</View>
					)}

					{/* Footer with Comments */}
					<View style={styles.footerContainer}>
						<Pressable style={styles.commentsButton} onPress={onShowPostComments}>
							<Ionicons name="chatbubble-outline" size={18} color={Colors.primary67} />
							<Text style={styles.commentText}>
								{post.forumComment.length} {post.forumComment.length === 1 ? 'comment' : 'comments'}
							</Text>
						</Pressable>
						<Ionicons name="chevron-forward" size={20} color={Colors.primary67} />
					</View>
				</View>
			</Pressable>
		</ListItemContainer>
	)
}

export default ForumListItem

const styles = StyleSheet.create({
	pressed: {
		opacity: 0.7,
	},
	container: {
		gap: 12,
	},
	headerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		marginBottom: 4,
	},
	authorContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		flex: 1,
	},
	avatarContainer: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: Colors.primary19,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 2,
		borderColor: Colors.primary37,
		overflow: 'hidden',
	},
	avatarImage: {
		width: 40,
		height: 40,
		borderRadius: 20,
	},
	authorInfo: {
		flex: 1,
		gap: 4,
	},
	authorName: {
		fontSize: 14,
		fontWeight: '700',
		color: Colors.primary97,
	},
	metaInfo: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	postDate: {
		fontSize: 12,
		color: Colors.primary67,
		fontWeight: '500',
	},
	categoryBadge: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
		backgroundColor: Colors.primary37,
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: Colors.primary67,
	},
	categoryText: {
		fontSize: 11,
		fontWeight: '700',
		color: Colors.primary97,
		textTransform: 'uppercase',
		letterSpacing: 0.5,
	},
	contentContainer: {
		gap: 8,
	},
	postTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: Colors.primary97,
		lineHeight: 24,
	},
	postContent: {
		fontSize: 14,
		color: Colors.primary86,
		lineHeight: 20,
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
	footerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: 12,
		borderTopWidth: 1,
		borderTopColor: Colors.primary19,
	},
	commentsButton: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		paddingVertical: 4,
	},
	commentText: {
		fontSize: 14,
		fontWeight: '600',
		color: Colors.primary67,
	},
})
