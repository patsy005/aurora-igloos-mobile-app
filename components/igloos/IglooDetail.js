import { Image, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import DetailContainer from '../shared/DetailContainer'
import IconButton from '../IconButton'
import { Colors } from '../../constants/colors'
import Rate from '../shared/Rate'
import { useDispatch } from 'react-redux'
import { deleteIgloo, fetchIgloos } from '../../slices/igloosSlice'

function IglooDetail({ igloo }) {
	const navigation = useNavigation()
	const dispatch = useDispatch()

	const discountAmount = igloo?.discount === 0 ? 'No discount' : `${igloo.discount}% off`

	function onEditIgloo() {
		navigation.navigate('IglooForm', {
			iglooId: igloo.id,
		})
	}

	function onDeleteIgloo() {
		dispatch(deleteIgloo(igloo.id))
			.then(() => dispatch(fetchIgloos()))
			.then(() => navigation.goBack())
	}

	return (
		<DetailContainer onEdit={onEditIgloo} onDelete={onDeleteIgloo}>
			<View style={styles.imageContainer}>
				<Image source={require('../../assets/images/igloo_6.jpg')} style={styles.image} />
			</View>

			<View>
				<Text style={styles.iglooName}>{igloo.name}</Text>
			</View>

			<View>
				<Text style={styles.detailTitle}>Promotion</Text>
				<View style={styles.detailInner}>
					<Text style={styles.detail}>{discountAmount}</Text>
					{igloo.discount !== 0 && (
						<IconButton iconName="eye" iconType="Octicons" color={Colors.primary67} size={24} onPress={() => {}} />
					)}
				</View>
			</View>

			<View style={styles.boxesContainer}>
				<View style={styles.boxContainer}>
					<Text style={[styles.detailTitle, styles.boxTitle]}>capacity</Text>
					<Text style={[styles.detail, styles.boxDetail]}>{igloo.capacity}</Text>
				</View>

				<View style={styles.boxContainer}>
					<Text style={[styles.detailTitle, styles.boxTitle]}>Price per night</Text>
					<Text style={[styles.detail, styles.boxDetail]}>${igloo.pricePerNight}</Text>
				</View>
			</View>

			<View style={styles.ratingContainer}>
				<Text style={styles.detailTitle}>Rating</Text>
				<Rate rating={4} color={Colors.primary67} size={20} style={styles.rate} />
			</View>
		</DetailContainer>
	)
}

export default IglooDetail

const styles = StyleSheet.create({
	imageContainer: {
		borderRadius: 8,
		overflow: 'hidden',
		width: '100%',
		height: 200,
		elevation: 4,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 5,
		shadowOpacity: 0.26,
	},
	image: {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
		resizeMode: 'center',
	},
	iglooName: {
		fontSize: 22,
		fontWeight: 'bold',
		color: Colors.primary97,
	},
	detailTitle: {
		textTransform: 'uppercase',
		fontWeight: 'light',
		fontSize: 18,
		color: Colors.greyLight,
	},
	detail: {
		fontWeight: 'bold',
		color: Colors.primary67,
		alignSelf: 'flex-end',
	},
	detailInner: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	boxesContainer: {
		gap: 20,
	},
	boxContainer: {
		backgroundColor: Colors.primary6,
		borderRadius: 6,
		padding: 7,
		gap: 10,
		elevation: 4,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 5,
		shadowOpacity: 0.26,
	},
	boxTitle: {
		fontSize: 15,
	},
	boxDetail: {
		fontSize: 20,
		alignSelf: 'flex-start',
	},
	ratingContainer: {
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
	},
	rate: {
		flexDirection: 'row',
	},
})
