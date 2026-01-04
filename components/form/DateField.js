import { useState } from 'react'
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import Button from '../Button'
import { Colors } from '../../constants/colors'

export default function DateField({
	label,
	value, // Date | null
	onChange, // (Date) => void
	minDate,
	maxDate,
	error,
}) {
	const [open, setOpen] = useState(false)

	const displayValue = value ? value.toISOString().slice(0, 10) : 'Select date'

	return (
		<View style={styles.wrapper}>
			<Text style={styles.label}>{label}</Text>

			<Pressable onPress={() => setOpen(true)} style={[styles.inputLike, !!error && styles.inputError]}>
				<Text style={styles.valueText}>{displayValue}</Text>
			</Pressable>

			{!!error && <Text style={styles.errorText}>{error}</Text>}

			{/* ANDROID: popup */}
			{open && Platform.OS === 'android' && (
				<DateTimePicker
					value={value ?? new Date()}
					mode="date"
					display="default"
					minDate={minDate}
					maxDate={maxDate}
					onChange={(event, selectedDate) => {
						setOpen(false)
						if (event.type === 'dismissed') return
						if (selectedDate) onChange(selectedDate)
					}}
				/>
			)}

			{/* iOS: inline + Done */}
			{open && Platform.OS === 'ios' && (
				<View style={styles.iosBox}>
					<DateTimePicker
						value={value ?? new Date()}
						mode="date"
						display="spinner"
						minDate={minDate}
						maxDate={maxDate}
						onChange={(event, selectedDate) => {
							if (selectedDate) onChange(selectedDate)
						}}
						style={{ backgroundColor: Colors.primary13 }}
					/>
					<View style={styles.iosActions}>
						<Button mode="secondary" onPress={() => setOpen(false)}>
							Done
						</Button>
					</View>
				</View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: { gap: 10 },
	label: { color: Colors.white, opacity: 0.9, fontSize: 13 },

	inputLike: {
		paddingVertical: 12,
		paddingHorizontal: 12,
		borderRadius: 8,
		backgroundColor: Colors.primary6,
		borderWidth: 1,
		borderColor: Colors.primary37,
	},
	valueText: { color: Colors.white },

	inputError: { borderColor: Colors.red },
	errorText: { color: Colors.red, marginTop: 6 },

	iosBox: {
		marginTop: 8,
		borderRadius: 10,
		overflow: 'hidden',
		borderWidth: 1,
		borderColor: Colors.primary37,
	},
	iosActions: {
		padding: 10,
		alignItems: 'flex-end',
		backgroundColor: Colors.primary13,
	},
})
