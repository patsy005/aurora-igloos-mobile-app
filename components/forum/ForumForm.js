import { Controller, useForm } from 'react-hook-form'
import { DUMMY_EMPLOYEES, DUMMY_FORUM_CATEGORIES, getForumPosts } from '../../constants/dummy-data'
import { StyleSheet, Text, View } from 'react-native'
import FormLabel from '../form/FormLabel'
import Input from '../form/Input'
import Dropdown from '../Dropdown'
import Button from '../Button'
import { Colors } from '../../constants/colors'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewForumPost, editPost, fetchForumPosts } from '../../slices/forumSlice'
import { fetchEmployees } from '../../slices/employeesSlice'
import { fetchForumCategories } from '../../slices/forumCategoriesSlice'

function ForumForm({ postId }) {
	const employees = useSelector(state => state.employees.employees)
	const categories = useSelector(state => state.forumCategories.forumCategories)
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

	const isEditing = !!postId

	useEffect(() => {
		if (postId) {
			const post = posts?.find(post => post.id === postId)
			if (post) {
				setValue('title', post.title)
				setValue('postContent', post.postContent)
				setValue('category', { label: post.category, value: post.categoryId })
				setValue('employee', { label: post.employeeName, value: post.idEmployee })
				setValue('tags', post.tags)
			}
		}
	}, [postId])

	function onCancel() {
		navigation.goBack()
	}

	function onSubmit(data) {
		console.log(data)

		const newPost = {
			title: data.title,
			postContent: data.postContent,
			category: data.category.label,
			tags: data.tags,
			idEmployee: data.employee.value,
			categoryId: data.category.value,
			forumComment: [],
			employeeName: employees.find(employee => employee.id === data.employee.value).name,
			employeeSurname: employees.find(employee => employee.id === data.employee.value).surname,
			employeePhotoUrl: '',
		}

		if (postId) {
			dispatch(editPost({ id: postId, post: newPost }))
				.unwrap()
				.then(() => dispatch(fetchForumPosts()))
				.then(() => navigation.goBack())
		} else {
			dispatch(addNewForumPost(newPost))
				.unwrap()
				.then(() => dispatch(fetchForumPosts()))
				.then(() => navigation.goBack())
		}
	}

	const employeeOptions = employees.map(employee => ({
		label: `${employee.name} ${employee.surname}`,
		value: employee.id,
	}))

	const categoryOptions = categories.map(category => ({
		label: category.name,
		value: category.id,
	}))

	return (
		<View style={styles.screen}>
			<View style={styles.formContainer}>
				<View style={styles.inputContainer}>
					<FormLabel>Title</FormLabel>
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
							name="title"
							rules={{
								required: 'Please enter a title',
								validate: value => {
									if (value === '') {
										return 'Please enter a title'
									}
									if (value.length < 3) {
										return 'Title must be at least 3 characters'
									}
									if (value.length > 50) {
										return 'Title must be at most 50 characters'
									}
								},
							}}
						/>
						{errors.title && <Text style={styles.errorText}>{errors.title.message}</Text>}
					</View>
				</View>
				<View style={styles.inputContainer}>
					<FormLabel>Content</FormLabel>
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
							name="postContent"
							rules={{
								required: 'Please enter a content',
								validate: value => {
									if (value === '') {
										return 'Please enter a content'
									}
									if (value.length < 3) {
										return 'Content must be at least 3 characters'
									}
									if (value.length > 50) {
										return 'Content must be at most 50 characters'
									}
								},
							}}
						/>
						{errors.postContent && <Text style={styles.errorText}>{errors.postContent.message}</Text>}
					</View>
				</View>

				<View style={styles.inputContainer}>
					<FormLabel>Tags</FormLabel>
					<View>
						<Controller
							control={control}
							render={({ field: { onChange, onBlur, value } }) => (
								<Input
									textInputConfig={{
										onChangeText: onChange,
										onBlur: onBlur,
										value,
										placeholder: 'Separate by ,',
									}}
								/>
							)}
							name="tags"
							rules={{
								required: 'Please enter tags',
								validate: value => {
									if (value === '') return 'Please enter tags'

									const tags = value.split(',').map(tag => tag.trim())

									if (tags.length < 2) return 'Please enter at least 2 tags'

									const isValid = tags.every(tag => /^[a-zA-Z]+$/.test(tag))
									if (!isValid) return 'Tags must be words separated by commas'

									return true
								},
							}}
						/>
						{errors.tags && <Text style={styles.errorText}>{errors.tags.message}</Text>}
					</View>
				</View>

				<View style={styles.inputContainer}>
					<FormLabel>Category</FormLabel>
					<View>
						<Controller
							control={control}
							render={({ field: { onChange, onBlur, value } }) => (
								<Dropdown
									data={categoryOptions}
									onChange={onChange}
									placeholder="Select category"
									selectedValue={value}
									isEditing={isEditing}
								/>
							)}
							name="category"
							rules={{
								required: 'Please select category',
								validate: value => value !== '' || 'Please select category',
							}}
						/>
						{errors.category && <Text style={styles.errorText}>{errors.category.message}</Text>}
					</View>
				</View>

				<View style={styles.inputContainer}>
					<FormLabel>Employee</FormLabel>
					<View>
						<Controller
							control={control}
							render={({ field: { onChange, onBlur, value } }) => (
								<Dropdown
									data={employeeOptions}
									onChange={onChange}
									placeholder="Select employee"
									selectedValue={value}
									isEditing={isEditing}
								/>
							)}
							name="employee"
							rules={{
								required: 'Please select employee',
								validate: value => value !== '' || 'Please select employee',
							}}
						/>
						{errors.employee && <Text style={styles.errorText}>{errors.employee.message}</Text>}
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

export default ForumForm

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
