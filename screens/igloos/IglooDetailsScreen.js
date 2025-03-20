import { ScrollView, StyleSheet, Text } from "react-native"
import { Colors } from "../../constants/colors"
import IglooDetail from "../../components/igloos/IglooDetail"

function IglooDetailsScreen({route}) {
    const iglooId = route.params.iglooId

    return (
        <ScrollView style={styles.screen}>
            <IglooDetail iglooId={iglooId} />
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
