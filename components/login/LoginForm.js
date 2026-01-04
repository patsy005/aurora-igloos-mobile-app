import { StyleSheet, View, Text } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { Colors } from '../../constants/colors'
import Input from '../form/Input'
import FormLabel from '../form/FormLabel'
import Button from '../Button'
import { clearError, login } from '../../slices/authSlice'

function LoginForm() {
	const dispatch = useDispatch()

	const {
		handleSubmit,
		control,
		reset,
		setError,
		clearErrors,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
	})

	const onSubmit = async data => {
		try {
			dispatch(clearError())
			clearErrors('root')

			await dispatch(login({ login: data.login, password: data.password })).unwrap()

			reset()
		} catch (err) {
			setError('root', { type: 'server', message: String(err?.message ?? err) })
		}
	}

	return (
		<View style={styles.screen}>
			<View style={styles.formContainer}>
				<View style={styles.inputContainer}>
					<FormLabel>Login</FormLabel>

					<Controller
						control={control}
						name="login"
						rules={{
							required: 'Please enter a login',
							minLength: { value: 3, message: 'Name must be at least 3 characters' },
							maxLength: { value: 50, message: 'Name must be at most 50 characters' },
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
							/>
						)}
					/>

					{errors.login && <Text style={styles.errorText}>{errors.login.message}</Text>}
				</View>

				<View style={styles.inputContainer}>
					<FormLabel>Password</FormLabel>

					<Controller
						control={control}
						name="password"
						rules={{
							required: 'Please enter a password',
							minLength: { value: 6, message: 'Password must be at least 6 characters' },
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								textInputConfig={{
									onChangeText: onChange,
									onBlur,
									value,
									secureTextEntry: true,
									autoCapitalize: 'none',
									autoCorrect: false,
								}}
							/>
						)}
					/>

					{errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
				</View>

				{errors.root?.message && <Text style={styles.errorText}>{errors.root.message}</Text>}

				<View style={styles.buttonsContainer}>
					<Button onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
						{isSubmitting ? 'Logging in...' : 'Login'}
					</Button>
				</View>
			</View>
		</View>
	)
}

export default LoginForm

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
	inputContainer: {
		gap: 10,
	},
	errorText: {
		color: Colors.red,
		marginTop: 6,
	},
	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
})
