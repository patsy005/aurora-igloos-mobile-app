import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

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

		// ✅ dates jak na web: validFrom/validTo jako DateOnly-string -> Date
		setValue('validFrom', parseDateOnly(discount.validFrom))
		setValue('validTo', parseDateOnly(discount.validTo))
	}, [discountId, discounts, setValue])

	function onCancel() {
		navigation.goBack()
	}

	// pilnujemy żeby validTo nie było < validFrom
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
			// możesz też: setError zamiast auto-fix, ale auto-fix jest wygodny
			setValue('validTo', from, { shouldValidate: true })
			return
		}
		setValue('validTo', date, { shouldValidate: true })
	}

	async function onSubmit(data) {
		// walidacja range (dodatkowa)
		if (data.validFrom && data.validTo && data.validTo < data.validFrom) {
			setError('validTo', { type: 'validate', message: 'validTo must be >= validFrom' })
			return
		}

		const payload = {
			name: data.name,
			discount: Number(data.discount),
			description: data.description,

			// dates -> DateOnly string
			validFrom: formatDateOnly(data.validFrom),
			validTo: formatDateOnly(data.validTo),
		}

		if (isEditing) {
			await dispatch(editDiscount({ id: discountId, updatedDiscount: { ...payload, id: discountId } }))
				.unwrap()
				.then(() => dispatch(fetchDiscounts()))
				.then(() => navigation.goBack())
		} else {
			await dispatch(addNewDiscount(payload))
				.unwrap()
				.then(() => dispatch(fetchDiscounts()))
				.then(() => navigation.goBack())
		}
	}

	return (
		<View style={styles.screen}>
			<View style={styles.formContainer}>
				<Text style={styles.title}>{isEditing ? 'Edit Discount' : 'Add Discount'}</Text>

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
					<FormLabel>Discount</FormLabel>
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
									placeholder: 'in %',
									placeholderTextColor: Colors.white,
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

				{/* RANGE: validFrom -> validTo */}
				<View style={styles.inputContainer}>
					<Controller
						control={control}
						name="validFrom"
						rules={{ required: 'Please select validFrom' }}
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

				<View style={styles.inputContainer}>
					<Controller
						control={control}
						name="validTo"
						rules={{
							required: 'Please select validTo',
							validate: v => {
								const from = getValues('validFrom')
								if (!from || !v) return true
								return v >= from || 'validTo must be >= validFrom'
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

				{/* BUTTONS */}
				<View style={styles.buttonsContainer}>
					<Button onPress={onCancel} mode="secondary" disabled={isSubmitting}>
						Cancel
					</Button>
					<Button onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
						{isEditing ? 'Save changes' : 'Add discount'}
					</Button>
				</View>
			</View>
		</View>
	)
}

export default DiscountForm

const styles = StyleSheet.create({
	screen: { flex: 1, backgroundColor: Colors.primary6 },

	formContainer: {
		marginTop: 20,
		paddingVertical: 16,
		paddingHorizontal: 10,
		backgroundColor: Colors.primary13,
		borderRadius: 8,
		gap: 18,
		elevation: 4,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 5,
		shadowOpacity: 0.26,
	},

	title: { color: Colors.white, fontSize: 18, fontWeight: '700' },

	inputContainer: { gap: 10 },

	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		gap: 12,
		marginTop: 6,
	},

	errorText: { color: Colors.red },
})
