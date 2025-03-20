import { Image, StyleSheet, View } from 'react-native'
import IconButton from '../IconButton'
import { Colors } from '../../constants/colors'

function DetailContainer({ onEdit, children }) {
	return (
		<View style={styles.container}>
			<View style={styles.iconsContainer}>
				<IconButton iconName="edit" iconType="FontAwesome6" color={Colors.primary67} size={24} onPress={onEdit} />
				<IconButton
					iconName="trash-can"
					iconType="FontAwesome6"
					color={Colors.primary67}
					size={24}
					onPress={() => {}}
				/>
			</View>

			{children}
		</View>
	)
}

export default DetailContainer

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 20,
		paddingVertical: 12,
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
	iconsContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		gap: 15,
	},
})
