import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'

import { Colors } from '../../constants/colors'
import FormLabel from '../form/FormLabel'
import Input from '../form/Input'
import Button from '../Button'

import DateField from '../form/DateField'
import { formatDateOnly, parseDateOnly } from '../../utils/utils'

import { addNewDiscount, editDiscount, fetchDiscounts } from '../../slices/discountsSlice'

function DiscountForm({ discountId }) {
	const discounts = useSelector(state => state.discounts.discounts)

	const navigation = useNavigation()
	const dispatch = useDispatch()
	const isEditing = !!discountId

	const {
		handleSubmit,
		control,
		setValue,
		getValues,
		setError,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: {
			name: '',
			discount: '',
			description: '',
			validFrom: null, // Date
			validTo: null, // Date
		},
	})

	useEffect(() => {
		dispatch(fetchDiscounts())
	}, [dispatch])

	useEffect(() => {
		if (!discountId) return

		const discount = discounts?.find(d => d.id === discountId)
		if (!discount) return

		setValue('name', discount.name ?? '')
		setValue('discount', String(discount.discount ?? ''))
		setValue('description', discount.description ?? '')

		setValue('validFrom', parseDateOnly(discount.validFrom))
		setValue('validTo', parseDateOnly(discount.validTo))
	}, [discountId, discounts, setValue])

	function onCancel() {
		navigation.goBack()
	}

	const handleFromChange = date => {
		setValue('validFrom', date, { shouldValidate: true })
		const to = getValues('validTo')
		if (to && date && to < date) {
			setValue('validTo', date, { shouldValidate: true })
		}
	}

	const handleToChange = date => {
		const from = getValues('validFrom')
		if (from && date && date < from) {
			setValue('validTo', from, { shouldValidate: true })
			return
		}
		setValue('validTo', date, { shouldValidate: true })
	}

	async function onSubmit(data) {
		if (data.validFrom && data.validTo && data.validTo < data.validFrom) {
			setError('validTo', { type: 'validate', message: 'validTo must be >= validFrom' })
			return
		}

		const payload = {
			name: data.name,
			discount: Number(data.discount),
			description: data.description,

			validFrom: formatDateOnly(data.validFrom),
			validTo: formatDateOnly(data.validTo),
		}

		try {
			if (isEditing) {
				await dispatch(editDiscount({ id: discountId, updatedDiscount: { ...payload, id: discountId } })).unwrap?.()
			} else {
				await dispatch(addNewDiscount(payload)).unwrap?.()
			}
			await dispatch(fetchDiscounts())
			navigation.goBack()
			Alert.alert('Success', `Discount ${isEditing ? 'updated' : 'added'} successfully`)
		} catch (e) {
			Alert.alert('Error', `Failed to ${isEditing ? 'update' : 'add'} discount`)
		}
	}

	return (
		<View style={styles.screen}>
			<ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
				{/* Header */}
				<View style={styles.header}>
					<Ionicons name={isEditing ? 'create-outline' : 'add-circle-outline'} size={48} color={Colors.primary67} />
					<Text style={styles.headerTitle}>{isEditing ? 'Edit Discount' : 'Add Discount'}</Text>
					<Text style={styles.headerSubtitle}>
						{isEditing ? 'Update discount details' : 'Create a new discount offer'}
					</Text>
				</View>

				<View style={styles.formContainer}>
					{/* Basic Information */}
					<View style={styles.sectionContainer}>
						<View style={styles.sectionHeader}>
							<Ionicons name="information-circle-outline" size={20} color={Colors.primary67} />
							<Text style={styles.sectionTitle}>Basic Information</Text>
						</View>

						{/* NAME */}
						<View style={styles.inputContainer}>
							<FormLabel>Name</FormLabel>
							<Controller
								control={control}
								name="name"
								rules={{
									required: 'Please enter a name',
									validate: v => (v && v.trim() !== '' ? true : 'Please enter a name'),
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input textInputConfig={{ onChangeText: onChange, onBlur, value }} />
								)}
							/>
							{errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
						</View>

						{/* DISCOUNT */}
						<View style={styles.inputContainer}>
							<FormLabel>Discount (%)</FormLabel>
							<Controller
								control={control}
								name="discount"
								rules={{
									required: 'Please enter a discount',
									validate: v => {
										if (v === '' || v == null) return 'Please enter a discount'
										const n = Number(v)
										if (Number.isNaN(n)) return 'Discount must be a number'
										if (n < 0) return 'Discount must be a positive number'
										if (n > 100) return 'Discount must be at most 100'
										return true
									},
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input
										textInputConfig={{
											onChangeText: onChange,
											onBlur,
											value,
											keyboardType: 'decimal-pad',
											placeholder: 'e.g. 15',
										}}
									/>
								)}
							/>
							{errors.discount && <Text style={styles.errorText}>{errors.discount.message}</Text>}
						</View>

						{/* DESCRIPTION */}
						<View style={styles.inputContainer}>
							<FormLabel>Description</FormLabel>
							<Controller
								control={control}
								name="description"
								rules={{
									required: 'Please enter a description',
									validate: v => (v && v.trim() !== '' ? true : 'Please enter a description'),
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input textInputConfig={{ onChangeText: onChange, onBlur, value, multiline: true }} />
								)}
							/>
							{errors.description && <Text style={styles.errorText}>{errors.description.message}</Text>}
						</View>
					</View>

					{/* Validity Period */}
					<View style={styles.sectionContainer}>
						<View style={styles.sectionHeader}>
							<Ionicons name="calendar-outline" size={20} color={Colors.primary67} />
							<Text style={styles.sectionTitle}>Validity Period</Text>
						</View>

						{/* VALID FROM */}
						<View style={styles.inputContainer}>
							<Controller
								control={control}
								name="validFrom"
								rules={{ required: 'Please select valid from date' }}
								render={({ field: { value } }) => (
									<DateField
										label="Valid from"
										value={value}
										onChange={handleFromChange}
										error={errors.validFrom?.message}
									/>
								)}
							/>
						</View>

						{/* VALID TO */}
						<View style={styles.inputContainer}>
							<Controller
								control={control}
								name="validTo"
								rules={{
									required: 'Please select valid to date',
									validate: v => {
										const from = getValues('validFrom')
										if (!from || !v) return true
										return v >= from || 'Valid to date must be after or equal to valid from date'
									},
								}}
								render={({ field: { value } }) => (
									<DateField
										label="Valid to"
										value={value}
										onChange={handleToChange}
										minDate={getValues('validFrom') ?? undefined}
										error={errors.validTo?.message}
									/>
								)}
							/>
						</View>
					</View>

					{/* BUTTONS */}
					<View style={styles.buttonsContainer}>
						<Button onPress={onCancel} mode="secondary" disabled={isSubmitting} style={styles.cancelButton}>
							Cancel
						</Button>
						<Button onPress={handleSubmit(onSubmit)} disabled={isSubmitting} style={styles.submitButton}>
							{isEditing ? 'Save changes' : 'Add discount'}
						</Button>
					</View>
				</View>
			</ScrollView>
		</View>
	)
}

export default DiscountForm

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
