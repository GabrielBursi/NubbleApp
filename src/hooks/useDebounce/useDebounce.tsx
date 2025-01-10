import { useEffect, useState } from 'react'
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

	useEffect(() => {
		const timer = setTimeout(() => setDebouncedValue(value), delay)

		return () => {
			clearTimeout(timer)
		}
	}, [value, delay])

	return { debouncedValue, isDebouncing: value !== debouncedValue }
}
