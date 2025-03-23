import { useNavigation } from '@react-navigation/native'
import { getForumPosts } from '../../constants/dummy-data'
import DetailContainer from '../shared/DetailContainer'
import { Image, StyleSheet, Text, View } from 'react-native'
import IconButton from '../IconButton'
import { Colors } from '../../constants/colors'

function ForumDetail({ post }) {
	const navigation = useNavigation()
	const tagsArray = post.tags ? post.tags.split(',').map(tag => tag.trim()) : []

	function onEditPost() {
		navigation.navigate('PostForm', {
			postId: post.id,
		})
	}

	function onShowPostComments() {
		navigation.navigate('PostComments', {
			postId: post.id,
		})
	}

	return (
		<DetailContainer onEdit={() => onEditPost()}>
			<View>
				<Text style={styles.postTitle}>{post.title}</Text>
			</View>

			<Text style={styles.postDate}>{post.postDate}</Text>

			<Text style={styles.postContent}>{post.postContent}</Text>

			<View>
				<Text style={styles.header}>Comments</Text>
				<View style={styles.commentContainer}>
					<IconButton
						iconName="comment-dots"
						iconType="FontAwesome6"
						color={Colors.primary67}
						size={24}
						onPress={onShowPostComments}
					/>
					<Text style={styles.commentText}>{post.forumComment.length}</Text>
				</View>
			</View>

			<View style={styles.tagsContainer}>
				<Text style={styles.header}>Tags</Text>
				<View style={styles.tagsContainer}>
					{tagsArray.map(tag => (
						<View style={styles.tag} key={tag}>
							<Text style={styles.tagText}>{tag}</Text>
						</View>
					))}
				</View>
			</View>

			<View>
				<Text style={styles.header}>Author</Text>
				<View style={styles.authorContainer}>
					<View style={styles.imageContainer}>
						<Image source={require('../../assets/images/user.jpg')} style={styles.image} />
					</View>
					<Text style={styles.authorName}>
						{post.employeeName} {post.employeeSurname}
					</Text>
				</View>
			</View>
		</DetailContainer>
	)
}

export default ForumDetail

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
		alignSelf: 'flex-end',
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
	},
})
