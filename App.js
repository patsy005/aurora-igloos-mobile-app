import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeScreen from './screens/home/HomeScreen'
import BookingsScreen from './screens/bookings/BookingsScreen'
import IgloosScreen from './screens/igloos/IgloosScreen'
import EmployeesScreen from './screens/employees/EmployeesScreen'
import CustomersScreen from './screens/customers/CustomersScreen'
import DiscountsScreen from './screens/discounts/DiscountsScreen'
import ForumScreen from './screens/forum/ForumScreen'
import BookingItemScreen from './screens/bookings/BookingItemScreen'
import IglooItemScreen from './screens/igloos/IglooItemScreen'
import EmployeeItemScreen from './screens/employees/EmployeeItemScreen'
import CustomerItemScreen from './screens/customers/CustomerItemScreen'
import DiscountItemScreen from './screens/discounts/DiscountItemScreen'

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

function DrawerNavigation({ navigation }) {
	return (
		<Drawer.Navigator screenOptions={{
			// headerShown: false,
		}}>
			<Drawer.Screen name="Home" component={HomeScreen} />
			<Drawer.Screen name="Bookings" component={BookingsScreen} />
			<Drawer.Screen name="Igloos" component={IgloosScreen} />
			<Drawer.Screen name="Employees" component={EmployeesScreen} />
			<Drawer.Screen name="Customers" component={CustomersScreen} />
			<Drawer.Screen name="Discounts" component={DiscountsScreen} />
			<Drawer.Screen name="Forum" component={ForumScreen} />
		</Drawer.Navigator>
	)
}

export default function App() {
	return (
		<>
			<StatusBar style="auto" />
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="DrawerNavigation" component={DrawerNavigation} options={{
						headerShown: false,
					}} />
					<Stack.Screen name="BookingItem" component={BookingItemScreen} />
					<Stack.Screen name="IglooItem" component={IglooItemScreen} />
					<Stack.Screen name="EmployeeItem" component={EmployeeItemScreen} />
					<Stack.Screen name="CustomerItem" component={CustomerItemScreen} />
					<Stack.Screen name="DiscountItem" component={DiscountItemScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</>
	)
}
