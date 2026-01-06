import { Image, StyleSheet, View, ScrollView } from 'react-native'
import IconButton from '../IconButton'
import { Colors } from '../../constants/colors'
import { useSelector } from 'react-redux'
import { selectCanDelete, selectCanManage, selectRole } from '../../slices/authSlice'

function DetailContainer({ onEdit, onDelete, children }) {
	const canManage = useSelector(selectCanManage)
	const canDelete = useSelector(selectCanDelete)

	return (
		<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
			<View style={styles.iconsContainer}>
				{canManage && (
					<IconButton iconName="edit" iconType="FontAwesome6" color={Colors.primary67} size={24} onPress={onEdit} />
				)}
				{canDelete && (
					<IconButton
						iconName="trash-can"
						iconType="FontAwesome6"
						color={Colors.primary67}
						size={24}
						onPress={onDelete}
					/>
				)}
			</View>

			{children}
		</ScrollView>
	)
}

export default DetailContainer

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 20,
		backgroundColor: Colors.primary13,
		borderRadius: 8,
		elevation: 4,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 5,
		shadowOpacity: 0.26,
	},
	contentContainer: {
		paddingVertical: 12,
		paddingHorizontal: 10,
		paddingBottom: 100,
		gap: 20,
	},
	iconsContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		gap: 15,
	},
})
