import { useLayoutEffect } from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { Colors } from '../../constants/colors'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import CustomerForm from '../../components/customers/CustomerForm'

function CustomerFormScreen({route, navigation}) {
    const customerId = route?.params?.customerId

    const isEditing = !!customerId

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Customer' : 'Add Customer',
        })
    }, [navigation, isEditing])

	return (
        <GestureHandlerRootView style={styles.screen}>
            <ScrollView contentContainerStyle={{ paddingBottom: 200 }} style={styles.scroll}>
                <CustomerForm customerId={customerId} />
            </ScrollView>
        </GestureHandlerRootView>
    )
}

export default CustomerFormScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    scroll: {
        backgroundColor: Colors.primary6,
    },
})
