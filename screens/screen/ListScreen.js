import { FlatList, StyleSheet, View } from 'react-native'
import Button from '../../components/Button'
import { Colors } from '../../constants/colors'

function ListScreen({ onAdd, onRenderListItem, buttonLabel, data }) {
	return (
		<View style={styles.container}>
			<View>
				{/* <View> */}
				<Button onPress={onAdd}>{buttonLabel}</Button>
				{/* </View> */}

				<View style={styles.listContainer}>
					<FlatList
						data={data}
						keyExtractor={item => item.id}
						renderItem={onRenderListItem}
						contentContainerStyle={{ paddingBottom: 40 }}
					/>
				</View>
			</View>
		</View>
	)
}

export default ListScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.primary6,
		paddingVertical: 20,
		paddingHorizontal: 15,
	},
	listContainer: {
		marginBottom: 40,
	},
})
