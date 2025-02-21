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

		const change = result.current.onChange

		await act(() => change())

		expect(mockOnChange).toHaveBeenCalledWith(false)
		expect(result.current.checked).toBe(false)
	})

	it('should disable change of the value', async () => {
		const { result } = renderHook(() =>
			useRadioButton({ checked: true, onChange: mockOnChange, disabled: true })
		)

		const change = result.current.onChange

		await act(() => change())

		expect(mockOnChange).not.toHaveBeenCalled()
		expect(result.current.checked).toBe(true)
	})
})
