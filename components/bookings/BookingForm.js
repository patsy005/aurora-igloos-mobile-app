import { useNavigation } from '@react-navigation/native'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, Text, View, ScrollView, Switch, Alert, Pressable } from 'react-native'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'

import FormLabel from '../form/FormLabel'
import Input from '../form/Input'
import DateField from '../form/DateField'
import Dropdown from '../Dropdown'
import Button from '../Button'
import { Colors } from '../../constants/colors'

import { fetchIgloos } from '../../slices/igloosSlice'
import { fetchTrips } from '../../slices/tripsSlice'
import { fetchCustomers, addNewCustomer } from '../../slices/customersSlice'
import { fetchPaymentMethods } from '../../slices/paymentMethodsSlice'
import { addNewBooking, editBooking, fetchBookings } from '../../slices/bookingsSlice'

// ---------- helpers ----------
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/ // YYYY-MM-DD

function formatDateOnly(date) {
	if (!date) return null
	// YYYY-MM-DD
	if (typeof date === 'string') return date
	const d = new Date(date)
	if (Number.isNaN(d.getTime())) return null
	return d.toISOString().split('T')[0]
}

function parseDateOnlyToDate(str) {
	if (!str || typeof str !== 'string') return null
	// YYYY-MM-DD
	const d = new Date(str)
	if (Number.isNaN(d.getTime())) return null
	return d
}

function isBetweenDates(dateStr, startStr, endStr) {
	const d = parseDateOnlyToDate(dateStr)
	const s = parseDateOnlyToDate(startStr)
	const e = parseDateOnlyToDate(endStr)
	if (!d || !s || !e) return false
	return d >= s && d <= e
}

function findExistingCustomerByEmail(customers, email) {
	if (!email) return null
	const needle = String(email).trim().toLowerCase()
	if (!needle) return null
	return (
		(customers ?? []).find(
			c =>
				String(c.email ?? '')
					.trim()
					.toLowerCase() === needle
		) ?? null
	)
}

// ---------- UI subcomponent ----------
function SegmentedBookingType({ value, onChange }) {
	const options = [
		{ key: 'igloo', label: 'Igloo' },
		{ key: 'trip', label: 'Trip' },
		{ key: 'both', label: 'Both' },
	]

	return (
		<View style={segmentedStyles.row}>
			{options.map(opt => {
				const active = value === opt.key
				return (
					<Pressable
						key={opt.key}
						onPress={() => onChange(opt.key)}
						style={[segmentedStyles.btn, active && segmentedStyles.btnActive]}>
						<Text style={[segmentedStyles.txt, active && segmentedStyles.txtActive]}>{opt.label}</Text>
					</Pressable>
				)
			})}
		</View>
	)
}

const segmentedStyles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		gap: 8,
		paddingTop: 8,
	},
	btn: {
		flex: 1,
		paddingVertical: 10,
		borderRadius: 12,
		backgroundColor: Colors.primary6,
		borderWidth: 1,
		borderColor: Colors.primary19,
		alignItems: 'center',
	},
	btnActive: {
		backgroundColor: Colors.primary37,
		borderColor: Colors.primary37,
	},
	txt: {
		color: Colors.primary97,
		fontWeight: '600',
	},
	txtActive: {
		color: Colors.white,
	},
})

function BookingForm({ bookingId }) {
	const navigation = useNavigation()
	const dispatch = useDispatch()

	const bookings = useSelector(state => state.bookings.bookings)
	const igloos = useSelector(state => state.igloos.igloos)
	const trips = useSelector(state => state.trips.trips)
	const customers = useSelector(state => state.customers.customers)
	const paymentMethods = useSelector(state => state.paymentMethods.paymentMethods)

	const isEditing = !!bookingId

	const bookingToEdit = useMemo(() => {
		if (!bookingId) return null
		return (bookings ?? []).find(b => b.id === bookingId) ?? null
	}, [bookingId, bookings])

	const {
		handleSubmit,
		control,
		setValue,
		getValues,
		setError,
		watch,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: {
			bookingType: 'igloo',

			// customer
			idCustomer: null,
			customerName: '',
			customerSurname: '',
			customerEmail: '',
			customerPhone: '',
			street: '',
			streetNumber: '',
			houseNumber: '',
			city: '',
			postalCode: '',
			country: '',

			// booking
			idIgloo: null,
			tripId: null,
			paymentMethodId: null,

			checkIn: null,
			checkOut: null,
			tripDate: '',

			earlyCheckInRequest: false,
			lateCheckOutRequest: false,
			guests: '1',
		},
		mode: 'onSubmit',
	})

	// load data
	useEffect(() => {
		dispatch(fetchIgloos())
		dispatch(fetchTrips())
		dispatch(fetchCustomers())
		dispatch(fetchPaymentMethods())
	}, [dispatch])

	const bookingType = watch('bookingType')
	const showIgloo = bookingType === 'igloo' || bookingType === 'both'
	const showTrip = bookingType === 'trip' || bookingType === 'both'

	useEffect(() => {
		if (bookingToEdit?.id) return

		if (!showIgloo) {
			setValue('idIgloo', null)
			setValue('checkIn', null)
			setValue('checkOut', null)
			setValue('earlyCheckInRequest', false)
			setValue('lateCheckOutRequest', false)
			setValue('guests', '1')
		}

		if (!showTrip) {
			setValue('tripId', null)
			setValue('tripDate', '')
		}
	}, [showIgloo, showTrip, setValue, bookingToEdit])

	// existing customer by email
	const customerEmail = watch('customerEmail')
	const existingCustomer = useMemo(() => {
		return findExistingCustomerByEmail(customers, customerEmail)
	}, [customers, customerEmail])

	useEffect(() => {
		if (existingCustomer) {
			setValue('idCustomer', existingCustomer.id)
			setValue('customerName', existingCustomer.name ?? '')
			setValue('customerSurname', existingCustomer.surname ?? '')
			setValue('customerEmail', existingCustomer.email ?? '')
			setValue('customerPhone', existingCustomer.phone ?? '')
			setValue('street', existingCustomer.street ?? '')
			setValue('streetNumber', existingCustomer.streetNumber ?? '')
			setValue('houseNumber', existingCustomer.houseNumber ?? '')
			setValue('city', existingCustomer.city ?? '')
			setValue('postalCode', existingCustomer.postalCode ?? '')
			setValue('country', existingCustomer.country ?? '')
		} else {
			setValue('idCustomer', null)
		}
	}, [existingCustomer, setValue])

	const isExistingCustomer = !!watch('idCustomer')

	// selected igloo capacity
	const selectedIglooId = watch('idIgloo')?.value ?? null
	const selectedIgloo = useMemo(() => {
		if (!selectedIglooId) return null
		return (igloos ?? []).find(i => i.id === selectedIglooId) ?? null
	}, [igloos, selectedIglooId])

	const capacity = selectedIgloo?.capacity ?? null

	// options
	const iglooOptions = useMemo(() => (igloos ?? []).map(i => ({ label: i.name, value: i.id })), [igloos])
	const tripOptions = useMemo(() => (trips ?? []).map(t => ({ label: t.name, value: t.id })), [trips])
	const paymentOptions = useMemo(
		() => (paymentMethods ?? []).map(p => ({ label: p.name, value: p.id })),
		[paymentMethods]
	)

	// prefill edit
	useEffect(() => {
		if (!bookingToEdit) return

		const hasIgloo = !!bookingToEdit.idIgloo
		const hasTrip = !!bookingToEdit.tripId
		const type = hasIgloo && hasTrip ? 'both' : hasIgloo ? 'igloo' : 'trip'

		setValue('bookingType', type)

		setValue('idCustomer', bookingToEdit.idCustomer ?? null)

		const cust = (customers ?? []).find(c => c.id === bookingToEdit.idCustomer)
		if (cust) {
			setValue('customerEmail', cust.email ?? '')
		} else {
			setValue('customerName', bookingToEdit.customerName ?? '')
			setValue('customerSurname', bookingToEdit.customerSurname ?? '')
			setValue('customerEmail', bookingToEdit.customerEmail ?? '')
			setValue('customerPhone', bookingToEdit.customerPhone ?? '')
		}

		// booking
		setValue(
			'paymentMethodId',
			bookingToEdit.paymentMethodId
				? { label: bookingToEdit.paymentMethodName ?? 'Payment', value: bookingToEdit.paymentMethodId }
				: null
		)

		setValue(
			'idIgloo',
			bookingToEdit.idIgloo ? { label: bookingToEdit.iglooName ?? 'Igloo', value: bookingToEdit.idIgloo } : null
		)
		setValue(
			'tripId',
			bookingToEdit.tripId ? { label: bookingToEdit.tripName ?? 'Trip', value: bookingToEdit.tripId } : null
		)

		setValue('checkIn', parseDateOnlyToDate(bookingToEdit.checkIn))
		setValue('checkOut', parseDateOnlyToDate(bookingToEdit.checkOut))
		setValue('tripDate', bookingToEdit.tripDate ?? '')

		setValue('earlyCheckInRequest', !!bookingToEdit.earlyCheckInRequest)
		setValue('lateCheckOutRequest', !!bookingToEdit.lateCheckOutRequest)
		setValue('guests', String(bookingToEdit.guests ?? 1))
	}, [bookingToEdit, customers, setValue])

	function onCancel() {
		navigation.goBack()
	}

	const handleCheckInChange = date => {
		setValue('checkIn', date, { shouldValidate: true })
		const checkOut = getValues('checkOut')
		if (checkOut && date && checkOut < date) {
			setValue('checkOut', date, { shouldValidate: true })
		}
	}

	const handleCheckOutChange = date => {
		const checkIn = getValues('checkIn')
		if (checkIn && date && date < checkIn) {
			setValue('checkOut', checkIn, { shouldValidate: true })
			return
		}
		setValue('checkOut', date, { shouldValidate: true })
	}

	const onSubmit = async data => {
		try {
			let customerId = data.idCustomer

			// create customer if not existing
			if (!customerId) {
				const newCustomer = {
					name: data.customerName,
					surname: data.customerSurname,
					email: data.customerEmail,
					phone: data.customerPhone,
					street: data.street,
					streetNumber: data.streetNumber,
					houseNumber: data.houseNumber,
					city: data.city,
					postalCode: data.postalCode,
					country: data.country,
					createUser: false,
				}

				const created = await dispatch(addNewCustomer(newCustomer)).unwrap?.()
				await dispatch(fetchCustomers())
				customerId = created?.id
			}

			const newBooking = {
				idCustomer: +customerId,

				idIgloo: data.idIgloo?.value ?? null,
				tripId: data.tripId?.value ?? null,
				paymentMethodId: data.paymentMethodId?.value ?? null,

				checkIn: showIgloo ? formatDateOnly(data.checkIn) : null,
				checkOut: showIgloo ? formatDateOnly(data.checkOut) : null,
				tripDate: showTrip ? formatDateOnly(data.tripDate) : null,

				earlyCheckInRequest: !!data.earlyCheckInRequest,
				lateCheckOutRequest: !!data.lateCheckOutRequest,

				guests: showIgloo ? Number(data.guests ?? 1) : 1,
			}

			if (isEditing) {
				await dispatch(
					editBooking({
						id: bookingId,
						updatedBooking: { ...newBooking, id: bookingId },
					})
				).unwrap?.()
			} else {
				await dispatch(addNewBooking(newBooking)).unwrap?.()
			}

			await dispatch(fetchBookings())
			Alert.alert('Success', `Booking ${isEditing ? 'updated' : 'added'} successfully`, [{ text: 'OK' }])
			navigation.goBack()
		} catch (err) {
			console.log('Booking submit error:', err)
			setError('formError', { type: 'server', message: err?.message ?? 'Failed to save booking' })
			Alert.alert('Error', `Failed to ${isEditing ? 'edit' : 'add'} booking`)
		}
	}

	// for tripDate validation between checkIn/out
	const checkIn = watch('checkIn')
	const checkOut = watch('checkOut')

	return (
		<View style={styles.screen}>
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.scrollContent}
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}>
				{/* Header */}
				<View style={styles.header}>
					<Ionicons name="calendar" size={32} color={Colors.primary37} />
					<Text style={styles.headerTitle}>{isEditing ? 'Edit Booking' : 'Add New Booking'}</Text>
					<Text style={styles.headerSubtitle}>Create booking for igloo / trip / both</Text>
				</View>

				<View style={styles.formContainer}>
					{/* Customer lookup */}
					<View style={styles.sectionContainer}>
						<View style={styles.sectionHeader}>
							<Ionicons name="person" size={20} color={Colors.primary37} />
							<Text style={styles.sectionTitle}>Customer</Text>
						</View>

						<View style={styles.inputContainer}>
							<FormLabel>Customer email</FormLabel>
							<Controller
								control={control}
								name="customerEmail"
								rules={{
									required: 'Email is required',
									pattern: { value: EMAIL_REGEX, message: 'Invalid email address' },
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input
										textInputConfig={{
											onChangeText: onChange,
											onBlur,
											value,
											placeholder: 'Enter customer email',
											keyboardType: 'email-address',
											autoCapitalize: 'none',
										}}
									/>
								)}
							/>
							{errors.customerEmail && <Text style={styles.errorText}>{errors.customerEmail.message}</Text>}

							{isExistingCustomer ? (
								<Text style={styles.hintText}>Found existing customer ✅</Text>
							) : (
								<Text style={styles.hintText}>No customer found — fill details below</Text>
							)}
						</View>

						{!isExistingCustomer && (
							<>
								<View style={styles.inputsRow}>
									<View style={[styles.inputContainer, styles.inputHalf]}>
										<FormLabel>Name</FormLabel>
										<Controller
											control={control}
											name="customerName"
											rules={{ required: 'Name is required' }}
											render={({ field: { onChange, onBlur, value } }) => (
												<Input textInputConfig={{ onChangeText: onChange, onBlur, value, placeholder: 'Name' }} />
											)}
										/>
										{errors.customerName && <Text style={styles.errorText}>{errors.customerName.message}</Text>}
									</View>

									<View style={[styles.inputContainer, styles.inputHalf]}>
										<FormLabel>Surname</FormLabel>
										<Controller
											control={control}
											name="customerSurname"
											rules={{ required: 'Surname is required' }}
											render={({ field: { onChange, onBlur, value } }) => (
												<Input textInputConfig={{ onChangeText: onChange, onBlur, value, placeholder: 'Surname' }} />
											)}
										/>
										{errors.customerSurname && <Text style={styles.errorText}>{errors.customerSurname.message}</Text>}
									</View>
								</View>

								<View style={styles.inputContainer}>
									<FormLabel>Phone</FormLabel>
									<Controller
										control={control}
										name="customerPhone"
										rules={{
											required: 'Phone number can not be empty',
											pattern: { value: PHONE_REGEX, message: 'Invalid phone number' },
										}}
										render={({ field: { onChange, onBlur, value } }) => (
											<Input
												textInputConfig={{
													onChangeText: onChange,
													onBlur,
													value,
													placeholder: '+123456789',
													keyboardType: 'phone-pad',
												}}
											/>
										)}
									/>
									{errors.customerPhone && <Text style={styles.errorText}>{errors.customerPhone.message}</Text>}
								</View>

								<View style={styles.inputContainer}>
									<FormLabel>Street</FormLabel>
									<Controller
										control={control}
										name="street"
										rules={{ required: 'Street can not be empty' }}
										render={({ field: { onChange, onBlur, value } }) => (
											<Input textInputConfig={{ onChangeText: onChange, onBlur, value, placeholder: 'Street' }} />
										)}
									/>
									{errors.street && <Text style={styles.errorText}>{errors.street.message}</Text>}
								</View>

								<View style={styles.inputsRow}>
									<View style={[styles.inputContainer, styles.inputHalf]}>
										<FormLabel>Street number</FormLabel>
										<Controller
											control={control}
											name="streetNumber"
											rules={{ required: 'streetNumber can not be empty' }}
											render={({ field: { onChange, onBlur, value } }) => (
												<Input textInputConfig={{ onChangeText: onChange, onBlur, value, placeholder: '12 / 12A' }} />
											)}
										/>
										{errors.streetNumber && <Text style={styles.errorText}>{errors.streetNumber.message}</Text>}
									</View>

									<View style={[styles.inputContainer, styles.inputHalf]}>
										<FormLabel>House number (optional)</FormLabel>
										<Controller
											control={control}
											name="houseNumber"
											rules={{ required: false }}
											render={({ field: { onChange, onBlur, value } }) => (
												<Input textInputConfig={{ onChangeText: onChange, onBlur, value, placeholder: '12/3' }} />
											)}
										/>
										{errors.houseNumber && <Text style={styles.errorText}>{errors.houseNumber.message}</Text>}
									</View>
								</View>

								<View style={styles.inputsRow}>
									<View style={[styles.inputContainer, styles.inputHalf]}>
										<FormLabel>City</FormLabel>
										<Controller
											control={control}
											name="city"
											rules={{ required: 'City can not be empty' }}
											render={({ field: { onChange, onBlur, value } }) => (
												<Input textInputConfig={{ onChangeText: onChange, onBlur, value, placeholder: 'City' }} />
											)}
										/>
										{errors.city && <Text style={styles.errorText}>{errors.city.message}</Text>}
									</View>

									<View style={[styles.inputContainer, styles.inputHalf]}>
										<FormLabel>Country</FormLabel>
										<Controller
											control={control}
											name="country"
											rules={{ required: 'Country can not be empty' }}
											render={({ field: { onChange, onBlur, value } }) => (
												<Input textInputConfig={{ onChangeText: onChange, onBlur, value, placeholder: 'Country' }} />
											)}
										/>
										{errors.country && <Text style={styles.errorText}>{errors.country.message}</Text>}
									</View>
								</View>

								<View style={styles.inputContainer}>
									<FormLabel>Postal code</FormLabel>
									<Controller
										control={control}
										name="postalCode"
										rules={{ required: 'Postal code can not be empty' }}
										render={({ field: { onChange, onBlur, value } }) => (
											<Input textInputConfig={{ onChangeText: onChange, onBlur, value, placeholder: 'Postal code' }} />
										)}
									/>
									{errors.postalCode && <Text style={styles.errorText}>{errors.postalCode.message}</Text>}
								</View>
							</>
						)}
					</View>

					{/* Booking type + details */}
					<View style={styles.sectionContainer}>
						<View style={styles.sectionHeader}>
							<Ionicons name="options" size={20} color={Colors.primary37} />
							<Text style={styles.sectionTitle}>Booking</Text>
						</View>

						<View style={styles.inputContainer}>
							<FormLabel>Booking type</FormLabel>
							<Controller
								control={control}
								name="bookingType"
								rules={{ required: 'Choose booking type' }}
								render={({ field: { onChange, value } }) => <SegmentedBookingType value={value} onChange={onChange} />}
							/>
							{errors.bookingType && <Text style={styles.errorText}>{errors.bookingType.message}</Text>}
						</View>

						{showIgloo && (
							<View style={styles.inputContainer}>
								<FormLabel>Igloo</FormLabel>
								<Controller
									control={control}
									name="idIgloo"
									rules={{
										required: showIgloo ? 'Igloo is required' : false,
										validate: v => (!showIgloo ? true : !!v?.value || 'Igloo is required'),
									}}
									render={({ field: { onChange, value } }) => (
										<Dropdown
											data={iglooOptions}
											onChange={onChange}
											placeholder="Select igloo"
											selectedValue={value}
											isEditing={isEditing}
										/>
									)}
								/>
								{errors.idIgloo && <Text style={styles.errorText}>{errors.idIgloo.message}</Text>}

								{capacity ? (
									<Text style={styles.hintText}>Capacity: {capacity}</Text>
								) : (
									<Text style={styles.hintText}>Pick igloo to see capacity</Text>
								)}
							</View>
						)}

						{showTrip && (
							<View style={styles.inputContainer}>
								<FormLabel>Trip</FormLabel>
								<Controller
									control={control}
									name="tripId"
									rules={{
										required: showTrip ? 'Trip is required' : false,
										validate: v => (!showTrip ? true : !!v?.value || 'Trip is required'),
									}}
									render={({ field: { onChange, value } }) => (
										<Dropdown
											data={tripOptions}
											onChange={onChange}
											placeholder="Select trip"
											selectedValue={value}
											isEditing={isEditing}
											// listMaxHeight={320}
										/>
									)}
								/>
								{errors.tripId && <Text style={styles.errorText}>{errors.tripId.message}</Text>}
							</View>
						)}

						<View style={styles.inputContainer}>
							<FormLabel>Payment method</FormLabel>
							<Controller
								control={control}
								name="paymentMethodId"
								rules={{
									required: 'Payment method is required',
									validate: v => (!!v?.value ? true : 'Payment method is required'),
								}}
								render={({ field: { onChange, value } }) => (
									<Dropdown
										data={paymentOptions}
										onChange={onChange}
										placeholder="Select payment method"
										selectedValue={value}
										isEditing={isEditing}
										// listMaxHeight={320}
									/>
								)}
							/>
							{errors.paymentMethodId && <Text style={styles.errorText}>{errors.paymentMethodId.message}</Text>}
						</View>

						{showIgloo && (
							<>
								<View style={styles.inputsRow}>
									<View style={[styles.inputContainer, styles.inputHalf]}>
										<Controller
											control={control}
											name="checkIn"
											rules={{
												required: showIgloo ? 'Check-in is required' : false,
												validate: value => {
													if (!showIgloo) return true
													if (!value) return 'Check-in is required'

													const out = getValues('checkOut')
													if (out && value > out) {
														return 'Check-in must be before check-out'
													}

													if (!isEditing) {
														const today = new Date()
														today.setHours(0, 0, 0, 0)
														if (value < today) return 'Check-in date cannot be in the past'
													}
													return true
												},
											}}
											render={({ field: { value } }) => (
												<DateField
													label="Check-in"
													value={value}
													onChange={handleCheckInChange}
													error={errors.checkIn?.message}
												/>
											)}
										/>
									</View>

									<View style={[styles.inputContainer, styles.inputHalf]}>
										<Controller
											control={control}
											name="checkOut"
											rules={{
												required: showIgloo ? 'Check-out is required' : false,
												validate: value => {
													if (!showIgloo) return true
													if (!value) return 'Check-out is required'

													const inD = getValues('checkIn')
													if (inD && value < inD) return 'Check-out must be after check-in'

													if (!isEditing) {
														const today = new Date()
														today.setHours(0, 0, 0, 0)
														if (value < today) return 'Check-out date cannot be in the past'
													}
													return true
												},
											}}
											render={({ field: { value } }) => (
												<DateField
													label="Check-out"
													value={value}
													onChange={handleCheckOutChange}
													minDate={getValues('checkIn') ?? undefined}
													error={errors.checkOut?.message}
												/>
											)}
										/>
									</View>
								</View>

								<View style={styles.inputContainer}>
									<FormLabel>Guests</FormLabel>
									<Controller
										control={control}
										name="guests"
										rules={{
											required: showIgloo ? 'Guests is required' : false,
											validate: value => {
												if (!showIgloo) return true
												const num = Number(value)
												if (!Number.isFinite(num) || num < 1) return 'Min 1 guest'
												if (capacity && num > capacity) return `Max ${capacity} guests for selected igloo`
												return true
											},
										}}
										render={({ field: { onChange, onBlur, value } }) => (
											<Input
												textInputConfig={{
													onChangeText: onChange,
													onBlur,
													value: String(value ?? '1'),
													placeholder: '1',
													keyboardType: 'number-pad',
												}}
											/>
										)}
									/>
									{errors.guests && <Text style={styles.errorText}>{errors.guests.message}</Text>}
								</View>

								<View style={[styles.inputContainer, styles.switchContainer]}>
									<FormLabel>Early check-in request</FormLabel>
									<Controller
										control={control}
										name="earlyCheckInRequest"
										render={({ field: { onChange, value } }) => (
											<Switch
												value={!!value}
												onValueChange={onChange}
												trackColor={{ false: Colors.primary6, true: Colors.primary37 }}
												thumbColor={value ? Colors.white : Colors.greyLight}
											/>
										)}
									/>
								</View>

								<View style={[styles.inputContainer, styles.switchContainer]}>
									<FormLabel>Late check-out request</FormLabel>
									<Controller
										control={control}
										name="lateCheckOutRequest"
										render={({ field: { onChange, value } }) => (
											<Switch
												value={!!value}
												onValueChange={onChange}
												trackColor={{ false: Colors.primary6, true: Colors.primary37 }}
												thumbColor={value ? Colors.white : Colors.greyLight}
											/>
										)}
									/>
								</View>
							</>
						)}

						{showTrip && (
							<View style={styles.inputContainer}>
								<FormLabel>Trip date (YYYY-MM-DD)</FormLabel>
								<Controller
									control={control}
									name="tripDate"
									rules={{
										required: showTrip ? 'Trip date is required' : false,
										pattern: { value: DATE_REGEX, message: 'Date format must be YYYY-MM-DD' },
										validate: value => {
											if (!showTrip) return true
											if (!value) return 'Trip date is required'
											const d = parseDateOnlyToDate(value)
											if (!d) return 'Enter a valid date (YYYY-MM-DD)'

											if (bookingType === 'both') {
												if (!checkIn || !checkOut) return 'Set check-in and check-out first'
												if (!isBetweenDates(value, checkIn, checkOut)) {
													return 'Trip date must be between check-in and check-out dates'
												}
											}
											return true
										},
									}}
									render={({ field: { onChange, onBlur, value } }) => (
										<Input
											textInputConfig={{
												onChangeText: onChange,
												onBlur,
												value: value ?? '',
												placeholder: 'YYYY-MM-DD',
												autoCapitalize: 'none',
											}}
										/>
									)}
								/>
								{errors.tripDate && <Text style={styles.errorText}>{errors.tripDate.message}</Text>}
							</View>
						)}
					</View>

					{errors?.formError?.message && (
						<View style={{ paddingHorizontal: 16, marginTop: 8 }}>
							<Text style={styles.errorText}>{errors.formError.message}</Text>
						</View>
					)}

					{/* Buttons */}
					<View style={styles.buttonsContainer}>
						<Button onPress={onCancel} mode="secondary" style={styles.cancelButton}>
							Cancel
						</Button>
						<Button onPress={handleSubmit(onSubmit)} style={styles.submitButton} disabled={isSubmitting}>
							{isEditing ? 'Save changes' : 'Add booking'}
						</Button>
					</View>
				</View>
			</ScrollView>
		</View>
	)
}

export default BookingForm

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

	header: {
		alignItems: 'center',
		paddingVertical: 24,
		paddingHorizontal: 16,
		marginBottom: 8,
	},
	headerTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		color: Colors.primary97,
		marginTop: 12,
		textAlign: 'center',
	},
	headerSubtitle: {
		fontSize: 14,
		color: Colors.primary86,
		marginTop: 8,
		textAlign: 'center',
	},

	formContainer: {
		marginHorizontal: 16,
		marginBottom: 20,
	},

	sectionContainer: {
		backgroundColor: Colors.boxBg,
		borderRadius: 16,
		marginBottom: 20,
		borderWidth: 1,
		borderColor: Colors.primary19,
		overflow: 'hidden',
		shadowColor: Colors.primary67,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 4,
	},
	sectionHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: Colors.primary19,
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: Colors.primary37,
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: '600',
		color: Colors.primary97,
		marginLeft: 8,
		textTransform: 'uppercase',
		letterSpacing: 0.5,
	},

	inputContainer: {
		paddingHorizontal: 16,
		paddingVertical: 10,
	},
	inputsRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		gap: 12,
	},
	inputHalf: {
		flex: 1,
		paddingHorizontal: 0,
	},

	switchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},

	hintText: {
		marginTop: 8,
		color: Colors.primary86,
		fontSize: 12,
		opacity: 0.9,
	},

	errorText: {
		color: Colors.red,
		fontSize: 12,
		marginTop: 6,
		marginLeft: 4,
	},

	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 16,
		paddingHorizontal: 16,
		gap: 12,
	},
	cancelButton: {
		flex: 1,
		backgroundColor: Colors.primary19,
		borderColor: Colors.primary37,
		borderWidth: 1,
	},
	submitButton: {
		flex: 1,
		backgroundColor: Colors.primary37,
	},
})
