import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FlatList, Modal, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Colors } from '../constants/colors'

function Dropdown({ data, onChange, selectedValue, placeholder, isEditing }) {
	const [expanded, setExpanded] = useState(false)
	const [value, setValue] = useState(selectedValue ? selectedValue.label : placeholder)
	const [top, setTop] = useState(0)
	const buttonRef = useRef()

	// const selectedLabel = useMemo(() => {
	// 	if (isEditing && selectedValue) {
	// 		return data.find(item => item.value === selectedValue)?.label || placeholder
	// 	}
	// 	return selectedValue?.label || placeholder
	// }, [isEditing, selectedValue, data, placeholder])

	useEffect(() => {
		if (selectedValue) {
			setValue(selectedValue.label)
		}
	}, [selectedValue])

	const toggleExpanded = useCallback(() => {
		if (buttonRef.current) {
			// buttonRef.current.measure((fx, fy, width, height, px, py) => {
			//     setTop(py + height + (Platform.OS === 'android' ? -32 : 3))
			// })

			buttonRef.current.measure((fx, fy, width, height, px, py) => {
				setTop(py + height)
			})

			setExpanded(prev => !prev)
		}
	}, [])
	// const toggleExpanded = useCallback(() => setExpanded(prev => !prev), [expanded])

	const onSelect = useCallback(item => {
		onChange(item)
		setValue(item.label)
		setExpanded(false)
	})

	let selectedLabel

	if (!isEditing) {
		selectedLabel = (selectedValue && data.find(item => item.value === selectedValue.value)?.label) || placeholder
	}

	if (isEditing) {
		selectedLabel = (selectedValue && data.find(item => item.value === selectedValue)?.label) || placeholder
	}

	// const selectedLabel = (selectedValue && data.find(item => item.value === selectedValue.value)?.label) || placeholder

	return (
		<View
			ref={buttonRef}
			onLayout={event => {
				const layout = event.nativeEvent.layout
				const topOffset = layout.y
				const heightOfComponent = layout.height

				const finalValue = topOffset + heightOfComponent + (Platform.OS === 'android' ? -32 : 3)

				setTop(finalValue)
			}}>
			<TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={toggleExpanded}>
				<Text style={[styles.text, styles.buttonText]}>{value}</Text>
				<AntDesign name={expanded ? 'caretup' : 'caretdown'} color={Colors.primary97} />
			</TouchableOpacity>

			{expanded && (
				<Modal visible={expanded} transparent animationType="fade">
					<TouchableWithoutFeedback onPress={() => setExpanded(false)}>
						<View style={styles.backdrop}>
							<View style={[styles.options, { top }]}>
								<FlatList
									keyExtractor={item => item.value}
									data={data}
									renderItem={({ item }) => (
										<TouchableOpacity activeOpacity={0.8} style={styles.optionItem} onPress={() => onSelect(item)}>
											<Text style={styles.text}>{item.label}</Text>
										</TouchableOpacity>
									)}
									ItemSeparatorComponent={() => <View style={styles.separator} />}
									keyboardShouldPersistTaps="handled"
								/>
							</View>
						</View>
					</TouchableWithoutFeedback>
				</Modal>
			)}
		</View>
	)
}

export default Dropdown

const styles = StyleSheet.create({
	backdrop: {
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
	optionItem: {
		height: 40,
		justifyContent: 'center',
	},
	separator: {
		height: 4,
	},
	options: {
		position: 'absolute',
		// top: 53,
		left: 0,
		right: 0,
		backgroundColor: 'white',
		width: '100%',
		padding: 10,
		borderRadius: 6,
		maxHeight: 250,
	},
	text: {
		fontSize: 15,
		opacity: 0.8,
	},
	button: {
		height: 50,
		justifyContent: 'space-between',
		// backgroundColor: '#fff',
		backgroundColor: Colors.primary6,
		flexDirection: 'row',
		width: '100%',
		alignItems: 'center',
		paddingHorizontal: 15,
		borderRadius: 8,
	},
	buttonText: {
		color: Colors.white,
	},
})
