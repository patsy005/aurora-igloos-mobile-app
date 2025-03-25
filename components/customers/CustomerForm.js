import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, Text, View } from 'react-native'
import { getCustomers } from '../../constants/dummy-data'
import { Colors } from '../../constants/colors'
import Button from '../Button'
import Input from '../form/Input'
import FormLabel from '../form/FormLabel'
import { useDispatch, useSelector } from 'react-redux'
import { addNewCustomer, editCustomer, fetchCustomers } from '../../slices/customersSlice'

function CustomerForm({ customerId }) {
	const customers = useSelector(state => state.customers.customers)
	const {
		handleSubmit,
		register,
		setValue,
		control,
		formState: { errors, isLoading },
	} = useForm()
	const navigation = useNavigation()
	const dispatch = useDispatch()

	useEffect(() => {
		if (customerId) {
			const customer = customers?.find(customer => customer.id === customerId)
			if (customer) {
				setValue('name', customer.name)
				setValue('surname', customer.surname)
				setValue('email', customer.email)
				setValue('phoneNumber', customer.phone)
				setValue('street', customer.street)
				setValue('streetNumber', customer.streetNumber)
				setValue('houseNumber', customer.houseNumber)
				setValue('city', customer.city)
				setValue('country', customer.country)
				setValue('postalCode', customer.postalCode)
			}
		}
	}, [customerId, setValue])

	function onCancel() {
		navigation.goBack()
	}

	function onSubmit(data) {
		console.log(data)

		const newCustomer = {
			name: data.name,
			surname: data.surname,
			email: data.email,
			phone: data.phoneNumber,
			street: data.street,
			streetNumber: data.streetNumber,
			houseNumber: data.houseNumber,
			city: data.city,
			country: data.country,
			postalCode: data.postalCode,
		}

		if (customerId) {
			dispatch(editCustomer({ id: customerId, customer: newCustomer }))
				.then(() => dispatch(fetchCustomers()))
				.then(() => navigation.goBack())
		} else {
			dispatch(addNewCustomer(newCustomer))
				.then(() => dispatch(fetchCustomers()))
				.then(() => navigation.goBack())
		}
	}

	return (
		<View style={styles.screen}>
			<View style={styles.formContainer}>
				<View style={styles.inputsRow}>
					<View style={[styles.inputContainer, styles.inputHalf]}>
						<FormLabel>Name</FormLabel>
						<View>
							<Controller
								control={control}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input
										textInputConfig={{
											onChangeText: onChange,
											onBlur: onBlur,
											value,
										}}
									/>
								)}
								name="name"
								rules={{
									required: 'Please enter a name',
									validate: value => {
										if (value === '') {
											return 'Please enter a name'
										}
										if (value.length < 3) {
											return 'Name must be at least 3 characters'
										}
										if (value.length > 50) {
											return 'Name must be at most 50 characters'
										}
									},
								}}
							/>
							{errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
						</View>
					</View>
					<View style={[styles.inputContainer, styles.inputHalf]}>
						<FormLabel>Surame</FormLabel>
						<View>
							<Controller
								control={control}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input
										textInputConfig={{
											onChangeText: onChange,
											onBlur: onBlur,
											value,
										}}
									/>
								)}
								name="surname"
								rules={{
									required: 'Please enter a surname',
									validate: value => {
										if (value === '') {
											return 'Please enter a surname'
										}
										if (value.length < 3) {
											return 'Name must be at least 3 characters'
										}
										if (value.length > 50) {
											return 'Name must be at most 50 characters'
										}
									},
								}}
							/>
							{errors.surname && <Text style={styles.errorText}>{errors.surname.message}</Text>}
						</View>
					</View>
				</View>

				<View style={styles.inputsRow}>
					<View style={[styles.inputContainer, styles.inputHalf]}>
						<FormLabel>Email address</FormLabel>
						<View>
							<Controller
								control={control}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input
										textInputConfig={{
											onChangeText: onChange,
											onBlur: onBlur,
											value,
										}}
									/>
								)}
								name="email"
								rules={{
									required: 'Please enter a email address',
									pattern: {
										value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
										message: 'Invalid email address',
									},
									validate: value => {
										if (value === '') {
											return 'Please enter a email address'
										}
									},
								}}
							/>
							{errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
						</View>
					</View>
					<View style={[styles.inputContainer, styles.inputHalf]}>
						<FormLabel>Phone number</FormLabel>
						<View>
							<Controller
								control={control}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input
										textInputConfig={{
											onChangeText: onChange,
											onBlur: onBlur,
											value,
										}}
									/>
								)}
								name="phoneNumber"
								rules={{
									required: 'Please enter a phone number',
									pattern: {
										value: /^\+?[1-9]\d{1,14}$/,
										message: 'Invalid phone number',
									},
									validate: value => {
										if (value === '') {
											return 'Please enter a phone number'
										}
									},
								}}
							/>
							{errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber.message}</Text>}
						</View>
					</View>
				</View>

				<View style={styles.inputContainer}>
					<FormLabel>Street</FormLabel>
					<View>
						<Controller
							control={control}
							render={({ field: { onChange, onBlur, value } }) => (
								<Input
									textInputConfig={{
										onChangeText: onChange,
										onBlur: onBlur,
										value,
									}}
								/>
							)}
							name="street"
							rules={{
								required: 'Please enter a street',
								validate: value => {
									if (value === '') {
										return 'Please enter a street'
									}
								},
							}}
						/>
						{errors.street && <Text style={styles.errorText}>{errors.street.message}</Text>}
					</View>
				</View>

				<View style={styles.inputsRow}>
					<View style={[styles.inputContainer, styles.inputHalf]}>
						<FormLabel>Street number</FormLabel>
						<View>
							<Controller
								control={control}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input
										textInputConfig={{
											onChangeText: onChange,
											onBlur: onBlur,
											value,
										}}
									/>
								)}
								name="streetNumber"
								rules={{
									required: 'Please enter a street number',
									validate: value => {
										if (value === '') {
											return 'Please enter a street number'
										}
									},
								}}
							/>
							{errors.streetNumber && <Text style={styles.errorText}>{errors.streetNumber.message}</Text>}
						</View>
					</View>
					<View style={[styles.inputContainer, styles.inputHalf]}>
						<FormLabel>House number</FormLabel>
						<View>
							<Controller
								control={control}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input
										textInputConfig={{
											onChangeText: onChange,
											onBlur: onBlur,
											value,
										}}
									/>
								)}
								name="houseNumber"
								rules={{
									required: 'Please enter a house number',
									validate: value => {
										if (value === '') {
											return 'Please enter a house number'
										}
									},
								}}
							/>
							{errors.houseNumber && <Text style={styles.errorText}>{errors.houseNumber.message}</Text>}
						</View>
					</View>
				</View>

				<View style={styles.inputsRow}>
					<View style={[styles.inputContainer, styles.inputHalf]}>
						<FormLabel>City</FormLabel>
						<View>
							<Controller
								control={control}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input
										textInputConfig={{
											onChangeText: onChange,
											onBlur: onBlur,
											value,
										}}
									/>
								)}
								name="city"
								rules={{
									required: 'Please enter a city',
									validate: value => {
										if (value === '') {
											return 'Please enter a city'
										}
									},
								}}
							/>
							{errors.city && <Text style={styles.errorText}>{errors.city.message}</Text>}
						</View>
					</View>
					<View style={[styles.inputContainer, styles.inputHalf]}>
						<FormLabel>Country</FormLabel>
						<View>
							<Controller
								control={control}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input
										textInputConfig={{
											onChangeText: onChange,
											onBlur: onBlur,
											value,
										}}
									/>
								)}
								name="country"
								rules={{
									required: 'Please enter a country',
									validate: value => {
										if (value === '') {
											return 'Please enter a country'
										}
									},
								}}
							/>
							{errors.country && <Text style={styles.errorText}>{errors.country.message}</Text>}
						</View>
					</View>
				</View>

				<View style={styles.inputContainer}>
					<FormLabel>Postal code</FormLabel>
					<View>
						<Controller
							control={control}
							render={({ field: { onChange, onBlur, value } }) => (
								<Input
									textInputConfig={{
										onChangeText: onChange,
										onBlur: onBlur,
										value,
									}}
								/>
							)}
							name="postalCode"
							rules={{
								required: 'Please enter a postal code',
								validate: value => {
									if (value === '') {
										return 'Please enter a postal code'
									}
								},
							}}
						/>
						{errors.postalCode && <Text style={styles.errorText}>{errors.postalCode.message}</Text>}
					</View>
				</View>

				<View style={styles.buttonsContainer}>
					<Button onPress={onCancel} mode="secondary">
						Cancel
					</Button>
					<Button onPress={handleSubmit(onSubmit)}>{customerId ? 'Edit' : 'Add'}</Button>
				</View>
			</View>
		</View>
	)
}

export default CustomerForm

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
	inputsRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		columnGap: 20,
	},
	inputHalf: {
		flex: 1,
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
