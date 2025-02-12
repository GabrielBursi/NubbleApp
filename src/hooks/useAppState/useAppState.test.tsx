/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AppState } from 'react-native'

import { act, renderHook } from '@testing-library/react-native'

import { useAppState } from './useAppState'

jest.mock('react-native', () => ({
	AppState: {
		currentState: 'active',
		addEventListener: jest.fn(),
	},
}))

describe('useAppState', () => {
	const mockRemove = jest.fn()

	beforeEach(() => {
		jest.clearAllMocks()
		;(AppState.addEventListener as jest.Mock).mockReturnValue({
			remove: mockRemove,
		})
	})

	it('should initialize with current app state', () => {
		const { result } = renderHook(() => useAppState())
		expect(result.current).toBe('active')
	})

	it('should update state when app state changes', async () => {
		const { result } = renderHook(() => useAppState())

		await act(() => {
			const changeHandler = (AppState.addEventListener as jest.Mock).mock
				.calls[0][1]
			changeHandler('background')
		})

		expect(result.current).toBe('background')
	})

	it('should subscribe to app state changes on mount', () => {
		renderHook(() => useAppState())
		expect(AppState.addEventListener).toHaveBeenCalledWith(
			'change',
			expect.any(Function)
		)
	})

	it('should unsubscribe on unmount', () => {
		const { unmount } = renderHook(() => useAppState())
		unmount()
		expect(mockRemove).toHaveBeenCalled()
	})
})
