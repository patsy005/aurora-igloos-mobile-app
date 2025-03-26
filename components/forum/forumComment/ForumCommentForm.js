import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, Text, View } from 'react-native'
import { getForumPosts } from '../../../constants/dummy-data'
import FormLabel from '../../form/FormLabel'
import Input from '../../form/Input'
import { Colors } from '../../../constants/colors'
import Button from '../../Button'
import { useDispatch, useSelector } from 'react-redux'
import { addNewComment, editComment } from '../../../slices/forumCommentsSlice'
import { fetchForumPosts } from '../../../slices/forumSlice'

function ForumCommentForm({ postId, commentId }) {
	const posts = useSelector(state => state.forum.forumPosts)
	const {
		handleSubmit,
		register,
		setValue,
		control,
		formState: { errors, isLoading },
	} = useForm()
	const navigation = useNavigation()
	const dispatch = useDispatch()

	const isEditing = !!commentId

	useEffect(() => {
		if (commentId) {
			const post = posts?.find(post => post.id === postId)
			const comment = post.forumComment.find(comment => comment.id === commentId)
			if (comment) {
				setValue('comment', comment.comment)
			}
		}
	}, [postId, commentId])

	function onCancel() {
		navigation.goBack()
	}

	function onSubmit(data) {
		console.log(data)

		const post = posts?.find(post => post.id === postId)

		const newComment = {
			comment: data.comment,
			idPost: postId,
			idEmployee: post.idEmployee,
			commentDate: new Date().toISOString().split('T')[0],
			employeeName: post.employeeName,
			employeeSurname: post.employeeSurname,
			employeePhotoUrl: post.employeePhotoUrl,
			postTitle: post.title,
		}

		if (isEditing) {
			dispatch(editComment({ id: commentId, comment: newComment }))
				.then(() => dispatch(fetchForumPosts()))
				.then(() => onCancel())
		} else {
			dispatch(addNewComment(newComment))
				.then(() => dispatch(fetchForumPosts()))
				.then(() => onCancel())
		}
	}

	return (
		<View style={styles.screen}>
			<View style={styles.formContainer}>
				<View style={styles.inputContainer}>
					<FormLabel>Comment</FormLabel>
					<View>
						<Controller
							control={control}
							render={({ field: { onChange, onBlur, value } }) => (
								<Input
									textInputConfig={{
										onChangeText: onChange,
										onBlur: onBlur,
										value,
									}}
								/>
							)}
							name="comment"
							rules={{
								required: 'Please enter a comment',
								validate: value => {
									if (value === '') {
										return 'Please enter a comment'
									}
									if (value.length < 3) {
										return 'Comment must be at least 3 characters'
									}
									if (value.length > 50) {
										return 'Comment must be at most 50 characters'
									}
								},
							}}
						/>
						{errors.comment && <Text style={styles.errorText}>{errors.comment.message}</Text>}
					</View>
				</View>

				<View style={styles.buttonsContainer}>
					<Button onPress={onCancel} mode="secondary">
						Cancel
					</Button>
					<Button onPress={handleSubmit(onSubmit)}>{isEditing ? 'Edit' : 'Add'}</Button>
				</View>
			</View>
		</View>
	)
}

export default ForumCommentForm

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.primary6,
	},
	formContainer: {
		marginTop: 20,
		paddingVertical: 16,
		paddingHorizontal: 10,
		backgroundColor: Colors.primary13,
		borderRadius: 8,
		gap: 20,
		elevation: 4,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 5,
		shadowOpacity: 0.26,
	},
	inputContainer: {
		gap: 20,
	},
	errorText: {
		color: Colors.red,
	},
	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		gap: 20,
	},
})
