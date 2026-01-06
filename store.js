import { configureStore } from '@reduxjs/toolkit'
import bookingsSlice from './slices/bookingsSlice'
import igloosSlice from './slices/igloosSlice'
import customersSlice from './slices/customersSlice'
import employeesSlice from './slices/employeesSlice'
import discountsSlice from './slices/discountsSlice'
import forumPostsSlice from './slices/forumPostsSlice'
import paymentMethodsSlice from './slices/paymentMethodsSlice'
import forumCategorySlice from './slices/forumCategorySlice'
import forumCommentSlice from './slices/forumCommentSlice'
import dashboardSlice from './slices/dashboardSlice'
import authSlice from './slices/authSlice'
import tripsSlice from './slices/tripsSlice'
import tripLevelSlice from './slices/tripLevelSlice'
import tripSeasonSlice from './slices/tripSeasonSlice'
import usersSlice from './slices/usersSlice'
import employeeRoleSlice from './slices/employeeRoleSlice'
import userRoleSlice from './slices/userRoleSlice'

export const store = configureStore({
	reducer: {
		bookings: bookingsSlice,
		igloos: igloosSlice,
		customers: customersSlice,
		employees: employeesSlice,
		discounts: discountsSlice,
		forumPosts: forumPostsSlice,
		paymentMethods: paymentMethodsSlice,
		forumCategories: forumCategorySlice,
		forumComments: forumCommentSlice,
		dashboard: dashboardSlice,
		auth: authSlice,
		trips: tripsSlice,
		tripLevels: tripLevelSlice,
		tripSeasons: tripSeasonSlice,
		users: usersSlice,
		employeeRoles: employeeRoleSlice,
		userRoles: userRoleSlice,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false, // Wyłącza SerializableStateInvariantMiddleware
		}),
})
