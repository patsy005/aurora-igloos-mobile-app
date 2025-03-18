import { Text, View } from "react-native"
import { DUMMY_BOOKINGS, DUMMY_CUSTOMERS, DUMMY_IGLOOS } from "../../constants/dummy-data"

function BookingsScreen() {
    const bookings = DUMMY_BOOKINGS
    const customers = DUMMY_CUSTOMERS
    const igloos = DUMMY_IGLOOS

    const bookingsData = bookings.map(booking => {
        const customer = customers.find(customer => customer.id === booking.idCustomer)
        const igloo = igloos.find(igloo => igloo.id === booking.idIgloo)

        return {
            ...booking,
            customer,
            igloo
        }
    })

    return (
        <View>
            
        </View>
    )
}

export default BookingsScreen
