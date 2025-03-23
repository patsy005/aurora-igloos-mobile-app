import { useNavigation } from '@react-navigation/native'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import ListItemContainer from '../shared/ListItemContainer'
import IconButton from '../IconButton'
import { Colors } from '../../constants/colors'

function ForumListItem({ post }) {
	const navigation = useNavigation()
	const tagsArray = post.tags ? post.tags.split(',').map(tag => tag.trim()) : [];

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

	return (
		<ListItemContainer>
			<Pressable onPress={getPostDetaulHandler}>
				<View style={styles.titleContainer}>
					<View>
						<Text style={styles.postTitle}>{post.title}</Text>
						<Text style={styles.postCategory}>{post.category}</Text>
					</View>
					<View>
						<Text style={styles.createdBy}>
							{post.employeeName} {post.employeeSurname}
						</Text>
						<Text style={styles.postDate}>{post.postDate}</Text>
					</View>
				</View>

				<View>
					<Text style={styles.postContanent}>{post.postContent}</Text>
				</View>

				<View style={styles.bottomContainer}>
					<View style={styles.tagsContainer}>
						{tagsArray.map(tag => (
							<View style={styles.tag} key={tag}>
								<Text style={styles.tagText}>{tag}</Text>
							</View>
						))}
					</View>

					<View style={styles.commentsContainer}>
						<IconButton iconName="comment-dots" iconType="FontAwesome6" color={Colors.primary67} size={20} onPress={() => onShowPostComments()} />
						<Text style={styles.commentText}>{post.forumComment.length}</Text>
					</View>
				</View>
			</Pressable>
		</ListItemContainer>
	)
}

export default ForumListItem

const styles = StyleSheet.create({
	textShared: {
		color: Colors.white,
	},
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
		marginBottom: 15,
	},
	postTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: Colors.primary97,
		maxWidth: '80%',
	},
	postDate: {
		color: Colors.greyLight,
		fontWeight: 'bold',
	},
	createdBy: {
		alignSelf: 'flex-end',
		color: Colors.greyLight,
		fontWeight: 'bold',
		fontSize: 15,
	},
	postCategory: {
		color: Colors.greyLight,
		fontWeight: 'bold',
	},
	postContanent: {
		color: Colors.primary97,
		fontSize: 15,
	},
	bottomContainer: {
		// flexDirection: 'row',
		// justifyContent: 'space-between',
		// alignItems: 'center',
		marginTop: 15,
		marginBottom: 15,
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
	commentsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 5,
	},
	commentText: {
		color: Colors.primary67,
		fontSize: 18,
		fontWeight: 'bold',
	},
})
