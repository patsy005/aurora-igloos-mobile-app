import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome6 } from '@expo/vector-icons'

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
import { Colors } from './constants/colors'
import Header from './components/Header'

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

function DrawerNavigation({ navigation }) {
	return (
		<Drawer.Navigator
			screenOptions={{
				// headerShown: false,
				headerStyle: { backgroundColor: Colors.primary13 },
				headerTintColor: Colors.white,
				drawerStyle: {
					backgroundColor: Colors.primary13,
					width: '100%',
					borderTopRightRadius: 0,
					
				},
				drawerLabelStyle: {
					color: Colors.white,
				},
				drawerActiveBackgroundColor: Colors.primary6,
				drawerActiveTintColor: Colors.white,
				drawerInactiveTintColor: Colors.white,
				drawerType: 'slide'
			}}>
			<Drawer.Screen
				name="Home"
				component={HomeScreen}
				options={{
					drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
				}}
			/>
			<Drawer.Screen
				name="Bookings"
				component={BookingsScreen}
				options={{
					drawerIcon: ({ color, size }) => <Ionicons name="calendar-outline" size={size} color={color} />,
				}}
			/>
			<Drawer.Screen
				name="Igloos"
				component={IgloosScreen}
				options={{
					drawerIcon: ({ color, size }) => <FontAwesome6 name="igloo" size={size} color={color} />,
				}}
			/>
			<Drawer.Screen
				name="Employees"
				component={EmployeesScreen}
				options={{
					drawerIcon: ({ color, size }) => <FontAwesome6 name="user-ninja" size={size} color={color} />,
				}}
			/>
			<Drawer.Screen
				name="Customers"
				component={CustomersScreen}
				options={{
					drawerIcon: ({ color, size }) => <FontAwesome6 name="person-burst" size={size} color={color} />,
				}}
			/>
			<Drawer.Screen
				name="Discounts"
				component={DiscountsScreen}
				options={{
					drawerIcon: ({ color, size }) => <FontAwesome6 name="sack-dollar" size={size} color={color} />,
				}}
			/>
			<Drawer.Screen
				name="Forum"
				component={ForumScreen}
				options={{
					drawerIcon: ({ color, size }) => <FontAwesome6 name="comments" size={size} color={color} />,
				}}
			/>
		</Drawer.Navigator>
	)
}

export default function App() {
	return (
		<>
			<StatusBar style="light" />
			<NavigationContainer>
					<Header />
				<Stack.Navigator>
					<Stack.Screen
						name="DrawerNavigation"
						component={DrawerNavigation}
						options={{
							headerShown: false,
						}}
					/>
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
