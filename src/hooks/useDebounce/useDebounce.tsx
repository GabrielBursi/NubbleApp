import { useEffect, useMemo, useState } from 'react'
/**
 * @template TValue
 * @param {TValue} value
 * @param {number} delay
 * @default 500
 * @returns {Object} {
 * debouncedValue, isDebouncing
 * }
 */
export const useDebounce = <TValue = unknown,>(value: TValue, delay = 500) => {
	const [debouncedValue, setDebouncedValue] = useState<TValue>(value)

	const valorStringVazia = useMemo(
		() => typeof value === 'string' && !value.trim().length,
		[value]
	)

	useEffect(() => {
		if (valorStringVazia && typeof value === 'string')
			setDebouncedValue(value.trim() as TValue)

		const timer = setTimeout(() => setDebouncedValue(value), delay)

		return () => {
			clearTimeout(timer)
		}
	}, [value, delay, valorStringVazia])

	return {
		debouncedValue,
		isDebouncing: value !== debouncedValue && !valorStringVazia,
	} as const
}
