import { useNavigation } from '@react-navigation/native'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'

import FormLabel from '../form/FormLabel'
import Input from '../form/Input'
import Dropdown from '../Dropdown'
import Button from '../Button'
import { Colors } from '../../constants/colors'

import { fetchForumCategories } from '../../slices/forumCategorySlice'
import { addNewForumPost, editForumPost, fetchForumPosts } from '../../slices/forumPostsSlice'
import { fetchMe, selectUser } from '../../slices/authSlice'
import { formatDateOnly } from '../../utils/utils'

function ForumForm({ postId }) {
	const navigation = useNavigation()
	const dispatch = useDispatch()

	const user = useSelector(selectUser)
	const token = useSelector(state => state.auth.accessToken)

	const categories = useSelector(state => state.forumCategories.forumCategories)
	const posts = useSelector(state => state.forumPosts.forumPosts)

	const isEditing = !!postId
	const currentEmployeeId = useMemo(() => user?.employeeId ?? null, [user])

	const {
		handleSubmit,
		control,
		setValue,
		setError,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: {
			title: '',
			postContent: '',
			tags: '',
			category: null, // {label,value}
		},
		mode: 'onSubmit',
	})

	useEffect(() => {
		dispatch(fetchForumCategories())
	}, [dispatch])

	useEffect(() => {
		if (!token) return
		dispatch(fetchMe())
	}, [token, dispatch])

	useEffect(() => {
		if (!postId) return
		const post = posts?.find(p => p.id === postId)
		if (!post) return

		setValue('title', post.title ?? '')
		setValue('postContent', post.postContent ?? '')
		setValue('tags', post.tags ?? '')
		setValue('category', post.categoryId ? { label: post.category ?? 'Category', value: post.categoryId } : null)
	}, [postId, posts, setValue])

	const categoryOptions = useMemo(
		() =>
			(categories ?? []).map(c => ({
				label: c.name,
				value: c.id,
			})),
		[categories]
	)

	function onCancel() {
		navigation.goBack()
	}

	const onSubmit = async data => {
		try {
			if (!currentEmployeeId) {
				setError('formError', { type: 'manual', message: 'Brak employeeId (user nie jest pracownikiem?)' })
				return
			}

			if (!data?.category?.value) {
				setError('category', { type: 'manual', message: 'Forum category is required' })
				return
			}

			const tagsArray = (data.tags ?? '')
				.split(',')
				.map(t => t.trim())
				.filter(t => t.length > 0)

			const newForumPost = {
				idEmployee: +currentEmployeeId,
				title: data.title,
				postContent: data.postContent,
				tags: tagsArray.join(','),
				categoryId: +data.category.value,
				postDate: formatDateOnly(new Date()),
			}

			if (isEditing) {
				await dispatch(
					editForumPost({
						id: postId,
						updatedForumPost: { ...newForumPost, id: postId },
					})
				).unwrap?.()
			} else {
				await dispatch(addNewForumPost(newForumPost)).unwrap?.()
			}

			await dispatch(fetchForumPosts())
			Alert.alert('Success', `Post ${isEditing ? 'updated' : 'added'} successfully`, [{ text: 'OK' }])
			navigation.goBack()
		} catch (err) {
			console.log('Forum submit error:', err)
			setError('formError', { type: 'server', message: err?.message ?? 'Failed to save post' })
			Alert.alert('Error', `Failed to ${isEditing ? 'edit' : 'add'} post`)
		}
	}

	return (
		<View style={styles.screen}>
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.scrollContent}
				keyboardShouldPersistTaps="handled" // ✅ żeby dropdown + inputy działały
				showsVerticalScrollIndicator={false}>
				{/* Header */}
				<View style={styles.header}>
					<Ionicons name="chatbubble-ellipses" size={32} color={Colors.primary37} />
					<Text style={styles.headerTitle}>{isEditing ? 'Edit Forum Post' : 'Add New Forum Post'}</Text>
					<Text style={styles.headerSubtitle}>
						{isEditing ? 'Update post content and category' : 'Create a new post for the forum'}
					</Text>
				</View>

				<View style={styles.formContainer}>
					{/* Post */}
					<View style={styles.sectionContainer}>
						<View style={styles.sectionHeader}>
							<Ionicons name="document-text" size={20} color={Colors.primary37} />
							<Text style={styles.sectionTitle}>Post</Text>
						</View>

						<View style={styles.inputContainer}>
							<FormLabel>Title</FormLabel>
							<Controller
								control={control}
								name="title"
								rules={{
									required: 'Title is required',
									minLength: { value: 10, message: 'Title must be at least 10 characters long' },
									maxLength: { value: 200, message: 'Title must be at most 200 characters long' },
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input
										textInputConfig={{
											onChangeText: onChange,
											onBlur,
											value,
											placeholder: 'Enter post title',
											returnKeyType: 'next',
										}}
									/>
								)}
							/>
							{errors.title && <Text style={styles.errorText}>{errors.title.message}</Text>}
						</View>

						<View style={styles.inputContainer}>
							<FormLabel>Tags</FormLabel>
							<Controller
								control={control}
								name="tags"
								rules={{
									required: 'At least one tag is required',
									pattern: {
										value: /^[a-zA-Z0-9\s,]+$/,
										message: 'Tags can only contain letters, numbers, spaces, and commas',
									},
									validate: value => {
										const tags = (value ?? '')
											.split(',')
											.map(t => t.trim())
											.filter(t => t.length > 0)

										if (tags.length === 0) return 'At least one tag is required'
										if (tags.some(t => t.length < 2)) return 'Each tag must be at least 2 characters long'
										if (tags.length > 10) return 'Maximum 10 tags allowed'
										return true
									},
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input
										textInputConfig={{
											onChangeText: onChange,
											onBlur,
											value,
											placeholder: 'e.g. help, discussion, question',
											autoCapitalize: 'none',
										}}
									/>
								)}
							/>
							{errors.tags && <Text style={styles.errorText}>{errors.tags.message}</Text>}
						</View>

						<View style={styles.inputContainer}>
							<FormLabel>Content</FormLabel>
							<Controller
								control={control}
								name="postContent"
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
											placeholder: 'Write your post...',
											multiline: true,
										}}
									/>
								)}
							/>
							{errors.postContent && <Text style={styles.errorText}>{errors.postContent.message}</Text>}
						</View>
					</View>

					{/* Category */}
					<View style={styles.sectionContainer}>
						<View style={styles.sectionHeader}>
							<Ionicons name="pricetags" size={20} color={Colors.primary37} />
							<Text style={styles.sectionTitle}>Category</Text>
						</View>

						<View style={styles.inputContainer}>
							<FormLabel>Forum category</FormLabel>
							<Controller
								control={control}
								name="category"
								rules={{
									required: 'Forum category is required',
									validate: v => (!!v?.value ? true : 'Forum category is required'),
								}}
								render={({ field: { onChange, value } }) => (
									<Dropdown
										data={categoryOptions}
										onChange={onChange}
										placeholder="Select forum category"
										selectedValue={value}
										isEditing={isEditing}
										maxHeight={320} // ✅ dropdown scroll
									/>
								)}
							/>
							{errors.category && <Text style={styles.errorText}>{errors.category.message}</Text>}
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
							{isEditing ? 'Edit Post' : 'Add Post'}
						</Button>
					</View>
				</View>
			</ScrollView>
		</View>
	)
}

export default ForumForm

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
		color: Colors.red, // '#ff9393'
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
