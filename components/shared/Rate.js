import { StyleSheet, Text, View } from "react-native"
import {Octicons} from '@expo/vector-icons'
import { Colors } from "../../constants/colors"

function Rate({color, size, rating, style}) {
    return (
        <View style={[styles.container, style]}>
            <Octicons name="star-fill" color={color} size={size} />
            <Text style={styles.text}>{rating}</Text>
        </View>
    )
}

export default Rate

const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    text: {
        color: Colors.primary67,
        fontSize: 20,
        fontWeight: 'bold',
    }
})
