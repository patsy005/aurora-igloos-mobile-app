import { Text } from 'react-native'
import { getIgloos } from '../../constants/dummy-data'
import ListScreen from '../screen/ListScreen'
import IglooListItem from '../../components/igloos/IglooListItem'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchIgloos } from '../../slices/igloosSlice'
import Spinner from '../../components/shared/Spinner'

function IgloosScreen({ navigation }) {
	const igloos = useSelector(state => state.igloos.igloos)
	const isLoading = useSelector(state => state.igloos.isLoading)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchIgloos())
	}, [])

	function addIglooHandler() {
		navigation.navigate('IglooForm')
	}

	function renderIglooListItem(itemData) {
		return <IglooListItem igloo={itemData.item} />
	}

	return (
		<>
			{isLoading && <Spinner />}
			{!isLoading && (
				<ListScreen
					onAdd={addIglooHandler}
					onRenderListItem={renderIglooListItem}
					buttonLabel="Add igloo"
					data={igloos}
				/>
			)}
		</>
	)
}

export default IgloosScreen
