import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../constants/colors'
import FormLabel from '../form/FormLabel'
import Input from '../form/Input'
import Button from '../Button'
import { DUMMY_DISCOUNTS } from '../../constants/dummy-data'

function DiscountForm({ discountId }) {
	const {
		handleSubmit,
		register,
		setValue,
		control,
		formState: { errors, isLoading },
	} = useForm()
	const navigation = useNavigation()

	useEffect(() => {
		if (discountId) {
			const discount = DUMMY_DISCOUNTS.find(discount => discount.id === discountId)
			if (discount) {
				setValue('name', discount.name)
				setValue('discount', String(discount.discount))
				setValue('description', discount.description)
			}
		}
	}, [discountId])

	function onCancel() {
		navigation.goBack()
	}

	function onSubmit(data) {
		console.log(data)
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
