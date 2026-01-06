import { useNavigation } from '@react-navigation/native'
import { useEffect, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, Text, View, ScrollView, Switch, Platform, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import Input from '../form/Input'
import FormLabel from '../form/FormLabel'
import Button from '../Button'
import { Colors } from '../../constants/colors'

import { addNewCustomer, editCustomer, fetchCustomers } from '../../slices/customersSlice'

function CustomerForm({ customerId }) {
	const customers = useSelector(state => state.customers.customers)

	const dispatch = useDispatch()
	const navigation = useNavigation()

	const customerToEdit = useMemo(() => {
		if (!customerId) return null
		return customers?.find(c => c.id === customerId) ?? null
	}, [customerId, customers])

	const isUser = !!customerToEdit?.idUser

	// PASSWORD:
	// min 8 characters
	// at least one uppercase letter
	// at least one lowercase letter
	// at least one number
	// at least one special character
	const PASSWORD_REGEX =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])[A-Za-z\d !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{8,}$/

	const {
		handleSubmit,
		control,
		setValue,
		watch,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: {
			name: '',
			surname: '',
			email: '',
			phone: '',
			street: '',
			streetNumber: '',
			houseNumber: '',
			city: '',
			postalCode: '',
			country: '',
			createUser: false, // tylko dla customer bez idUser
			login: '',
			password: '',
		},
	})

	const createUser = watch('createUser')

	// Prefill przy edycji
	useEffect(() => {
		if (!customerToEdit) return

		setValue('name', customerToEdit.name ?? '')
		setValue('surname', customerToEdit.surname ?? '')
		setValue('email', customerToEdit.email ?? '')
		setValue('phone', customerToEdit.phoneNumber ?? customerToEdit.phone ?? '')
		setValue('street', customerToEdit.street ?? '')
		setValue('streetNumber', customerToEdit.streetNumber ?? '')
		setValue('houseNumber', customerToEdit.houseNumber ?? '')
		setValue('city', customerToEdit.city ?? '')
		setValue('postalCode', customerToEdit.postalCode ?? '')
		setValue('country', customerToEdit.country ?? '')

		setValue('login', customerToEdit.login ?? '')

		if (customerToEdit.idUser) {
			setValue('createUser', false)
		}

		// password zawsze pusty w edycji
		setValue('password', '')
	}, [customerToEdit, setValue])

	function onCancel() {
		navigation.goBack()
	}

	async function onSubmit(data) {
		const newCustomer = {
			name: data.name,
			surname: data.surname,
			email: data.email,
			phone: data.phone,
			street: data.street,
			streetNumber: data.streetNumber,
			houseNumber: data.houseNumber,
			city: data.city,
			postalCode: data.postalCode,
			country: data.country,
		}

		if (isUser) {
			newCustomer.login = data.login
		}

		if (!isUser && data.createUser) {
			newCustomer.createUser = true
			newCustomer.login = data.login
			newCustomer.password = data.password
		} else {
			newCustomer.createUser = false
		}

		try {
			if (customerId) {
				await dispatch(
					editCustomer({
						id: customerId,
						updatedCustomer: {
							...newCustomer,
							id: customerId,
						},
					})
				).unwrap?.()
			} else {
				await dispatch(addNewCustomer(newCustomer)).unwrap?.()
			}

			await dispatch(fetchCustomers())
			navigation.goBack()
			Alert.alert('Success', `Customer ${customerId ? 'updated' : 'added'} successfully`)
		} catch (e) {
			console.log('Submit error:', e)
			Alert.alert('Error', `Failed to ${customerId ? 'update' : 'add'} customer`)
		}
	}

	return (
		<View style={styles.screen}>
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}>
				<View style={styles.formContainer}>
					<View style={styles.titleContainer}>
						<Text style={styles.title}>{customerId ? 'Edit Customer' : 'Add New Customer'}</Text>
						<Text style={styles.subtitle}>{customerId ? 'Update customer information' : 'Create a new customer'}</Text>
					</View>

					{/* NAME */}
					<View style={styles.field}>
						<FormLabel>Name</FormLabel>
						<Controller
							control={control}
							name="name"
							rules={{
								required: 'Name can not be empty',
								minLength: { value: 2, message: 'Name must be at least 2 characters long' },
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<Input
									textInputConfig={{
										onChangeText: onChange,
										onBlur,
										value,
										autoCapitalize: 'words',
									}}
									hasError={!!errors.name}
								/>
							)}
						/>
						{errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
					</View>

					{/* SURNAME */}
					<View style={styles.field}>
						<FormLabel>Surname</FormLabel>
						<Controller
							control={control}
							name="surname"
							rules={{
								required: 'Surname can not be empty',
								minLength: { value: 2, message: 'Surname must be at least 2 characters long' },
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<Input
									textInputConfig={{
										onChangeText: onChange,
										onBlur,
										value,
										autoCapitalize: 'words',
									}}
									hasError={!!errors.surname}
								/>
							)}
						/>
						{errors.surname && <Text style={styles.errorText}>{errors.surname.message}</Text>}
					</View>

					{/* EMAIL */}
					<View style={styles.field}>
						<FormLabel>E-mail</FormLabel>
						<Controller
							control={control}
							name="email"
							rules={{
								required: 'Email can not be empty',
								pattern: {
									value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
									message: 'Invalid email address',
								},
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<Input
									textInputConfig={{
										onChangeText: onChange,
										onBlur,
										value,
										keyboardType: 'email-address',
										autoCapitalize: 'none',
										autoCorrect: false,
									}}
									hasError={!!errors.email}
								/>
							)}
						/>
						{errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
					</View>

					{/* PHONE */}
					<View style={styles.field}>
						<FormLabel>Phone</FormLabel>
						<Controller
							control={control}
							name="phone"
							rules={{
								required: 'Phone number can not be empty',
								pattern: {
									value: /^\+?[1-9]\d{1,14}$/,
									message: 'Invalid phone number',
								},
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<Input
									textInputConfig={{
										onChangeText: onChange,
										onBlur,
										value,
										keyboardType: Platform.OS === 'ios' ? 'phone-pad' : 'phone-pad',
									}}
									hasError={!!errors.phone}
								/>
							)}
						/>
						{errors.phone && <Text style={styles.errorText}>{errors.phone.message}</Text>}
					</View>

					{/* STREET */}
					<View style={styles.field}>
						<FormLabel>Street</FormLabel>
						<Controller
							control={control}
							name="street"
							rules={{
								required: 'Street can not be empty',
								pattern: {
									value: /^[\p{L}\s.'-]+$/u,
									message: 'Street name can contain only letters and spaces',
								},
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<Input textInputConfig={{ onChangeText: onChange, onBlur, value }} hasError={!!errors.street} />
							)}
						/>
						{errors.street && <Text style={styles.errorText}>{errors.street.message}</Text>}
					</View>

					{/* STREET NUMBER */}
					<View style={styles.field}>
						<FormLabel>Street number</FormLabel>
						<Controller
							control={control}
							name="streetNumber"
							rules={{
								required: 'streetNumber can not be empty',
								pattern: { value: /^\d+[A-Za-z]?$/, message: 'Use format 12 or 12A' },
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<Input textInputConfig={{ onChangeText: onChange, onBlur, value }} hasError={!!errors.streetNumber} />
							)}
						/>
						{errors.streetNumber && <Text style={styles.errorText}>{errors.streetNumber.message}</Text>}
					</View>

					{/* HOUSE NUMBER (optional) */}
					<View style={styles.field}>
						<FormLabel>House number</FormLabel>
						<Controller
							control={control}
							name="houseNumber"
							rules={{
								pattern: {
									value: /^\d+([A-Za-z]?)(\/\d+[A-Za-z]?)?$/,
									message: 'Use format 12, 12A, 12/3 or 12A/3B',
								},
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<Input textInputConfig={{ onChangeText: onChange, onBlur, value }} hasError={!!errors.houseNumber} />
							)}
						/>
						{errors.houseNumber && <Text style={styles.errorText}>{errors.houseNumber.message}</Text>}
					</View>

					{/* CITY */}
					<View style={styles.field}>
						<FormLabel>City</FormLabel>
						<Controller
							control={control}
							name="city"
							rules={{
								required: 'City can not be empty',
								minLength: { value: 2, message: 'City must be at least 2 characters long' },
								pattern: { value: /^[\p{L}\s-]+$/u, message: 'City must contain only letters' },
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<Input textInputConfig={{ onChangeText: onChange, onBlur, value }} hasError={!!errors.city} />
							)}
						/>
						{errors.city && <Text style={styles.errorText}>{errors.city.message}</Text>}
					</View>

					{/* POSTAL CODE */}
					<View style={styles.field}>
						<FormLabel>Postal code</FormLabel>
						<Controller
							control={control}
							name="postalCode"
							rules={{
								required: 'Postal code can not be empty',
								pattern: { value: /^[\p{L}0-9\s-]+$/u, message: 'Invalid postal code format' },
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<Input textInputConfig={{ onChangeText: onChange, onBlur, value }} hasError={!!errors.postalCode} />
							)}
						/>
						{errors.postalCode && <Text style={styles.errorText}>{errors.postalCode.message}</Text>}
					</View>

					{/* COUNTRY */}
					<View style={styles.field}>
						<FormLabel>Country</FormLabel>
						<Controller
							control={control}
							name="country"
							rules={{
								required: 'Country can not be empty',
								minLength: { value: 2, message: 'Country must be at least 2 characters long' },
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<Input textInputConfig={{ onChangeText: onChange, onBlur, value }} hasError={!!errors.country} />
							)}
						/>
						{errors.country && <Text style={styles.errorText}>{errors.country.message}</Text>}
					</View>

					{/*  CREATE USER: pokazuj tylko jeśli customer NIE jest userem */}
					{!isUser && (
						<View style={styles.switchRow}>
							<FormLabel>Create user</FormLabel>
							<Controller
								control={control}
								name="createUser"
								render={({ field: { onChange, value } }) => (
									<Switch
										value={!!value}
										onValueChange={onChange}
										trackColor={{ false: Colors.primary19, true: Colors.primary37 }}
										thumbColor={Colors.primary97}
									/>
								)}
							/>
						</View>
					)}

					{/*  LOGIN: jeśli customer jest userem -> pokazuj zawsze */}
					{isUser && (
						<View style={styles.field}>
							<FormLabel>Login</FormLabel>
							<Controller
								control={control}
								name="login"
								rules={{
									required: 'Login can not be empty',
									minLength: { value: 2, message: 'Login must be at least 2 characters long' },
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input
										textInputConfig={{
											onChangeText: onChange,
											onBlur,
											value,
											autoCapitalize: 'none',
											autoCorrect: false,
										}}
										hasError={!!errors.login}
									/>
								)}
							/>
							{errors.login && <Text style={styles.errorText}>{errors.login.message}</Text>}
						</View>
					)}

					{/*  LOGIN + PASSWORD: tylko gdy nie ma idUser i createUser = true */}
					{!isUser && createUser && (
						<>
							<View style={styles.field}>
								<FormLabel>Login</FormLabel>
								<Controller
									control={control}
									name="login"
									rules={{
										required: 'Login can not be empty',
										minLength: { value: 2, message: 'Login must be at least 2 characters long' },
									}}
									render={({ field: { onChange, onBlur, value } }) => (
										<Input
											textInputConfig={{
												onChangeText: onChange,
												onBlur,
												value,
												autoCapitalize: 'none',
												autoCorrect: false,
											}}
											hasError={!!errors.login}
										/>
									)}
								/>
								{errors.login && <Text style={styles.errorText}>{errors.login.message}</Text>}
							</View>

							<View style={styles.field}>
								<FormLabel>Password</FormLabel>
								<Controller
									control={control}
									name="password"
									rules={{
										pattern: {
											value: PASSWORD_REGEX,
											message:
												'Password must be at least 8 characters long and include uppercase, lowercase, number and special character',
										},
										validate: value => {
											if (value === '') return 'Password is required'
											return true
										},
									}}
									render={({ field: { onChange, onBlur, value } }) => (
										<Input
											textInputConfig={{
												onChangeText: onChange,
												onBlur,
												value,
												secureTextEntry: true,
												autoCapitalize: 'none',
											}}
											hasError={!!errors.password}
										/>
									)}
								/>
								{errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
							</View>
						</>
					)}

					<View style={styles.buttonsContainer}>
						<Button onPress={onCancel} mode="secondary">
							Cancel
						</Button>
						<Button onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
							{customerId ? 'Save changes' : 'Add customer'}
						</Button>
					</View>
				</View>
			</ScrollView>
		</View>
	)
}

export default CustomerForm

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.primary6,
	},
	scrollView: {
		flex: 1,
	},
	scrollContent: {
		paddingBottom: 40,
	},
	formContainer: {
		marginTop: 20,
		marginHorizontal: 16,
		paddingVertical: 24,
		paddingHorizontal: 20,
		backgroundColor: Colors.primary13,
		borderRadius: 16,
		gap: 20,
		elevation: 8,
		shadowColor: Colors.primary67,
		shadowOffset: { width: 0, height: 4 },
		shadowRadius: 8,
		shadowOpacity: 0.3,
	},
	titleContainer: {
		alignItems: 'center',
		marginBottom: 8,
		paddingBottom: 16,
		borderBottomWidth: 1,
		borderBottomColor: Colors.primary19,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: Colors.primary97,
		textAlign: 'center',
		marginBottom: 4,
	},
	subtitle: {
		fontSize: 14,
		color: Colors.greyLight,
		textAlign: 'center',
		opacity: 0.8,
	},
	field: {
		gap: 8,
	},
	errorText: {
		color: Colors.red,
		fontSize: 12,
		marginTop: 4,
	},
	switchRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 12,
		marginTop: 12,
		paddingTop: 20,
		borderTopWidth: 1,
		borderTopColor: Colors.primary19,
	},
})
