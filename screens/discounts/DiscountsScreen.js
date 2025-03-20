import { Text } from 'react-native'
import { DUMMY_DISCOUNTS } from '../../constants/dummy-data'
import ListScreen from '../screen/ListScreen'
import DiscountListItem from '../../components/discounts/DiscountListItem'

function DiscountsScreen({ navigation }) {
	const discounts = DUMMY_DISCOUNTS

	function addDiscountHandler() {
		navigation.navigate('DiscountForm')
	}

	function renderDiscountListItem(itemData) {
		return <DiscountListItem discount={itemData.item} />
	}
	return (
		<ListScreen
			onAdd={addDiscountHandler}
			onRenderListItem={renderDiscountListItem}
			buttonLabel="Add discount"
			data={discounts}
		/>
	)
}

export default DiscountsScreen
