import { configureStore } from '@reduxjs/toolkit'
import { bookingsSlice } from './slices/bookingsSlice'
import { igloosSlice } from './slices/igloosSlice'
import { customersSlice } from './slices/customersSlice'
import { employeesSlice } from './slices/employeesSlice'
import { employeeRolesSlice } from './slices/employeeRolesSlice'
import { discountsSlice } from './slices/discountsSlice'
import { forumSlice } from './slices/forumSlice'

export const store = configureStore({
	reducer: {
		bookings: bookingsSlice.reducer,
		igloos: igloosSlice.reducer,
		customers: customersSlice.reducer,
		employees: employeesSlice.reducer,
		employeeRoles: employeeRolesSlice.reducer,
		discounts: discountsSlice.reducer,
        forum: forumSlice.reducer
	},
})
