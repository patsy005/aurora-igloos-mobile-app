import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, Switch, Text, View } from 'react-native'
import Dropdown from '../Dropdown'
import { Colors } from '../../constants/colors'
import FormLabel from '../form/FormLabel'
import Input from '../form/Input'
import Button from '../Button'
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchIgloos } from '../../slices/igloosSlice'
import { fetchCustomers } from '../../slices/customersSlice'
import { addNewBooking, editBooking, fetchBookings } from '../../slices/bookingsSlice'
import { fetchEmployees } from '../../slices/employeesSlice'
import { fetchPaymentMethods } from '../../slices/paymentMethodsSlice'

function BookingForm({ bookingId }) {
	const bookings = useSelector(state => state.bookings.bookings)
	const igloos = useSelector(state => state.igloos.igloos)
	const customers = useSelector(state => state.customers.customers)
	const paymentMethods = useSelector(state => state.paymentMethods.paymentMethods)
	const employees = useSelector(state => state.employees.employees)
	const dispatch = useDispatch()
	const {
		handleSubmit,
		register,
		setValue,
		getValues,
		control,
		formState: { errors, isLoading },
	} = useForm({
		defaultValues: {
			// checkInDate: bookingId ? bookings.find(b => b.id === bookingId)?.checkIn || '' : '',
			// checkOutDate: bookingId ? bookings.find(b => b.id === bookingId)?.checkOut || '' : '',
		},
	})
	const navigation = useNavigation()

	const isEditing = !!bookingId

	useEffect(() => {
		dispatch(fetchIgloos())
		dispatch(fetchCustomers())
		dispatch(fetchPaymentMethods())
		dispatch(fetchEmployees())
	}, [dispatch])

	useEffect(() => {
		if (bookingId) {
			const booking = bookings?.find(booking => booking.id === bookingId)
			if (booking) {
				setValue('customer', { label: `${booking.customerName} ${booking.customerSurname}`, value: booking.idCustomer })
				setValue('checkInDate', booking.checkIn)
				setValue('checkOutDate', booking.checkOut)
				setValue('igloo', { label: booking.iglooName, value: booking.idIgloo })
				setValue('earlyCheckIn', !!booking.earlyCheckInRequest)
				setValue('lateCheckOut', !!booking.lateCheckOutRequest)
				setValue('employee', {
					label: `${booking.employeeName} ${booking.employeeSurname}`,
					value: booking.createdById,
				})
				setValue('paymentMethod', { label: booking.paymentMethodName, value: booking.paymentMethodId })
			}
		}
	}, [bookingId])

	function onCancel() {
		navigation.goBack()
	}

	function onSubmit(data) {
		const newBooking = {
			idCustomer: data.customer.value,
			checkIn: data.checkInDate,
			checkOut: data.checkOutDate,
			idIgloo: data.igloo.value,
			earlyCheckInRequest: !!data.earlyCheckIn,
			lateCheckOutRequest: !!data.lateCheckOut,
			createdById: data.employee.value,
			paymentMethodId: data.paymentMethod.value === 0 ? 1 : data.paymentMethod.value,
			customerName: customers.find(c => c.id === data.customer.value).name,
			customerSurname: customers.find(c => c.id === data.customer.value).surname,
			customerEmail: customers.find(c => c.id === data.customer.value).email,
			iglooName: igloos.find(i => i.id === data.igloo.value).name,
			employeeName: employees.find(e => e.id === data.employee.value).name,
			employeeSurname: employees.find(e => e.id === data.employee.value).surname,
			paymentMethodName: paymentMethods.find(pm => pm.id === data.paymentMethod.value).name,
		}

		if (bookingId) {
			dispatch(editBooking({ id: bookingId, booking: newBooking })).then(() => {
				dispatch(fetchBookings()).then(() => navigation.goBack())
			})
		} else {
			dispatch(addNewBooking(newBooking)).then(() => {
				dispatch(fetchBookings()).then(() => navigation.goBack())
			})
		}
	}

	const customersOptions = customers.map(customer => ({
		label: `${customer.name} ${customer.surname}`,
		value: customer.id,
	}))

	const iglooOptions = igloos.map(igloo => ({
		label: igloo.name,
		value: igloo.id,
	}))

	const employeeOptions = employees.map(e => ({
		label: `${e.name} ${e.surname}`,
		value: e.id,
	}))

	const paymentMethodOptions = paymentMethods.map(pm => ({
		label: pm.name,
		value: pm.id,
	}))

	return (
		<View style={styles.screen}>
			<View style={styles.formContainer}>
				<View style={styles.inputContainer}>
					<FormLabel>Customer</FormLabel>
					<View>
						<Controller
							control={control}
							render={({ field: { onChange, onBlur, value } }) => (
								<Dropdown
									data={customersOptions}
									onChange={onChange}
									placeholder="Select customer"
									selectedValue={value}
									isEditing={isEditing}
								/>
							)}
							name="customer"
							rules={{
								required: 'Please select a customer',
								validate: value => value !== '' || 'Please select a customer',
							}}
						/>
						{errors.customer && <Text style={styles.errorText}>{errors.customer.message}</Text>}
					</View>
				</View>

				<View style={styles.inputsInRow}>
					<View style={[styles.inputContainer, styles.inputHalf]}>
						<FormLabel>Check in date</FormLabel>
						<View>
							<Controller
								control={control}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input
										textInputConfig={{
											onChangeText: onChange,
											onBlur: onBlur,
											value: value ?? '',
											placeholder: 'YYYY-MM-DD',
											placeholderTextColor: Colors.greyLight,
										}}
									/>
								)}
								name="checkInDate"
								rules={{
									required: 'Please enter a check in date',
									pattern: {
										value: /^\d{4}-\d{2}-\d{2}$/,
										message: 'Date format must be YYYY-MM-DD',
									},
									validate: value => {
										const date = new Date(value)
										if (isNaN(date)) return 'Enter a valid date (YYYY-MM-DD)'
										if (date < new Date() && !isEditing) return 'Check-in date cannot be in the past'
										if (date > getValues('checkOutDate')) return 'Check-in date must be before check-out date'
										return true
									},
								}}
							/>
							{errors.checkInDate && <Text style={styles.errorText}>{errors.checkInDate.message}</Text>}
						</View>
					</View>
					<View style={[styles.inputContainer, styles.inputHalf]}>
						<FormLabel>Check out date</FormLabel>
						<View>
							<Controller
								control={control}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input
										textInputConfig={{
											onChangeText: onChange,
											onBlur: onBlur,
											value: value ?? '',
											placeholder: 'YYYY-MM-DD',
											placeholderTextColor: Colors.greyLight,
										}}
									/>
								)}
								name="checkOutDate"
								rules={{
									required: 'Please enter a check out date',
									pattern: {
										value: /^\d{4}-\d{2}-\d{2}$/,
										message: 'Date format must be YYYY-MM-DD',
									},
									validate: value => {
										const date = new Date(value)
										// const isValidDate = !isNaN(date) && value === date.toISOString().split('T')[0] && date >= new Date()
										// return isValidDate || 'Enter a valid date (YYYY-MM-DD)'
										if (isNaN(date)) return 'Enter a valid date (YYYY-MM-DD)'
										if (date < new Date() && !isEditing) return 'Check-in date cannot be in the past'
										if (date < new Date(getValues('checkInDate'))) return 'Check-out date must be after check-in date'
										return true
									},
								}}
							/>
							{errors.checkOutDate && <Text style={styles.errorText}>{errors.checkOutDate.message}</Text>}
						</View>
					</View>
				</View>

				<View style={styles.inputContainer}>
					<FormLabel>Igloo</FormLabel>
					<View>
						<Controller
							control={control}
							render={({ field: { onChange, onBlur, value } }) => (
								<Dropdown
									data={iglooOptions}
									onChange={onChange}
									placeholder="Select igloo"
									selectedValue={value}
									isEditing={isEditing}
								/>
							)}
							name="igloo"
							rules={{
								required: 'Please select an igloo',
								validate: value => value !== '' || 'Please select an customer',
							}}
						/>
						{errors.igloo && <Text style={styles.errorText}>{errors.igloo.message}</Text>}
					</View>
				</View>

				<View style={styles.inputContainer}>
					<FormLabel>Employee</FormLabel>
					<View>
						<Controller
							control={control}
							render={({ field: { onChange, onBlur, value } }) => (
								<Dropdown
									data={employeeOptions}
									onChange={onChange}
									placeholder="Select employee"
									selectedValue={value}
									isEditing={isEditing}
								/>
							)}
							name="employee"
							rules={{
								required: 'Please select an employee',
								validate: value => value !== '' || 'Please select an employee',
							}}
						/>
						{errors.employee && <Text style={styles.errorText}>{errors.employee.message}</Text>}
					</View>
				</View>

				<View style={styles.inputContainer}>
					<FormLabel>Payment method</FormLabel>
					<View>
						<Controller
							control={control}
							render={({ field: { onChange, onBlur, value } }) => (
								<Dropdown
									data={paymentMethodOptions}
									onChange={onChange}
									placeholder="Select payment method"
									selectedValue={value}
									isEditing={isEditing}
								/>
							)}
							name="paymentMethod"
							rules={{
								required: 'Please select a payment method',
								validate: value => value !== '' || 'Please select a payment method',
							}}
						/>
						{errors.paymentMethod && <Text style={styles.errorText}>{errors.paymentMethod.message}</Text>}
					</View>
				</View>

				<View style={[styles.inputContainer, styles.switchContainer]}>
					<FormLabel>Early check in</FormLabel>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Switch
								value={!!value}
								onValueChange={onChange}
								trackColor={{ false: Colors.primary6, true: Colors.primary37 }}
								thumbColor={value ? Colors.white : Colors.greyLight}
							/>
						)}
						name="earlyCheckIn"
						rules={{
							required: false,
						}}
					/>
				</View>

				<View style={[styles.inputContainer, styles.switchContainer]}>
					<FormLabel>Late check out</FormLabel>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Switch
								value={!!value}
								onValueChange={onChange}
								trackColor={{ false: Colors.primary6, true: Colors.primary37 }}
								thumbColor={value ? Colors.white : Colors.greyLight}
							/>
						)}
						name="lateCheckOut"
						rules={{
							required: false,
						}}
					/>
				</View>
				<View style={styles.buttonsContainer}>
					<Button onPress={onCancel} mode="secondary">
						Cancel
					</Button>
					<Button onPress={handleSubmit(onSubmit)}>{bookingId ? 'Edit' : 'Add'}</Button>
				</View>
			</View>
		</View>
	)
}

export default BookingForm

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.primary6,
	},
	formContainer: {
		marginTop: 20,
		paddingVertical: 16,
		paddingHorizontal: 10,
		backgroundColor: Colors.primary13,
		borderRadius: 8,
		gap: 20,
		elevation: 4,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 5,
		shadowOpacity: 0.26,
	},
	inputContainer: {
		gap: 20,
	},
	inputsInRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		columnGap: 20,
	},
	inputHalf: {
		flex: 1,
	},
	switchContainer: {
		flexDirection: 'row',
		gap: 15,
		alignItems: 'center',
		// justifyContent: 'space-between',
	},
	errorText: {
		color: Colors.red,
	},
	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		gap: 20,
	},
})
