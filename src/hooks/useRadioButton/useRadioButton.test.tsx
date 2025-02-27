import { act, renderHook } from '@testing-library/react-native'

import { useRadioButton } from './useRadioButton'

describe('useRadioButton', () => {
	const mockOnChange = jest.fn()

	it('should return the initial value', () => {
		const { result } = renderHook(useRadioButton)

		expect(result.current.checked).toBe(false)
	})

	it('should return the default value', () => {
		const { result } = renderHook(() => useRadioButton({ checked: true }))

		expect(result.current.checked).toBe(true)
	})

	it('should change the value', async () => {
		const { result } = renderHook(() =>
			useRadioButton({ checked: true, onChange: mockOnChange })
		)

		await act(() => result.current.onChange())

		expect(mockOnChange).toHaveBeenCalledWith(false)
		expect(result.current.checked).toBe(false)

		await act(() => result.current.onChange())
		expect(mockOnChange).toHaveBeenCalledWith(true)
		expect(result.current.checked).toBe(true)
	})

	it('should not allow to uncheck', async () => {
		const { result } = renderHook(() =>
			useRadioButton({ onChange: mockOnChange, canUncheck: false })
		)

		await act(() => result.current.onChange())
		expect(mockOnChange).toHaveBeenCalledWith(true)
		expect(result.current.checked).toBe(true)

		await act(() => result.current.onChange())
		expect(result.current.checked).toBe(true)
		expect(mockOnChange).not.toHaveBeenCalledWith(false)
		expect(mockOnChange).toHaveBeenCalledTimes(1)
	})
})
