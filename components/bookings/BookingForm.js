import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, Switch, Text, TextInput, View } from 'react-native'
import { DUMMY_CUSTOMERS, DUMMY_IGLOOS, getBookings } from '../../constants/dummy-data'
import Dropdown from '../Dropdown'
import { Colors } from '../../constants/colors'
import FormLabel from '../form/FormLabel'
import Input from '../form/Input'
import Button from '../Button'
import { useCallback, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchIgloos } from '../../slices/igloosSlice'
import { fetchCustomers } from '../../slices/customersSlice'

function BookingForm({ bookingId }) {
	const bookings = useSelector(state => state.bookings.bookings)
	const igloos = useSelector(state => state.igloos.igloos)
	const customers = useSelector(state => state.customers.customers)
	const dispatch = useDispatch()
	const {
		handleSubmit,
		register,
		setValue,
		control,
		formState: { errors, isLoading },
	} = useForm()
	const navigation = useNavigation()

	const isEditing = !!bookingId

	useEffect(() => {
		dispatch(fetchIgloos())
		dispatch(fetchCustomers())
	}, [dispatch])

	useEffect(() => {
		if (bookingId) {
			const booking = bookings?.find(booking => booking.id === bookingId)
			if (booking) {
				setValue('customer', booking.idCustomer)
				setValue('checkInDate', booking.checkIn)
				setValue('checkOutDate', booking.checkOut)
				setValue('igloo', booking.idIgloo)
				setValue('earlyCheckIn', booking.earlyCheckInRequest)
				setValue('lateCheckOut', booking.lateCheckOutRequest)
			}
		}
	}, [bookingId])

	function onCancel() {
		navigation.goBack()
	}

	function onSubmit(data) {
		console.log(data)
	}

	// const customers = DUMMY_CUSTOMERS
	// const igloos = DUMMY_IGLOOS

	const customersOptions = customers.map(customer => ({
		label: `${customer.name} ${customer.surname}`,
		value: customer.id,
	}))

	const iglooOptions = igloos.map(igloo => ({
		label: igloo.name,
		value: igloo.id,
	}))

	// const iglooOptions = useCallback(() => {
	// 	const options = igloos.map(igloo => ({
	// 		label: igloo.name,
	// 		value: igloo.id,
	// 	}))
	// 	return options
	// }, [igloos])

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
											value,
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
										const isValidDate = !isNaN(date) && value === date.toISOString().split('T')[0] && date >= new Date()
										return isValidDate || 'Enter a valid date (YYYY-MM-DD)'
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
											value,
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
										const isValidDate = !isNaN(date) && value === date.toISOString().split('T')[0] && date >= new Date()
										return isValidDate || 'Enter a valid date (YYYY-MM-DD)'
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

				<View style={[styles.inputContainer, styles.switchContainer]}>
					<FormLabel>Early check in</FormLabel>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Switch
								value={value}
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
								value={value}
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
