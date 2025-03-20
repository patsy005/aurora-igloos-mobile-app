import { useNavigation } from "@react-navigation/native"
import { Pressable, StyleSheet, Text, View } from "react-native"
import ListItemContainer from "../shared/ListItemContainer"
import { Colors } from "../../constants/colors"

function DiscountListItem({discount}) {
    const navigation = useNavigation()

    function getDiscountDetailHandler(){
        navigation.navigate('DiscountDetails', {
            discountId: discount.id
        })
    }

    return (
        <ListItemContainer>
            <Pressable style={({ pressed }) => pressed && styles.pressed} onPress={getDiscountDetailHandler}>
                <View>
                    <Text style={styles.discountName}>{discount.name}</Text>
                    <Text style={styles.description}>{discount.description}</Text>
                </View>
            </Pressable>
        </ListItemContainer>
    )
}

export default DiscountListItem

const styles = StyleSheet.create({
    discountName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primary97,
    },
    description: {
        color: Colors.greyLight,
        fontSize: 16,
    },
    pressed: {
        opacity: 0.75,
    },
})
