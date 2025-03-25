import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../constants/colors'
import FormLabel from '../form/FormLabel'
import Input from '../form/Input'
import Button from '../Button'
import { DUMMY_DISCOUNTS } from '../../constants/dummy-data'
import { useDispatch, useSelector } from 'react-redux'
import { addNewDiscount, editDiscount, fetchDiscounts } from '../../slices/discountsSlice'
import { fetchIgloos } from '../../slices/igloosSlice'
import Dropdown from '../Dropdown'

function DiscountForm({ discountId }) {
	const discounts = useSelector(state => state.discounts.discounts)
	const igloos = useSelector(state => state.igloos.igloos)
	const {
		handleSubmit,
		register,
		setValue,
		control,
		formState: { errors, isLoading },
	} = useForm()
	const navigation = useNavigation()
	const dispatch = useDispatch()

	const isEditing = !!discountId

	useEffect(() => {
		dispatch(fetchIgloos())
	}, [])

	useEffect(() => {
		if (discountId) {
			const discount = discounts?.find(discount => discount.id === discountId)
			if (discount) {
				setValue('name', discount.name)
				setValue('discount', String(discount.discount))
				setValue('description', discount.description)
				setValue('igloo', { label: discount.iglooName, value: discount.idIgloo })
			}
		}
	}, [discountId])

	const iglooOptions = igloos.map(igloo => ({ label: igloo.name, value: igloo.id }))

	function onCancel() {
		navigation.goBack()
	}

	function onSubmit(data) {
		console.log(data)

		const newDiscount = {
			name: data.name,
			discount: data.discount,
			description: data.description,
			idIgloo: data.igloo.value,
			iglooName: data.igloo.label,
		}

		if (discountId) {
			dispatch(editDiscount({ id: discountId, discount: newDiscount }))
				.then(() => dispatch(fetchDiscounts()))
				.then(() => navigation.goBack())
		} else {
			dispatch(addNewDiscount(newDiscount))
				.then(() => dispatch(fetchDiscounts()))
				.then(() => navigation.goBack())
		}
	}
	return (
		<View style={styles.screen}>
			<View style={styles.formContainer}>
				<View style={styles.inputContainer}>
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
									return value !== '' || 'Please enter a name'
								},
							}}
						/>
						{errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
					</View>
				</View>
				<View style={styles.inputContainer}>
					<FormLabel>Discount</FormLabel>
					<View>
						<Controller
							control={control}
							render={({ field: { onChange, onBlur, value } }) => (
								<Input
									textInputConfig={{
										onChangeText: onChange,
										onBlur: onBlur,
										value,
										keyboardType: 'decimal-pad',
										placeholder: 'in %',
										placeholderTextColor: Colors.white,
									}}
								/>
							)}
							name="discount"
							rules={{
								required: 'Please enter a discount',
								validate: value => {
									if (value === '') {
										return 'Please enter a discount'
									}
									if (value < 0) {
										return 'Discount must be a positive number'
									}
									if (value > 100) {
										return 'Discount must be at most 100'
									}
								},
							}}
						/>
						{errors.discount && <Text style={styles.errorText}>{errors.discount.message}</Text>}
					</View>
				</View>
				<View style={styles.inputContainer}>
					<FormLabel>Description</FormLabel>
					<View>
						<Controller
							control={control}
							render={({ field: { onChange, onBlur, value } }) => (
								<Input
									textInputConfig={{
										onChangeText: onChange,
										onBlur: onBlur,
										value,
										multiline: true,
									}}
								/>
							)}
							name="description"
							rules={{
								required: 'Please enter a description',
								validate: value => {
									if (value === '') {
										return 'Please enter a description'
									}
								},
							}}
						/>
						{errors.description && <Text style={styles.errorText}>{errors.description.message}</Text>}
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

				<View style={styles.buttonsContainer}>
					<Button onPress={onCancel} mode="secondary">
						Cancel
					</Button>
					<Button onPress={handleSubmit(onSubmit)}>{discountId ? 'Edit' : 'Add'}</Button>
				</View>
			</View>
		</View>
	)
}

export default DiscountForm

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
	inputContainer: { gap: 20 },
	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		gap: 20,
	},
	errorText: {
		color: Colors.red,
	},
})
