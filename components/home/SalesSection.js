import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useMemo } from 'react'
import { Colors } from '../../constants/colors'

const clamp = (val, min, max) => Math.max(min, Math.min(max, val))

const formatCurrency = value => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(value)
}

function SalesSection({ months, sales, isLoading, error, onRefresh }) {
	const label = months === 12 ? 'Last 12 months' : months === 6 ? 'Last 6 months' : `Last ${months} months`

	const maxValue = useMemo(() => {
		const vals = (sales ?? []).map(x => x?.revenueCurrentYear ?? 0)
		return Math.max(1, ...vals)
	}, [sales])

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Ionicons name="cash" size={20} color={Colors.primary37} />
				<Text style={styles.headerTitle}>Sales · {label}</Text>
			</View>

			<View style={styles.content}>
				{/* Range selector */}
				<View style={styles.rangeRow}>
					<Text style={styles.rangeLabel}>Range</Text>
					<View style={styles.buttonGroup}>
						<Pressable
							onPress={() => onRefresh(6)}
							style={[styles.rangeButton, months === 6 && styles.rangeButtonActive]}>
							<Text style={[styles.rangeButtonText, months === 6 && styles.rangeButtonTextActive]}>6m</Text>
						</Pressable>
						<Pressable
							onPress={() => onRefresh(12)}
							style={[styles.rangeButton, months === 12 && styles.rangeButtonActive]}>
							<Text style={[styles.rangeButtonText, months === 12 && styles.rangeButtonTextActive]}>12m</Text>
						</Pressable>
					</View>
				</View>

				{isLoading && <Text style={styles.loadingText}>Loading sales...</Text>}
				{!!error && <Text style={styles.errorText}>Chart error: {String(error?.message ?? error)}</Text>}

				{!isLoading && !error && (!sales || sales.length === 0) && (
					<Text style={styles.loadingText}>No chart data.</Text>
				)}

				{!!sales?.length && (
					<View style={styles.chartContainer}>
						{sales.map(row => {
							const current = row?.revenueCurrentYear ?? 0
							const previous = row?.revenuePreviousYear ?? 0

							const widthPct = clamp((current / maxValue) * 100, 2, 100)

							return (
								<View key={row.month} style={styles.chartRow}>
									<View style={styles.monthContainer}>
										<Text style={styles.monthText}>{row.month}</Text>
									</View>

									<View style={styles.barContainer}>
										<View style={[styles.bar, { width: `${widthPct}%` }]} />
									</View>

									<View style={styles.valuesContainer}>
										<Text style={styles.currentValue}>{formatCurrency(current)}</Text>
										<Text style={styles.previousValue}>{formatCurrency(previous)} prev</Text>
									</View>
								</View>
							)
						})}
					</View>
				)}
			</View>
		</View>
	)
}

export default SalesSection

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.boxBg,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: Colors.primary19,
		overflow: 'hidden',
		shadowColor: Colors.primary67,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 4,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: Colors.primary19,
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: Colors.primary37,
		gap: 8,
	},
	headerTitle: {
		fontSize: 16,
		fontWeight: '600',
		color: Colors.primary97,
		textTransform: 'uppercase',
		letterSpacing: 0.5,
	},
	content: {
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
	rangeRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 12,
	},
	rangeLabel: {
		fontSize: 13,
		color: Colors.primary67,
		fontWeight: '500',
	},
	buttonGroup: {
		flexDirection: 'row',
		gap: 8,
	},
	rangeButton: {
		paddingHorizontal: 16,
		paddingVertical: 6,
		borderRadius: 8,
		backgroundColor: Colors.primary19,
		borderWidth: 1,
		borderColor: Colors.primary37,
	},
	rangeButtonActive: {
		backgroundColor: Colors.primary37,
		borderColor: Colors.primary67,
	},
	rangeButtonText: {
		fontSize: 13,
		color: Colors.primary67,
		fontWeight: '500',
	},
	rangeButtonTextActive: {
		color: Colors.primary97,
		fontWeight: '600',
	},
	loadingText: {
		fontSize: 13,
		color: Colors.primary67,
		textAlign: 'center',
		paddingVertical: 20,
	},
	errorText: {
		fontSize: 13,
		color: '#ff6b6b',
		textAlign: 'center',
		paddingVertical: 20,
	},
	chartContainer: {
		marginTop: 10,
		gap: 10,
	},
	chartRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	monthContainer: {
		width: 52,
	},
	monthText: {
		fontSize: 12,
		color: Colors.primary67,
		fontWeight: '500',
	},
	barContainer: {
		flex: 1,
		height: 24,
		backgroundColor: Colors.primary19,
		borderRadius: 4,
		overflow: 'hidden',
	},
	bar: {
		height: '100%',
		backgroundColor: Colors.primary67,
		borderRadius: 4,
	},
	valuesContainer: {
		width: 110,
		alignItems: 'flex-end',
	},
	currentValue: {
		fontSize: 13,
		color: Colors.primary97,
		fontWeight: '600',
	},
	previousValue: {
		fontSize: 11,
		color: Colors.primary67,
	},
})
