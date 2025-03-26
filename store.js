import { configureStore } from '@reduxjs/toolkit'
import { bookingsSlice } from './slices/bookingsSlice'
import { igloosSlice } from './slices/igloosSlice'
import { customersSlice } from './slices/customersSlice'
import { employeesSlice } from './slices/employeesSlice'
import { employeeRolesSlice } from './slices/employeeRolesSlice'
import { discountsSlice } from './slices/discountsSlice'
import { forumSlice } from './slices/forumSlice'
import { paymentMethodsSlice } from './slices/paymentMethodsSlice'
import { forumCategoriesSlice } from './slices/forumCategoriesSlice'
import { forumCommentsSlice } from './slices/forumCommentsSlice'

export const store = configureStore({
	reducer: {
		bookings: bookingsSlice.reducer,
		igloos: igloosSlice.reducer,
		customers: customersSlice.reducer,
		employees: employeesSlice.reducer,
		employeeRoles: employeeRolesSlice.reducer,
		discounts: discountsSlice.reducer,
		forum: forumSlice.reducer,
		paymentMethods: paymentMethodsSlice.reducer,
		forumCategories: forumCategoriesSlice.reducer,
		forumComments: forumCommentsSlice.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false, // Wyłącza SerializableStateInvariantMiddleware
		}),
})
