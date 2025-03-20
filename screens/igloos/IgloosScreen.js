import { Text } from 'react-native'
import { getIgloos } from '../../constants/dummy-data'
import ListScreen from '../screen/ListScreen'
import IglooListItem from '../../components/igloos/IglooListItem'

function IgloosScreen({navigation}) {
	const igloos = getIgloos()

	function addIglooHandler() {
		navigation.navigate('IglooForm')
	}

	function renderIglooListItem(itemData) {
		return <IglooListItem igloo={itemData.item} />
	}

	return (
		// <Text>Igloos Screen</Text>
		<ListScreen onAdd={addIglooHandler} onRenderListItem={renderIglooListItem} buttonLabel="Add igloo" data={igloos} />
	)
}

export default IgloosScreen
