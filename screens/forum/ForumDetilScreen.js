import { ScrollView, StyleSheet, Text } from "react-native"
import { Colors } from "../../constants/colors"
import ForumDetail from "../../components/forum/ForumDetail"

function ForumDetilScreen({route}) {
    const postId = route.params.postId

    return (
        <ScrollView style={styles.screen}>
            <ForumDetail postId={postId} />
        </ScrollView>
    )
}

export default ForumDetilScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.primary6,
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
})
