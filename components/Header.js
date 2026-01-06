import { Image, Pressable, StyleSheet, Text, View, Alert } from 'react-native'
import { FontAwesome6 } from '@expo/vector-icons'
import { Octicons } from '@expo/vector-icons'
import { Colors } from '../constants/colors'
import IconButton from './IconButton'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchMe, logoutThunk, selectUser } from '../slices/authSlice'
import { useNavigation } from '@react-navigation/native'

function Header() {
	const dispatch = useDispatch()
	const navigation = useNavigation()
	const user = useSelector(selectUser)

	useEffect(() => {
		dispatch(fetchMe())
	}, [dispatch])

	async function handleLogout() {
		Alert.alert('Logout', 'Are you sure you want to logout?', [
			{ text: 'Cancel', style: 'cancel' },
			{
				text: 'Logout',
				style: 'destructive',
				onPress: async () => {
					try {
						await dispatch(logoutThunk()).unwrap()
						navigation.reset({
							index: 0,
							routes: [{ name: 'Login' }],
						})
					} catch (e) {
						console.log('Logout error:', e)
					}
				},
			},
		])
	}

	// Extract user data
	const userName = user?.person?.name || user?.name || 'User'
	const userSurname = user?.person?.surname || user?.surname || ''
	const userEmail = user?.person?.email || user?.email || user?.login || 'email@example.com'
	const userPhotoUrl = user?.employee?.photoUrl || user?.photoUrl

	return (
		<View style={styles.header}>
			<View style={styles.flexRow}>
				<View style={styles.avatarWrapper}>
					<View style={styles.imageContainer}>
						{userPhotoUrl ? (
							<Image style={styles.image} source={{ uri: `http://10.0.2.2:5212/${userPhotoUrl}` }} />
						) : (
							<Image style={styles.image} source={require('../assets/images/user.jpg')} />
						)}
					</View>
					<View style={styles.activeIndicator} />
				</View>
				<View style={styles.userInfo}>
					<Text style={[styles.textShared, styles.textName]}>
						{userName} {userSurname}
					</Text>
					<Text style={[styles.textShared, styles.textEmail]}>{userEmail}</Text>
				</View>
			</View>
			<View style={styles.logoutContainer}>
				<IconButton iconName="sign-out" color={Colors.primary67} size={22} onPress={handleLogout} iconType="Octicons" />
			</View>
		</View>
	)
}

export default Header

const styles = StyleSheet.create({
	header: {
		backgroundColor: Colors.primary13,
		color: Colors.white,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: 50,
		paddingBottom: 12,
		paddingHorizontal: 20,
	},
	flexRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
		flex: 1,
	},
	avatarWrapper: {
		position: 'relative',
	},
	imageContainer: {
		width: 44,
		height: 44,
		borderRadius: 22,
		borderWidth: 2,
		borderColor: Colors.primary37,
		overflow: 'hidden',
		backgroundColor: Colors.primary19,
	},
	image: {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
		aspectRatio: 1 / 1,
	},
	activeIndicator: {
		position: 'absolute',
		bottom: 2,
		right: 2,
		width: 12,
		height: 12,
		borderRadius: 6,
		backgroundColor: '#4ade80',
		borderWidth: 2,
		borderColor: Colors.primary13,
	},
	userInfo: {
		flex: 1,
		gap: 2,
	},
	textShared: {
		color: Colors.white,
		fontSize: 14,
	},
	textName: {
		fontWeight: '700',
		color: Colors.primary97,
		fontSize: 15,
	},
	textEmail: {
		color: Colors.primary67,
		fontSize: 13,
	},
	logoutContainer: {
		paddingLeft: 12,
	},
})
