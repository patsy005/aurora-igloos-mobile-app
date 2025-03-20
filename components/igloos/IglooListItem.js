import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import ListItemContainer from '../shared/ListItemContainer'
import { Colors } from '../../constants/colors'
import Rate from '../shared/Rate'
import { useNavigation } from '@react-navigation/native'

function IglooListItem({ igloo }) {
    const navigation = useNavigation()

    function getIglooDetailHandler(){
        navigation.navigate('IglooDetails', {
            iglooId: igloo.id
        })
    }
	return (
		<ListItemContainer>
			<Pressable style={({ pressed }) => pressed && styles.pressed} onPress={getIglooDetailHandler}>
				<View style={styles.constainer}>
					<Text style={styles.iglooName}>{igloo.name}</Text>
					<Text style={styles.infoText}>
						Up to <Text style={styles.numOfGuests}>{igloo.capacity}</Text> guests
					</Text>
                    <Rate rating={4} color={Colors.primary67} size={20} />
				</View>
			</Pressable>
		</ListItemContainer>
	)
}

export default IglooListItem

const styles = StyleSheet.create({
	constainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	iglooName: {
		fontSize: 20,
		fontWeight: 'bold',
		color: Colors.primary97,
	},
	infoText: {
		color: Colors.greyLight,
		fontSize: 16,
	},
	numOfGuests: {
		color: Colors.primary97,
		fontWeight: 'bold',
		fontSize: 19,
	},
    pressed: {
		opacity: 0.75,
	},
})
