import { useNavigation } from '@react-navigation/native'
import { useEffect, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, Text, View, Pressable, Image, Platform, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import * as ImagePicker from 'expo-image-picker'
import * as DocumentPicker from 'expo-document-picker'
import { Picker } from '@react-native-picker/picker'

import Input from '../form/Input'
import FormLabel from '../form/FormLabel'
import Button from '../Button'
import { Colors } from '../../constants/colors'

import { addNewTrip, editTrip, fetchTrips } from '../../slices/tripsSlice'
import { fetchEmployees } from '../../slices/employeesSlice'
import { fetchTripSeasons } from '../../slices/tripSeasonSlice'
import { fetchTripLevel } from '../../slices/tripLevelSlice'

function TripForm({ tripId }) {
	const trips = useSelector(state => state.trips.trips)
	const employees = useSelector(state => state.employees.employees)
	const tripSeasons = useSelector(state => state.tripSeasons.tripSeasons)
	const tripLevels = useSelector(state => state.tripLevels.tripLevels)

	const dispatch = useDispatch()
	const navigation = useNavigation()

	const tripToEdit = useMemo(() => {
		if (!tripId) return null
		return trips?.find(t => t.id === tripId) ?? null
	}, [tripId, trips])

	const guides = useMemo(() => {
		return (employees ?? []).filter(e => e.role === 'Guide')
	}, [employees])

	const {
		handleSubmit,
		control,
		setValue,
		watch,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: {
			name: '',
			duration: '',
			shortDescription: '',
			longDescription: '',
			levelOfDifficultyId: '',
			seasonId: '',
			guideId: '',
			pricePerPerson: '',
			img: null, // { uri, mime, name }
		},
	})

	useEffect(() => {
		dispatch(fetchEmployees())
		dispatch(fetchTripSeasons())
		dispatch(fetchTripLevel())
	}, [dispatch])

	useEffect(() => {
		if (!tripToEdit) return

		setValue('name', tripToEdit.name ?? '')
		setValue('duration', String(tripToEdit.duration ?? ''))
		setValue('shortDescription', tripToEdit.shortDescription ?? '')
		setValue('longDescription', tripToEdit.longDescription ?? '')
		setValue('levelOfDifficultyId', tripToEdit.levelOfDifficultyId ? String(tripToEdit.levelOfDifficultyId) : '')
		setValue('seasonId', tripToEdit.seasonId ? String(tripToEdit.seasonId) : '')
		setValue('guideId', tripToEdit.guideId ? String(tripToEdit.guideId) : '')
		setValue('pricePerPerson', String(tripToEdit.pricePerPerson ?? ''))
	}, [tripToEdit, setValue])

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
				name: file.name ?? `trip_${Date.now()}.jpg`,
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
			name: `trip_${Date.now()}.${ext === 'png' ? 'png' : 'jpg'}`,
		})
	}

	function onCancel() {
		navigation.goBack()
	}

	async function onSubmit(data) {
		const formData = new FormData()

		formData.append('Name', data.name)
		formData.append('Duration', String(data.duration))
		formData.append('ShortDescription', data.shortDescription)
		formData.append('LongDescription', data.longDescription)
		formData.append('PricePerPerson', String(data.pricePerPerson))

		if (data.seasonId) formData.append('SeasonId', data.seasonId)
		if (data.levelOfDifficultyId) formData.append('LevelOfDifficultyId', data.levelOfDifficultyId)
		if (data.guideId) formData.append('GuideId', data.guideId)

		if (data.img?.uri) {
			formData.append('PhotoFile', {
				uri: data.img.uri,
				type: data.img.mime,
				name: data.img.name,
			})
		}

		try {
			if (tripId) {
				formData.append('Id', String(tripId))
				await dispatch(editTrip({ id: tripId, updatedTrip: formData })).unwrap?.()
			} else {
				await dispatch(addNewTrip(formData)).unwrap?.()
			}

			await dispatch(fetchTrips())
			navigation.goBack()
		} catch (e) {
			console.log('Submit error:', e)
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
						<Text style={styles.title}>{tripId ? 'Edit Trip' : 'Add New Trip'}</Text>
						<Text style={styles.subtitle}>{tripId ? 'Update trip information' : 'Create a new trip offer'}</Text>
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

					{/* DURATION */}
					<View style={styles.field}>
						<FormLabel>Duration (days)</FormLabel>
						<Controller
							control={control}
							name="duration"
							rules={{
								required: 'Duration is required',
								validate: v => {
									const n = Number(v)
									if (!v) return 'Duration is required'
									if (Number.isNaN(n)) return 'Duration must be a number'
									if (n < 1) return 'Duration must be at least 1 day'
									if (!Number.isInteger(n)) return 'Duration must be an integer'
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
									hasError={!!errors.duration}
								/>
							)}
						/>
						{errors.duration && <Text style={styles.errorText}>{errors.duration.message}</Text>}
					</View>

					{/* SHORT DESCRIPTION */}
					<View style={styles.field}>
						<FormLabel>Short description</FormLabel>
						<Controller
							control={control}
							name="shortDescription"
							rules={{
								required: 'Short description is required',
								minLength: { value: 10, message: 'Short description must be at least 10 characters long' },
								maxLength: { value: 200, message: 'Short description can be at most 200 characters long' },
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<Input
									textInputConfig={{
										onChangeText: onChange,
										onBlur,
										value,
										multiline: true,
									}}
									hasError={!!errors.shortDescription}
								/>
							)}
						/>
						{errors.shortDescription && <Text style={styles.errorText}>{errors.shortDescription.message}</Text>}
					</View>

					{/* LONG DESCRIPTION */}
					<View style={styles.field}>
						<FormLabel>Long description</FormLabel>
						<Controller
							control={control}
							name="longDescription"
							rules={{
								required: 'Long description is required',
								minLength: { value: 20, message: 'Long description must be at least 20 characters long' },
								maxLength: { value: 1000, message: 'Long description can be at most 1000 characters long' },
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<Input
									textInputConfig={{
										onChangeText: onChange,
										onBlur,
										value,
										multiline: true,
									}}
									hasError={!!errors.longDescription}
								/>
							)}
						/>
						{errors.longDescription && <Text style={styles.errorText}>{errors.longDescription.message}</Text>}
					</View>

					{/* PRICE */}
					<View style={styles.field}>
						<FormLabel>Price per person</FormLabel>
						<Controller
							control={control}
							name="pricePerPerson"
							rules={{
								required: 'Price per person is required',
								validate: v => {
									const n = Number(v)
									if (!v) return 'Price per person is required'
									if (Number.isNaN(n)) return 'Price must be a number'
									if (n < 0) return 'Price per person must be at least 0'
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
									hasError={!!errors.pricePerPerson}
								/>
							)}
						/>
						{errors.pricePerPerson && <Text style={styles.errorText}>{errors.pricePerPerson.message}</Text>}
					</View>

					{/* SEASON */}
					<View style={styles.field}>
						<FormLabel>Season</FormLabel>
						<Controller
							control={control}
							name="seasonId"
							rules={{ required: 'Season is required' }}
							render={({ field: { onChange, value } }) => (
								<View style={styles.pickerContainer}>
									<View style={styles.pickerWrap}>
										<Picker selectedValue={value ?? ''} onValueChange={v => onChange(String(v))} style={styles.picker}>
											<Picker.Item label="Select trip season" value="" />
											{(tripSeasons ?? []).map(s => (
												<Picker.Item key={s.id} label={s.name} value={String(s.id)} />
											))}
										</Picker>
									</View>
								</View>
							)}
						/>
						{errors.seasonId && <Text style={styles.errorText}>{errors.seasonId.message}</Text>}
					</View>

					{/* LEVEL */}
					<View style={styles.field}>
						<FormLabel>Level of difficulty</FormLabel>
						<Controller
							control={control}
							name="levelOfDifficultyId"
							rules={{ required: 'Level of difficulty is required' }}
							render={({ field: { onChange, value } }) => (
								<View style={styles.pickerContainer}>
									<View style={styles.pickerWrap}>
										<Picker selectedValue={value ?? ''} onValueChange={v => onChange(String(v))} style={styles.picker}>
											<Picker.Item label="Select level of difficulty" value="" />
											{(tripLevels ?? []).map(l => (
												<Picker.Item key={l.id} label={l.name} value={String(l.id)} />
											))}
										</Picker>
									</View>
								</View>
							)}
						/>
						{errors.levelOfDifficultyId && <Text style={styles.errorText}>{errors.levelOfDifficultyId.message}</Text>}
					</View>

					{/* GUIDE */}
					<View style={styles.field}>
						<FormLabel>Guide</FormLabel>
						<Controller
							control={control}
							name="guideId"
							rules={{ required: 'Guide is required' }}
							render={({ field: { onChange, value } }) => (
								<View style={styles.pickerContainer}>
									<View style={styles.pickerWrap}>
										<Picker selectedValue={value ?? ''} onValueChange={v => onChange(String(v))} style={styles.picker}>
											<Picker.Item label="Select guide" value="" />
											{guides.map(g => (
												<Picker.Item key={g.id} label={`${g.name} ${g.surname}`} value={String(g.id)} />
											))}
										</Picker>
									</View>
								</View>
							)}
						/>
						{errors.guideId && <Text style={styles.errorText}>{errors.guideId.message}</Text>}
					</View>

					{/* IMAGE */}
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
								) : tripToEdit?.photoUrl ? (
									<Image source={{ uri: `http://10.0.2.2:5212/${tripToEdit.photoUrl}` }} style={styles.previewImg} />
								) : (
									<View style={styles.placeholderContainer}>
										<Text style={styles.placeholderIcon}>🖼️</Text>
										<Text style={styles.previewPlaceholder}>No image selected</Text>
									</View>
								)}
							</View>
						</View>
					</View>

					<View style={styles.buttonsContainer}>
						<Button onPress={onCancel} mode="secondary">
							Cancel
						</Button>
						<Button onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
							{tripId ? 'Save changes' : 'Add trip'}
						</Button>
					</View>
				</View>
			</ScrollView>
		</View>
	)
}

export default TripForm

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
