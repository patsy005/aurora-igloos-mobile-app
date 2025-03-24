import { useNavigation } from '@react-navigation/native'
import { useEffect, useLayoutEffect } from 'react'
import { StyleSheet, Text } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import ForumForm from '../../components/forum/ForumForm'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEmployees } from '../../slices/employeesSlice'
import { fetchForumCategories } from '../../slices/forumSlice'
import Spinner from '../../components/shared/Spinner'

function ForumFormScreen({ route, navigation }) {
	const postId = route?.params?.postId
	const isLoading = useSelector(state => state.forum.isLoading)
	const dispatch = useDispatch()

	const isEditing = !!postId

	useEffect(() => {
		if (isEditing) {
			dispatch(fetchEmployees())
			dispatch(fetchForumCategories())
		}
	}, [dispatch])

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? 'Edit post' : 'Add post',
		})
	}, [navigation, isEditing])

	return (
		<GestureHandlerRootView style={styles.screen}>
			{isLoading && <Spinner />}
			{!isLoading && <ForumForm postId={postId} />}
		</GestureHandlerRootView>
	)
}

export default ForumFormScreen

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
})
