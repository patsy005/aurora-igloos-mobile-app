import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, Text, View } from 'react-native'
import { getIgloos } from '../../constants/dummy-data'
import FormLabel from '../form/FormLabel'
import Input from '../form/Input'
import { Colors } from '../../constants/colors'
import Button from '../Button'

function IglooForm({ iglooId }) {
	const {
		handleSubmit,
		register,
		setValue,
		control,
		formState: { errors, isLoading },
	} = useForm()
	const navigation = useNavigation()

	useEffect(() => {
		if (iglooId) {
			const igloo = getIgloos().find(igloo => igloo.id === iglooId)
			if (igloo) {
				setValue('name', igloo.name)
				setValue('capacity', String(igloo.capacity))
				setValue('pricePerNight', String(igloo.pricePerNight))
			}
		}
	}, [iglooId])

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
				<View style={styles.inputContainer}>
					<FormLabel>Capacity</FormLabel>
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
									}}
								/>
							)}
							name="capacity"
							rules={{
								required: 'Please enter a capacity',
								validate: value => {
									if (value <= 0) {
										return 'Capacity must be greater than 0'
									}
									if (value % 1 !== 0) {
										return 'Capacity must be an integer'
									}
									return value !== '' || 'Please enter a capacity'
								},
							}}
						/>
						{errors.capacity && <Text style={styles.errorText}>{errors.capacity.message}</Text>}
					</View>
				</View>
				<View style={styles.inputContainer}>
					<FormLabel>Price per night</FormLabel>
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
									}}
								/>
							)}
							name="pricePerNight"
							rules={{
								required: 'Please enter a price',
								validate: value => {
									if (value <= 0) {
										return 'Price must be greater than 0'
									}
									return value !== '' || 'Please enter a price'
								},
							}}
						/>
						{errors.pricePerNight && <Text style={styles.errorText}>{errors.pricePerNight.message}</Text>}
					</View>
				</View>

				<View style={styles.buttonsContainer}>
					<Button onPress={onCancel} mode="secondary">
						Cancel
					</Button>
					<Button onPress={handleSubmit(onSubmit)}>{iglooId ? 'Edit' : 'Add'}</Button>
				</View>
			</View>
		</View>
	)
}

export default IglooForm

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
