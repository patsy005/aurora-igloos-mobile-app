import { useNavigation } from '@react-navigation/native'
import { useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, Text, View, Pressable, Image, Platform, ScrollView, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import * as ImagePicker from 'expo-image-picker'
import * as DocumentPicker from 'expo-document-picker'
import { Picker } from '@react-native-picker/picker'

import Input from '../form/Input'
import FormLabel from '../form/FormLabel'
import Button from '../Button'
import { Colors } from '../../constants/colors'
import { addNewIgloo, editIgloo, fetchIgloos } from '../../slices/igloosSlice'
import { fetchDiscounts } from '../../slices/discountsSlice'

function IglooForm({ iglooId }) {
	const igloos = useSelector(state => state.igloos.igloos)
	const discounts = useSelector(state => state.discounts.discounts)

	const dispatch = useDispatch()
	const navigation = useNavigation()

	const iglooToEdit = useMemo(() => {
		if (!iglooId) return null
		return igloos?.find(i => i.id === iglooId) ?? null
	}, [iglooId, igloos])

	const {
		handleSubmit,
		control,
		setValue,
		watch,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: {
			name: '',
			capacity: '',
			price: '',
			description: '',
			idDiscount: '',
			img: null, // { uri, mime, name }
		},
	})

	useEffect(() => {
		dispatch(fetchDiscounts())
	}, [])

	useEffect(() => {
		if (!iglooToEdit) return
		setValue('name', iglooToEdit.name ?? '')
		setValue('capacity', String(iglooToEdit.capacity ?? ''))
		setValue('price', String(iglooToEdit.pricePerNight ?? ''))
		setValue('description', iglooToEdit.description ?? '')
		setValue('idDiscount', iglooToEdit.idDiscount ? String(iglooToEdit.idDiscount) : '')
	}, [iglooToEdit, setValue])

	const pickedImg = watch('img')

	// emulator(Android, DEV) -> DocumentPicker, reszta -> ImagePicker
	async function pickImage() {
		const useDocumentPicker = Platform.OS === 'android' && __DEV__

		if (useDocumentPicker) {
			const res = await DocumentPicker.getDocumentAsync({
				type: 'image/*',
				copyToCacheDirectory: true,
				multiple: false,
			})

			if (res.canceled) return

			const file = res.assets[0]

			setValue('img', {
				uri: file.uri,
				mime: file.mimeType ?? 'image/jpeg',
				name: file.name ?? `igloo_${Date.now()}.jpg`,
			})
			return
		}

		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
		if (status !== 'granted') return

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 0.9,
		})

		if (result.canceled) return

		const asset = result.assets[0]
		const uri = asset.uri

		const ext = uri.split('.').pop()?.toLowerCase()
		const mime = ext === 'png' ? 'image/png' : ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/jpeg'

		setValue('img', {
			uri,
			mime,
			name: `igloo_${Date.now()}.${ext === 'png' ? 'png' : 'jpg'}`,
		})
	}

	function onCancel() {
		navigation.goBack()
	}

	async function onSubmit(data) {
		const formData = new FormData()
		formData.append('Name', data.name)
		formData.append('Capacity', data.capacity)
		formData.append('PricePerNight', data.price)
		formData.append('Description', data.description ?? '')

		if (data.idDiscount !== null && data.idDiscount !== '') {
			formData.append('IdDiscount', data.idDiscount)
		}

		if (data.img?.uri) {
			formData.append('PhotoFile', {
				uri: data.img.uri,
				type: data.img.mime,
				name: data.img.name,
			})
		}

		try {
			if (iglooId) {
				formData.append('Id', String(iglooId))
				await dispatch(editIgloo({ id: iglooId, updatedIgloo: formData })).unwrap?.()
			} else {
				await dispatch(addNewIgloo(formData)).unwrap?.()
			}
			await dispatch(fetchIgloos())
			navigation.goBack()
			Alert.alert('Success', `Igloo ${iglooId ? 'updated' : 'added'} successfully`)
		} catch (e) {
			console.log('Submit error:', e)
			Alert.alert('Error', `Failed to ${iglooId ? 'update' : 'add'} igloo`)
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
						<Text style={styles.title}>{iglooId ? 'Edit Igloo' : 'Add New Igloo'}</Text>
						<Text style={styles.subtitle}>
							{iglooId ? 'Update igloo information' : 'Create a new Arctic experience'}
						</Text>
					</View>

					{/* NAME */}
					<View style={styles.field}>
						<FormLabel>Name</FormLabel>
						<Controller
							control={control}
							name="name"
							rules={{
								required: 'Name can not be empty',
								minLength: { value: 2, message: 'Igloo name must be at least 2 characters long' },
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

					{/* CAPACITY */}
					<View style={styles.field}>
						<FormLabel>Capacity</FormLabel>
						<Controller
							control={control}
							name="capacity"
							rules={{
								required: 'Igloo capacity is required',
								validate: v => {
									const n = Number(v)
									if (!v) return 'Igloo capacity is required'
									if (Number.isNaN(n)) return 'Capacity must be a number'
									if (n < 1) return 'Igloo capacity must be at least 1 person'
									if (!Number.isInteger(n)) return 'Capacity must be an integer'
									return true
								},
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<Input
									textInputConfig={{
										onChangeText: onChange,
										onBlur,
										value,
										keyboardType: Platform.OS === 'ios' ? 'number-pad' : 'numeric',
									}}
									hasError={!!errors.capacity}
								/>
							)}
						/>
						{errors.capacity && <Text style={styles.errorText}>{errors.capacity.message}</Text>}
					</View>

					{/* PRICE */}
					<View style={styles.field}>
						<FormLabel>Price per night</FormLabel>
						<Controller
							control={control}
							name="price"
							rules={{
								required: 'Igloo price is required',
								validate: v => {
									const n = Number(v)
									if (!v) return 'Igloo price is required'
									if (Number.isNaN(n)) return 'Price must be a number'
									if (n < 1) return 'Igloo price must be at least $1'
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
									}}
									hasError={!!errors.price}
								/>
							)}
						/>
						{errors.price && <Text style={styles.errorText}>{errors.price.message}</Text>}
					</View>

					{/* IMAGE PICKER */}
					<View style={styles.field}>
						<FormLabel>Image</FormLabel>

						<View style={styles.imageSection}>
							<Pressable onPress={pickImage} style={styles.imageBtn}>
								<Text style={styles.imageBtnIcon}>📷</Text>
								<Text style={styles.imageBtnText}>Choose Image</Text>
							</Pressable>

							<View style={styles.previewBox}>
								{pickedImg?.uri ? (
									<Image source={{ uri: pickedImg.uri }} style={styles.previewImg} />
								) : iglooToEdit?.photoUrl ? (
									<Image source={{ uri: `http://10.0.2.2:5212/${iglooToEdit.photoUrl}` }} style={styles.previewImg} />
								) : (
									<View style={styles.placeholderContainer}>
										<Text style={styles.placeholderIcon}>🖼️</Text>
										<Text style={styles.previewPlaceholder}>No image selected</Text>
									</View>
								)}
							</View>
						</View>
					</View>

					{/* DESCRIPTION */}
					<View style={styles.field}>
						<FormLabel>Description</FormLabel>
						<Controller
							control={control}
							name="description"
							render={({ field: { onChange, onBlur, value } }) => (
								<Input
									textInputConfig={{
										onChangeText: onChange,
										onBlur,
										value,
										multiline: true,
									}}
									hasError={!!errors.description}
								/>
							)}
						/>
						{errors.description && <Text style={styles.errorText}>{errors.description.message}</Text>}
					</View>

					{/* DISCOUNT SELECT */}
					<View style={styles.field}>
						<FormLabel>Discount</FormLabel>
						<Controller
							control={control}
							name="idDiscount"
							render={({ field: { onChange, value } }) => (
								<View style={styles.pickerContainer}>
									<View style={styles.pickerWrap}>
										<Picker selectedValue={value} onValueChange={onChange} style={styles.picker}>
											<Picker.Item label="🚫 No discount" value="" />
											{(discounts ?? []).map(d => (
												<Picker.Item key={d.id} label={`🎁 ${d.name}`} value={String(d.id)} />
											))}
										</Picker>
									</View>
								</View>
							)}
						/>
					</View>

					<View style={styles.buttonsContainer}>
						<Button onPress={onCancel} mode="secondary">
							Cancel
						</Button>
						<Button onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
							{iglooId ? 'Save changes' : 'Add igloo'}
						</Button>
					</View>
				</View>
			</ScrollView>
		</View>
	)
}

export default IglooForm

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

	// Picker styling
	pickerContainer: {
		backgroundColor: Colors.primary6,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: Colors.primary19,
		overflow: 'hidden',
	},
	pickerWrap: {
		backgroundColor: Colors.primary6,
		borderRadius: 12,
	},
	picker: {
		color: Colors.primary97,
	},

	// Image picker styling
	imageSection: {
		gap: 12,
	},
	imageBtn: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 12,
		backgroundColor: Colors.primary19,
		gap: 8,
		borderWidth: 1,
		borderColor: Colors.primary37,
	},
	imageBtnIcon: {
		fontSize: 16,
	},
	imageBtnText: {
		color: Colors.primary97,
		fontWeight: '600',
		fontSize: 16,
	},
	previewBox: {
		height: 120,
		borderRadius: 12,
		backgroundColor: Colors.primary6,
		overflow: 'hidden',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: Colors.primary19,
		borderStyle: 'dashed',
	},
	previewImg: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
	},
	placeholderContainer: {
		alignItems: 'center',
		gap: 8,
	},
	placeholderIcon: {
		fontSize: 32,
		opacity: 0.5,
	},
	previewPlaceholder: {
		color: Colors.greyLight,
		fontSize: 14,
		opacity: 0.6,
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
