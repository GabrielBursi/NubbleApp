import { renderHook } from '@testing-library/react-native'

import { customAct } from '@/tests/utils'

import { useDebounce } from './useDebounce'

describe('useDebounce', () => {
	it('should return the initial value immediately', () => {
		const { result } = renderHook(() => useDebounce('initial'))

		expect(result.current.debouncedValue).toBe('initial')
		expect(result.current.isDebouncing).toBe(false)
	})

	it('should update the debounced value after the delay', async () => {
		jest.useFakeTimers()

		const { result, rerender } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{
				initialProps: { value: 'initial', delay: 500 },
			}
		)

		rerender({ value: 'updated', delay: 500 })

		expect(result.current.debouncedValue).toBe('initial')
		expect(result.current.isDebouncing).toBe(true)

		await customAct(() => {
			jest.advanceTimersByTime(500)
		})

		expect(result.current.debouncedValue).toBe('updated')
		expect(result.current.isDebouncing).toBe(false)

		jest.useRealTimers()
	})
})
