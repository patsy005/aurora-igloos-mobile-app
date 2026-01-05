import { configureStore } from '@reduxjs/toolkit'
import bookingsSlice from './slices/bookingsSlice'
import igloosSlice from './slices/igloosSlice'
import customersSlice from './slices/customersSlice'
import { employeesSlice } from './slices/employeesSlice'
import { employeeRolesSlice } from './slices/employeeRolesSlice'
import discountsSlice from './slices/discountsSlice'
import { forumSlice } from './slices/forumSlice'
import { paymentMethodsSlice } from './slices/paymentMethodsSlice'
import { forumCategoriesSlice } from './slices/forumCategoriesSlice'
import { forumCommentsSlice } from './slices/forumCommentsSlice'
import { dashboardSlice } from './slices/dashboardSlice'
import authSlice from './slices/authSlice'
import tripsSlice from './slices/tripsSlice'
import tripLevelSlice from './slices/tripLevelSlice'
import tripSeasonSlice from './slices/tripSeasonSlice'
import usersSlice from './slices/usersSlice'

export const store = configureStore({
	reducer: {
		bookings: bookingsSlice,
		igloos: igloosSlice,
		customers: customersSlice,
		employees: employeesSlice.reducer,
		employeeRoles: employeeRolesSlice.reducer,
		discounts: discountsSlice,
		forum: forumSlice.reducer,
		paymentMethods: paymentMethodsSlice.reducer,
		forumCategories: forumCategoriesSlice.reducer,
		forumComments: forumCommentsSlice.reducer,
		dashboard: dashboardSlice.reducer,
		auth: authSlice,
		trips: tripsSlice,
		tripLevels: tripLevelSlice,
		tripSeasons: tripSeasonSlice,
		users: usersSlice,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false, // Wyłącza SerializableStateInvariantMiddleware
		}),
})
