import { Text } from "react-native"
import { getForumPosts } from "../../constants/dummy-data"
import ListScreen from "../screen/ListScreen"
import ForumListItem from "../../components/forum/ForumListItem"

function ForumScreen({navigation}) {
    const posts = getForumPosts()

    function addPostHandler(){
        navigation.navigate('PostForm')
    }

    function renderPostListItem(itemData){
        return <ForumListItem post={itemData.item} />
    }

    return (
        <ListScreen onAdd={addPostHandler} onRenderListItem={renderPostListItem} buttonLabel="Add post" data={posts} />
    )
}

export default ForumScreen
