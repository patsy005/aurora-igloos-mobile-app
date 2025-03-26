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
import BookingDetailsScreen from './screens/bookings/BookingDetailsScreen'
import { Colors } from './constants/colors'
import Header from './components/Header'
import { ScrollView } from 'react-native'
import IconButton from './components/IconButton'
import BookingFormScreen from './screens/bookings/BookingFormScreen'
import IglooDetailsScreen from './screens/igloos/IglooDetailsScreen'
import IglooFormScreen from './screens/igloos/IglooFormScreen'
import EmployeeDetailScreen from './screens/employees/EmployeeDetailScreen'
import EmployeeFormScreen from './screens/employees/EmployeeFormScreen'
import CustomerDetailScreen from './screens/customers/CustomerDetailScreen'
import CustomerFormScreen from './screens/customers/CustomerFormScreen'
import DiscountDetailScreen from './screens/discounts/DiscountDetailScreen'
import DiscountFormScreen from './screens/discounts/DiscountFormScreen'
import ForumFormScreen from './screens/forum/ForumFormScreen'
import ForumDetilScreen from './screens/forum/ForumDetilScreen'
import ForumCommentsScreen from './screens/forum/forumComments/ForumCommentsScreen'
import ForumCommentFormScreen from './screens/forum/forumComments/ForumCommentFormScreen'
import { Provider } from 'react-redux'
import { store } from './store'

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
				drawerType: 'slide',
			}}>
			<Drawer.Screen
				name="Dashboard"
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
					// headerRight: ({ tintColor }) => (
					// 	<IconButton iconName="calendar-plus" size={24} color={tintColor} onPress={() => {}} iconType="FontAwesome6" />
					// ),
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
				<Provider store={store}>
					<Header />
					<Stack.Navigator
						screenOptions={{
							headerStyle: { backgroundColor: Colors.primary13 },
							headerTintColor: Colors.white,
						}}>
						<Stack.Screen
							name="DrawerNavigation"
							component={DrawerNavigation}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name="BookingDetails"
							component={BookingDetailsScreen}
							options={{
								headerTitle: 'Booking details',
							}}
						/>
						<Stack.Screen
							name="BookingForm"
							component={BookingFormScreen}
							options={{
								presentation: 'modal',
							}}
						/>

						<Stack.Screen
							name="IglooDetails"
							component={IglooDetailsScreen}
							options={{
								headerTitle: 'Igloo details',
							}}
						/>
						<Stack.Screen
							name="IglooForm"
							component={IglooFormScreen}
							options={{
								presentation: 'modal',
							}}
						/>

						<Stack.Screen
							name="EmployeeDetails"
							component={EmployeeDetailScreen}
							options={{
								headerTitle: 'Employee details',
							}}
						/>
						<Stack.Screen
							name="EmployeeForm"
							component={EmployeeFormScreen}
							options={{
								presentation: 'modal',
							}}
						/>

						<Stack.Screen
							name="CustomerDetails"
							component={CustomerDetailScreen}
							options={{
								headerTitle: 'Customer details',
							}}
						/>
						<Stack.Screen name="CustomerForm" component={CustomerFormScreen} options={{ presentation: 'modal' }} />

						<Stack.Screen
							name="DiscountDetails"
							component={DiscountDetailScreen}
							options={{
								headerTitle: 'Discount details',
							}}
						/>
						<Stack.Screen name="DiscountForm" component={DiscountFormScreen} options={{ presentation: 'modal' }} />

						<Stack.Screen
							name="PostDetails"
							component={ForumDetilScreen}
							options={{
								headerTitle: 'Post details',
							}}
						/>
						<Stack.Screen
							name="PostForm"
							component={ForumFormScreen}
							options={{
								presentation: 'modal',
							}}
						/>

						<Stack.Screen
							name="PostComments"
							component={ForumCommentsScreen}
							options={{
								headerTitle: 'Post comments',
							}}
						/>
						<Stack.Screen
							name="CommentForm"
							component={ForumCommentFormScreen}
							options={{
								presentation: 'modal',
							}}
						/>
					</Stack.Navigator>
				</Provider>
			</NavigationContainer>
		</>
	)
}
