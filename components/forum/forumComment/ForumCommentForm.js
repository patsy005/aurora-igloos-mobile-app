import { useNavigation } from '@react-navigation/native'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'

import FormLabel from '../../form/FormLabel'
import Input from '../../form/Input'
import Button from '../../Button'
import { Colors } from '../../../constants/colors'

import { fetchMe, selectUser } from '../../../slices/authSlice'
import { formatDateOnly } from '../../../utils/utils'
import { fetchForumPosts } from '../../../slices/forumPostsSlice'
import { addNewForumComment, editForumComment, fetchForumComments } from '../../../slices/forumCommentSlice'

function ForumCommentForm({ postId, commentId }) {
	const navigation = useNavigation()
	const dispatch = useDispatch()

	const user = useSelector(selectUser)
	const token = useSelector(state => state.auth.accessToken)

	const forumComments = useSelector(state => state.forumComments.forumComments)
	const posts = useSelector(state => state.forumPosts.forumPosts)

	const isEditing = !!commentId
	const currentEmployeeId = useMemo(() => user?.employeeId ?? null, [user])

	const {
		handleSubmit,
		control,
		setValue,
		setError,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: {
			comment: '',
		},
		mode: 'onSubmit',
	})

	useEffect(() => {
		if (!token) return
		dispatch(fetchMe())
	}, [token, dispatch])

	useEffect(() => {
		dispatch(fetchForumComments())
	}, [dispatch])

	// prefill edit
	useEffect(() => {
		if (!postId || !commentId) return

		// 1) forumComments
		const c1 = (forumComments ?? []).find(c => c.id === commentId && c.idPost === postId)
		if (c1) {
			setValue('comment', c1.comment ?? '')
			return
		}

		// 2) fallback: z posta
		const post = (posts ?? []).find(p => p.id === postId)
		const c2 = post?.forumComment?.find(x => x.id === commentId)
		if (c2) setValue('comment', c2.comment ?? '')
	}, [postId, commentId, forumComments, posts, setValue])

	function onCancel() {
		navigation.goBack()
	}

	const onSubmit = async data => {
		try {
			if (!postId) {
				setError('formError', { type: 'manual', message: 'Missing postId' })
				return
			}

			if (!currentEmployeeId) {
				setError('formError', { type: 'manual', message: 'Brak employeeId (user nie jest pracownikiem?)' })
				return
			}

			const newComment = {
				idPost: postId,
				idEmployee: +currentEmployeeId,
				comment: data.comment,
				commentDate: formatDateOnly(new Date()),
			}

			if (isEditing) {
				await dispatch(
					editForumComment({
						id: commentId,
						updatedForumComment: { ...newComment, id: commentId },
					})
				).unwrap?.()
			} else {
				await dispatch(addNewForumComment(newComment)).unwrap?.()
			}

			await dispatch(fetchForumComments())
			await dispatch(fetchForumPosts())

			Alert.alert('Success', `Comment ${isEditing ? 'updated' : 'added'} successfully`, [{ text: 'OK' }])
			navigation.goBack()
		} catch (err) {
			console.log('Forum comment submit error:', err)
			setError('formError', { type: 'server', message: err?.message ?? 'Failed to save comment' })
			Alert.alert('Error', `Failed to ${isEditing ? 'edit' : 'add'} comment`)
		}
	}

	if (!postId) return null

	return (
		<View style={styles.screen}>
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.scrollContent}
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}>
				{/* Header */}
				<View style={styles.header}>
					<Ionicons name="chatbox" size={32} color={Colors.primary37} />
					<Text style={styles.headerTitle}>{isEditing ? 'Edit Comment' : 'Add New Comment'}</Text>
					<Text style={styles.headerSubtitle}>
						{isEditing ? 'Update your comment content' : 'Write a new comment for this post'}
					</Text>
				</View>

				<View style={styles.formContainer}>
					{/* Comment */}
					<View style={styles.sectionContainer}>
						<View style={styles.sectionHeader}>
							<Ionicons name="create" size={20} color={Colors.primary37} />
							<Text style={styles.sectionTitle}>Comment</Text>
						</View>

						<View style={styles.inputContainer}>
							<FormLabel>Content</FormLabel>

							<Controller
								control={control}
								name="comment"
								rules={{
									required: 'Content is required',
									minLength: { value: 50, message: 'Content must be at least 50 characters long' },
									maxLength: { value: 5000, message: 'Content must be at most 5000 characters long' },
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input
										textInputConfig={{
											onChangeText: onChange,
											onBlur,
											value,
											placeholder: 'Write your comment...',
											multiline: true,
										}}
									/>
								)}
							/>

							{errors.comment && <Text style={styles.errorText}>{errors.comment.message}</Text>}
						</View>
					</View>

					{errors?.formError?.message && (
						<View style={{ paddingHorizontal: 16, marginTop: 8 }}>
							<Text style={styles.errorText}>{errors.formError.message}</Text>
						</View>
					)}

					{/* Buttons */}
					<View style={styles.buttonsContainer}>
						<Button onPress={onCancel} mode="secondary" style={styles.cancelButton}>
							Cancel
						</Button>
						<Button onPress={handleSubmit(onSubmit)} style={styles.submitButton} disabled={isSubmitting}>
							{isEditing ? 'Edit Comment' : 'Add Comment'}
						</Button>
					</View>
				</View>
			</ScrollView>
		</View>
	)
}

export default ForumCommentForm

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.primary6,
	},
	scrollView: {
		flex: 1,
	},
	scrollContent: {
		paddingBottom: 40,
	},

	header: {
		alignItems: 'center',
		paddingVertical: 24,
		paddingHorizontal: 16,
		marginBottom: 8,
	},
	headerTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		color: Colors.primary97,
		marginTop: 12,
		textAlign: 'center',
	},
	headerSubtitle: {
		fontSize: 14,
		color: Colors.primary86,
		marginTop: 8,
		textAlign: 'center',
	},

	formContainer: {
		marginHorizontal: 16,
		marginBottom: 20,
	},

	sectionContainer: {
		backgroundColor: Colors.boxBg,
		borderRadius: 16,
		marginBottom: 20,
		borderWidth: 1,
		borderColor: Colors.primary19,
		overflow: 'hidden',
		shadowColor: Colors.primary67,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 4,
	},
	sectionHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: Colors.primary19,
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: Colors.primary37,
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: '600',
		color: Colors.primary97,
		marginLeft: 8,
		textTransform: 'uppercase',
		letterSpacing: 0.5,
	},

	inputContainer: {
		paddingHorizontal: 16,
		paddingVertical: 10,
	},

	errorText: {
		color: Colors.red,
		fontSize: 12,
		marginTop: 6,
		marginLeft: 4,
	},

	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 16,
		paddingHorizontal: 16,
		gap: 12,
	},
	cancelButton: {
		flex: 1,
		backgroundColor: Colors.primary19,
		borderColor: Colors.primary37,
		borderWidth: 1,
	},
	submitButton: {
		flex: 1,
		backgroundColor: Colors.primary37,
	},
})
