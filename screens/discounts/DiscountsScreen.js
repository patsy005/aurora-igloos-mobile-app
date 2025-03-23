import { Text } from 'react-native'
import { DUMMY_DISCOUNTS } from '../../constants/dummy-data'
import ListScreen from '../screen/ListScreen'
import DiscountListItem from '../../components/discounts/DiscountListItem'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchDiscounts } from '../../slices/discountsSlice'
import Spinner from '../../components/shared/Spinner'

function DiscountsScreen({ navigation }) {
	const discounts = useSelector(state => state.discounts.discounts)
	const isLoading = useSelector(state => state.discounts.isLoading)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchDiscounts())
	}, [])

	function addDiscountHandler() {
		navigation.navigate('DiscountForm')
	}

	function renderDiscountListItem(itemData) {
		return <DiscountListItem discount={itemData.item} />
	}
	return (
		<>
		{isLoading && <Spinner />}
			{!isLoading && (
				<ListScreen
					onAdd={addDiscountHandler}
					onRenderListItem={renderDiscountListItem}
					buttonLabel="Add discount"
					data={discounts}
				/>
			)}
		</>
	)
}

export default DiscountsScreen
