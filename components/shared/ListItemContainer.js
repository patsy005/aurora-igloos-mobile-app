import { StyleSheet, View } from 'react-native'
import { Colors } from '../../constants/colors'

function ListItemContainer({ children }) {
	return <View style={styles.container}>{children}</View>
}

export default ListItemContainer

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		paddingVertical: 8,
		paddingHorizontal: 10,
		backgroundColor: Colors.primary13,
		borderRadius: 8,
	},
})
