import { useNavigation } from '@react-navigation/native'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, Text, View, ScrollView, Alert, Pressable, Image, Platform } from 'react-native'
import FormLabel from '../form/FormLabel'
import Input from '../form/Input'
import { Colors } from '../../constants/colors'
import Dropdown from '../Dropdown'
import { useEffect, useMemo } from 'react'
import Button from '../Button'
import { useDispatch, useSelector } from 'react-redux'
import * as ImagePicker from 'expo-image-picker'
import * as DocumentPicker from 'expo-document-picker'
import { addNewEmployee, editEmployee, fetchEmployees } from '../../slices/employeesSlice'
import { Ionicons } from '@expo/vector-icons'
import { fetchEmployeeRoles } from '../../slices/employeeRoleSlice'
import { fetchUserRoles } from '../../slices/userRoleSlice'

function EmployeeForm({ employeeId }) {
	const employees = useSelector(state => state.employees.employees)
	const roles = useSelector(state => state.employeeRoles.employeeRoles)
	const userRoles = useSelector(state => state.userRoles.userRoles)

	const dispatch = useDispatch()
	const navigation = useNavigation()

	const isEditing = !!employeeId

	const employeeToEdit = useMemo(() => {
		if (!employeeId) return null
		return employees?.find(e => e.id === employeeId) ?? null
	}, [employeeId, employees])

	// PASSWORD:
	const PASSWORD_REGEX =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])[A-Za-z\d !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{8,}$/

	const {
		handleSubmit,
		setValue,
		control,
		watch,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: {
			name: '',
			surname: '',
			email: '',
			phoneNumber: '',
			street: '',
			streetNumber: '',
			houseNumber: '',
			city: '',
			country: '',
			postalCode: '',
			role: null, // {label,value}
			userRole: null, // {label,value}
			login: '',
			password: '',
			img: null, // { uri, mime, name }
		},
	})

	useEffect(() => {
		dispatch(fetchEmployeeRoles())
		dispatch(fetchUserRoles())
	}, [dispatch])

	// Prefill przy edycji
	useEffect(() => {
		if (!employeeToEdit) return

		setValue('name', employeeToEdit.name ?? '')
		setValue('surname', employeeToEdit.surname ?? '')
		setValue('email', employeeToEdit.email ?? '')
		setValue('phoneNumber', employeeToEdit.phoneNumber ?? '')
		setValue('street', employeeToEdit.street ?? '')
		setValue('streetNumber', employeeToEdit.streetNumber ?? '')
		setValue('houseNumber', employeeToEdit.houseNumber ?? '')
		setValue('city', employeeToEdit.city ?? '')
		setValue('country', employeeToEdit.country ?? '')
		setValue('postalCode', employeeToEdit.postalCode ?? '')

		// EmployeeRole -> Dropdown
		if (employeeToEdit.roleId) {
			setValue('role', {
				label: employeeToEdit.role ?? employeeToEdit.roleName ?? 'Role',
				value: employeeToEdit.roleId,
			})
		} else {
			setValue('role', null)
		}

		// UserRole -> Dropdown
		if (employeeToEdit.userRoleId) {
			const ur = (userRoles ?? []).find(x => x.id === employeeToEdit.userRoleId)
			setValue('userRole', {
				label: ur?.roleName ?? ur?.name ?? 'User role',
				value: employeeToEdit.userRoleId,
			})
		} else {
			setValue('userRole', null)
		}

		setValue('login', employeeToEdit.login ?? '')
		setValue('password', '') // zawsze puste w edycji
	}, [employeeToEdit, setValue, userRoles])

	const rolesOptions = (roles ?? []).map(r => ({
		label: r.roleName,
		value: r.id,
	}))

	const userRoleOptions = (userRoles ?? []).map(r => ({
		label: r.roleName ?? r.name ?? `Role #${r.id}`,
		value: r.id,
	}))

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
				name: file.name ?? `employee_${Date.now()}.jpg`,
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
		const mime = ext === 'png' ? 'image/png' : 'image/jpeg'

		setValue('img', {
			uri,
			mime,
			name: `employee_${Date.now()}.${ext === 'png' ? 'png' : 'jpg'}`,
		})
	}

	function onCancel() {
		navigation.goBack()
	}

	async function onSubmit(data) {
		const formData = new FormData()

		formData.append('Name', data.name)
		formData.append('Surname', data.surname)
		formData.append('Email', data.email)
		formData.append('PhoneNumber', data.phoneNumber)
		formData.append('Street', data.street)
		formData.append('StreetNumber', data.streetNumber)
		formData.append('HouseNumber', data.houseNumber ?? '')
		formData.append('City', data.city)
		formData.append('Country', data.country)
		formData.append('PostalCode', data.postalCode)

		// EmployeeRole (backend: roleId)
		if (data.role?.value) formData.append('roleId', String(data.role.value))

		//  UserRole
		if (data.userRole?.value) formData.append('UserRoleId', String(data.userRole.value))

		// konto
		formData.append('Login', data.login)
		if (data.password && data.password.trim() !== '') {
			formData.append('Password', data.password)
		}

		// zdjęcie
		if (data.img?.uri) {
			formData.append('PhotoFile', {
				uri: data.img.uri,
				type: data.img.mime,
				name: data.img.name,
			})
		}

		try {
			if (employeeId) {
				formData.append('Id', String(employeeId))
				await dispatch(editEmployee({ id: employeeId, updatedEmployee: formData })).unwrap?.()
			} else {
				if (employees.map(e => e.login).includes(data.login))
					Alert.alert('Error', 'Email already exists. Please choose a different email.')
				await dispatch(addNewEmployee(formData)).unwrap?.()
			}

			await dispatch(fetchEmployees())

			Alert.alert('Success', `Employee ${employeeId ? 'updated' : 'added'} successfully`, [{ text: 'OK' }])
			navigation.goBack()
		} catch (e) {
			console.log('Submit error:', e)
			Alert.alert('Error', `Failed to ${employeeId ? 'update' : 'add'} employee`)
		}
	}

	return (
		<View style={styles.screen}>
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}>
				{/* Header */}
				<View style={styles.header}>
					<Ionicons name="person-add" size={32} color={Colors.primary37} />
					<Text style={styles.headerTitle}>{employeeId ? 'Edit Employee' : 'Add New Employee'}</Text>
					<Text style={styles.headerSubtitle}>
						{employeeId ? 'Update employee information' : 'Enter employee details'}
					</Text>
				</View>

				<View style={styles.formContainer}>
					{/* Personal Information */}
					<View style={styles.sectionContainer}>
						<View style={styles.sectionHeader}>
							<Ionicons name="person" size={20} color={Colors.primary37} />
							<Text style={styles.sectionTitle}>Personal Information</Text>
						</View>

						<View style={styles.inputsRow}>
							<View style={[styles.inputContainer, styles.inputHalf]}>
								<FormLabel>Name</FormLabel>
								<Controller
									control={control}
									name="name"
									rules={{
										required: 'Please enter a name',
										minLength: { value: 2, message: 'Name must be at least 2 characters' },
										maxLength: { value: 50, message: 'Name must be at most 50 characters' },
									}}
									render={({ field: { onChange, onBlur, value } }) => (
										<Input
											textInputConfig={{
												onChangeText: onChange,
												onBlur,
												value,
												placeholder: 'Enter first name',
											}}
										/>
									)}
								/>
								{errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
							</View>

							<View style={[styles.inputContainer, styles.inputHalf]}>
								<FormLabel>Surname</FormLabel>
								<Controller
									control={control}
									name="surname"
									rules={{
										required: 'Please enter a surname',
										minLength: { value: 2, message: 'Surname must be at least 2 characters' },
										maxLength: { value: 50, message: 'Surname must be at most 50 characters' },
									}}
									render={({ field: { onChange, onBlur, value } }) => (
										<Input
											textInputConfig={{
												onChangeText: onChange,
												onBlur,
												value,
												placeholder: 'Enter last name',
											}}
										/>
									)}
								/>
								{errors.surname && <Text style={styles.errorText}>{errors.surname.message}</Text>}
							</View>
						</View>
					</View>

					{/* Contact Information */}
					<View style={styles.sectionContainer}>
						<View style={styles.sectionHeader}>
							<Ionicons name="call" size={20} color={Colors.primary37} />
							<Text style={styles.sectionTitle}>Contact Information</Text>
						</View>

						<View style={styles.inputContainer}>
							<FormLabel>Email Address</FormLabel>
							<Controller
								control={control}
								name="email"
								rules={{
									required: 'Please enter an email address',
									pattern: {
										value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
										message: 'Invalid email address',
									},
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input
										textInputConfig={{
											onChangeText: onChange,
											onBlur,
											value,
											placeholder: 'Enter email address',
											keyboardType: 'email-address',
											autoCapitalize: 'none',
										}}
									/>
								)}
							/>
							{errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
						</View>

						<View style={styles.inputContainer}>
							<FormLabel>Phone Number</FormLabel>
							<Controller
								control={control}
								name="phoneNumber"
								rules={{
									required: 'Please enter a phone number',
									pattern: { value: /^\+?[1-9]\d{1,14}$/, message: 'Invalid phone number' },
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input
										textInputConfig={{
											onChangeText: onChange,
											onBlur,
											value,
											placeholder: 'Enter phone number',
											keyboardType: 'phone-pad',
										}}
									/>
								)}
							/>
							{errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber.message}</Text>}
						</View>
					</View>

					{/* Address */}
					<View style={styles.sectionContainer}>
						<View style={styles.sectionHeader}>
							<Ionicons name="location" size={20} color={Colors.primary37} />
							<Text style={styles.sectionTitle}>Address</Text>
						</View>

						<View style={styles.inputContainer}>
							<FormLabel>Street</FormLabel>
							<Controller
								control={control}
								name="street"
								rules={{ required: 'Please enter a street' }}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input
										textInputConfig={{
											onChangeText: onChange,
											onBlur,
											value,
											placeholder: 'Enter street name',
										}}
									/>
								)}
							/>
							{errors.street && <Text style={styles.errorText}>{errors.street.message}</Text>}
						</View>

						<View style={styles.inputsRow}>
							<View style={[styles.inputContainer, styles.inputHalf]}>
								<FormLabel>Street Number</FormLabel>
								<Controller
									control={control}
									name="streetNumber"
									rules={{ required: 'Please enter a street number' }}
									render={({ field: { onChange, onBlur, value } }) => (
										<Input
											textInputConfig={{
												onChangeText: onChange,
												onBlur,
												value,
												placeholder: 'Street #',
											}}
										/>
									)}
								/>
								{errors.streetNumber && <Text style={styles.errorText}>{errors.streetNumber.message}</Text>}
							</View>

							<View style={[styles.inputContainer, styles.inputHalf]}>
								<FormLabel>House Number</FormLabel>
								<Controller
									control={control}
									name="houseNumber"
									rules={{ required: false }}
									render={({ field: { onChange, onBlur, value } }) => (
										<Input
											textInputConfig={{
												onChangeText: onChange,
												onBlur,
												value,
												placeholder: 'House #',
											}}
										/>
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
									rules={{ required: 'Please enter a city' }}
									render={({ field: { onChange, onBlur, value } }) => (
										<Input
											textInputConfig={{
												onChangeText: onChange,
												onBlur,
												value,
												placeholder: 'Enter city',
											}}
										/>
									)}
								/>
								{errors.city && <Text style={styles.errorText}>{errors.city.message}</Text>}
							</View>

							<View style={[styles.inputContainer, styles.inputHalf]}>
								<FormLabel>Country</FormLabel>
								<Controller
									control={control}
									name="country"
									rules={{ required: 'Please enter a country' }}
									render={({ field: { onChange, onBlur, value } }) => (
										<Input
											textInputConfig={{
												onChangeText: onChange,
												onBlur,
												value,
												placeholder: 'Enter country',
											}}
										/>
									)}
								/>
								{errors.country && <Text style={styles.errorText}>{errors.country.message}</Text>}
							</View>
						</View>

						<View style={styles.inputContainer}>
							<FormLabel>Postal Code</FormLabel>
							<Controller
								control={control}
								name="postalCode"
								rules={{ required: 'Please enter a postal code' }}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input
										textInputConfig={{
											onChangeText: onChange,
											onBlur,
											value,
											placeholder: 'Enter postal code',
										}}
									/>
								)}
							/>
							{errors.postalCode && <Text style={styles.errorText}>{errors.postalCode.message}</Text>}
						</View>
					</View>

					{/* Employment Information */}
					<View style={styles.sectionContainer}>
						<View style={styles.sectionHeader}>
							<Ionicons name="briefcase" size={20} color={Colors.primary37} />
							<Text style={styles.sectionTitle}>Employment Information</Text>
						</View>

						<View style={styles.inputContainer}>
							<FormLabel>Employee role</FormLabel>
							<Controller
								control={control}
								name="role"
								rules={{
									required: 'Please select a role',
									validate: v => (!!v?.value ? true : 'Please select a role'),
								}}
								render={({ field: { onChange, value } }) => (
									<Dropdown
										data={rolesOptions}
										onChange={onChange}
										placeholder="Select employee role"
										selectedValue={value}
										isEditing={isEditing}
									/>
								)}
							/>
							{errors.role && <Text style={styles.errorText}>{errors.role.message}</Text>}
						</View>

						{/* ✅ USER ROLE */}
						<View style={styles.inputContainer}>
							<FormLabel>User role</FormLabel>
							<Controller
								control={control}
								name="userRole"
								rules={{
									required: 'Please select a user role',
									validate: v => (!!v?.value ? true : 'Please select a user role'),
								}}
								render={({ field: { onChange, value } }) => (
									<Dropdown
										data={userRoleOptions}
										onChange={onChange}
										placeholder="Select user role"
										selectedValue={value}
										isEditing={isEditing}
									/>
								)}
							/>
							{errors.userRole && <Text style={styles.errorText}>{errors.userRole.message}</Text>}
						</View>
					</View>

					{/* Account */}
					<View style={styles.sectionContainer}>
						<View style={styles.sectionHeader}>
							<Ionicons name="key" size={20} color={Colors.primary37} />
							<Text style={styles.sectionTitle}>Account</Text>
						</View>

						<View style={styles.inputContainer}>
							<FormLabel>Login</FormLabel>
							<Controller
								control={control}
								name="login"
								rules={{
									required: 'Login is required',
									minLength: { value: 2, message: 'Login must be at least 2 characters long' },
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input
										textInputConfig={{
											onChangeText: onChange,
											onBlur,
											value,
											placeholder: 'Enter login',
											autoCapitalize: 'none',
										}}
									/>
								)}
							/>
							{errors.login && <Text style={styles.errorText}>{errors.login.message}</Text>}
						</View>

						<View style={styles.inputContainer}>
							<FormLabel>Password {isEditing ? '(optional)' : ''}</FormLabel>
							<Controller
								control={control}
								name="password"
								rules={{
									pattern: {
										value: PASSWORD_REGEX,
										message: 'Password must be 8+ chars and include uppercase, lowercase, number and special character',
									},
									validate: v => {
										if (!isEditing && (!v || v.trim() === '')) return 'Password is required'
										return true
									},
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input
										textInputConfig={{
											onChangeText: onChange,
											onBlur,
											value,
											placeholder: isEditing ? 'Leave blank to keep current password' : 'Enter password',
											secureTextEntry: true,
											autoCapitalize: 'none',
										}}
									/>
								)}
							/>
							{errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
						</View>
					</View>

					{/* Photo */}
					<View style={styles.sectionContainer}>
						<View style={styles.sectionHeader}>
							<Ionicons name="image" size={20} color={Colors.primary37} />
							<Text style={styles.sectionTitle}>Photo</Text>
						</View>

						<View style={styles.inputContainer}>
							<Pressable onPress={pickImage} style={styles.imageBtn}>
								<Ionicons name="camera" size={18} color={Colors.primary97} />
								<Text style={styles.imageBtnText}>Choose image</Text>
							</Pressable>

							<View style={styles.previewBox}>
								{pickedImg?.uri ? (
									<Image source={{ uri: pickedImg.uri }} style={styles.previewImg} />
								) : employeeToEdit?.photoUrl ? (
									<Image
										source={{ uri: `http://10.0.2.2:5212/${employeeToEdit.photoUrl}` }}
										style={styles.previewImg}
									/>
								) : (
									<View style={styles.placeholderContainer}>
										<Text style={styles.placeholderIcon}>🖼️</Text>
										<Text style={styles.previewPlaceholder}>No image selected</Text>
									</View>
								)}
							</View>
						</View>
					</View>

					{/* Action Buttons */}
					<View style={styles.buttonsContainer}>
						<Button onPress={onCancel} mode="secondary" style={styles.cancelButton}>
							Cancel
						</Button>
						<Button onPress={handleSubmit(onSubmit)} style={styles.submitButton} disabled={isSubmitting}>
							{employeeId ? 'Update Employee' : 'Add Employee'}
						</Button>
					</View>
				</View>
			</ScrollView>
		</View>
	)
}

export default EmployeeForm

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
		paddingVertical: 8,
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
	errorText: {
		color: Colors.red,
		fontSize: 12,
		marginTop: 4,
		marginLeft: 4,
	},
	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 32,
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

	// photo bits
	imageBtn: {
		flexDirection: 'row',
		gap: 8,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 12,
		backgroundColor: Colors.primary19,
		borderWidth: 1,
		borderColor: Colors.primary37,
		marginBottom: 12,
	},
	imageBtnText: {
		color: Colors.primary97,
		fontWeight: '600',
		fontSize: 16,
	},
	previewBox: {
		height: 140,
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
		color: Colors.primary86,
		fontSize: 14,
		opacity: 0.7,
	},
})
