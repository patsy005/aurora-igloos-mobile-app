import { ScrollView, StyleSheet, Text } from 'react-native'
import { Colors } from '../../constants/colors'
import IglooDetail from '../../components/igloos/IglooDetail'
import { useSelector } from 'react-redux'
import Spinner from '../../components/shared/Spinner'

function IglooDetailsScreen({ route }) {
	const iglooId = route.params.iglooId
	const igloos = useSelector(state => state.igloos.igloos)
	const igloo = igloos?.find(igloo => igloo.id === iglooId)
	const isLoading = useSelector(state => state.igloos.isLoading)

	return (
		<ScrollView style={styles.screen}>
			{isLoading && <Spinner />}
			{!isLoading && igloo && <IglooDetail igloo={igloo} />}
		</ScrollView>
	)
}

export default IglooDetailsScreen

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.primary6,
		paddingVertical: 20,
		paddingHorizontal: 15,
	},
})
