import { renderHook } from '@testing-library/react-native'

import { useControlledInput } from './useControlledInput'

describe('useControlledInput', () => {
	it('should return maxValue when rules contains max as a number', () => {
		const { result } = renderHook(() => useControlledInput({ max: 10 }))

		expect(result.current.maxValue).toBe(10)
		expect(result.current.minValue).toBeUndefined()
	})

	it('should return minValue when rules contains min as a number', () => {
		const { result } = renderHook(() => useControlledInput({ min: 5 }))

		expect(result.current.minValue).toBe(5)
		expect(result.current.maxValue).toBeUndefined()
	})

	it('should return maxValue when rules contains maxLength as an object', () => {
		const { result } = renderHook(() =>
			useControlledInput({
				maxLength: { value: 20, message: 'Maximum allowed' },
			})
		)

		expect(result.current.maxValue).toBe(20)
		expect(result.current.minValue).toBeUndefined()
	})

	it('should return minValue when rules contains minLength as an object', () => {
		const { result } = renderHook(() =>
			useControlledInput({
				minLength: { value: 3, message: 'Minimum allowed' },
			})
		)

		expect(result.current.minValue).toBe(3)
		expect(result.current.maxValue).toBeUndefined()
	})

	it('should return undefined for both maxValue and minValue if rules contain no valid values', () => {
		const { result } = renderHook(() => useControlledInput({}))

		expect(result.current.maxValue).toBeUndefined()
		expect(result.current.minValue).toBeUndefined()
	})

	it('should prioritize max over maxLength when both are present', () => {
		const { result } = renderHook(() =>
			useControlledInput({
				max: 15,
				maxLength: { value: 10, message: 'Maximum allowed' },
			})
		)

		expect(result.current.maxValue).toBe(15)
		expect(result.current.minValue).toBeUndefined()
	})

	it('should prioritize min over minLength when both are present', () => {
		const { result } = renderHook(() =>
			useControlledInput({
				min: 8,
				minLength: { value: 5, message: 'Minimum allowed' },
			})
		)

		expect(result.current.minValue).toBe(8)
		expect(result.current.maxValue).toBeUndefined()
	})
})
