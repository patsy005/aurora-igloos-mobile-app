import { Text, View } from "react-native"

function Button({children, onPress, mode, style}) {
    return (
        <View>
            <Pressable onPress={onPress}>
                <View>
                    <Text>{children}</Text>
                </View>
            </Pressable>
        </View>
    )
}

export default Button
