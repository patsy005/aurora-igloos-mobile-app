import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { FontAwesome6 } from '@expo/vector-icons'
import { Octicons } from '@expo/vector-icons'
import { Colors } from '../constants/colors'
import IconButton from './IconButton'

function Header() {
	return (
		<View style={styles.header}>
			<View style={styles.flexRow}>
				<View style={styles.imageContainer}>
					<Image style={styles.image} source={require('../assets/images/user.jpg')} />
				</View>
				<View>
					<Text style={[styles.textShared, styles.textName]}>Alice Wonderland</Text>
					<Text style={[styles.textShared, styles.textEmail]}>a.wonderland@mail.com</Text>
				</View>
			</View>
			<View style={styles.iconsContainer}>
				<IconButton iconName="comment" color={Colors.white} size={20} onPress={() => {}} iconType='FontAwesome6' />
				<IconButton iconName="bell" color={Colors.white} size={20} onPress={() => {}} iconType='FontAwesome6' />
				<IconButton iconName="sign-out" color={Colors.white} size={20} onPress={() => {}} iconType='Octicons' />
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
		paddingTop: 50,
		paddingHorizontal: 20,
		gap: 15,
	},
	imageContainer: {
		width: 40,
		height: 40,
		borderRadius: 50,
		borderWidth: 1,
		borderColor: Colors.primary67,
		overflow: 'hidden',
	},
	image: {
		width: '100%',
		height: '100%',
		// borderRadius: 50,
		objectFit: 'cover',
		aspectRatio: 1 / 1,
	},
	textShared: {
		color: Colors.white,
		fontSize: 14,
	},
	textName: {
		fontWeight: 'bold',
		color: Colors.primary67,
	},
	textEmail: {
		color: Colors.primary97,
	},
	iconsContainer: {
		flexDirection: 'row',
		gap: 5,
		alignItems: 'center',
	},
    flexRow: {
        flexDirection: 'row',
        gap: 15,
    }
})
