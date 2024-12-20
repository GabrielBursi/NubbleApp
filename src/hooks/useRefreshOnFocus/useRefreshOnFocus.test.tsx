import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { renderHook } from '@testing-library/react-native'

import { useRefreshOnFocus } from './useRefreshOnFocus'

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('react', () => ({
	...jest.requireActual('react'),
	useRef: jest.fn(),
}))

describe('useRefreshOnFocus', () => {
	const mockRefetch = jest.fn()

	const mockRef = { current: true }

	beforeEach(() => {
		;(React.useRef as jest.Mock).mockReturnValue(mockRef)
	})

	it('should not call refetch on initial render when the screen gains focus for the first time', () => {
		renderHook(() => useRefreshOnFocus(mockRefetch), {
			wrapper: NavigationContainer,
		})

		expect(mockRefetch).not.toHaveBeenCalled()
	})

	it('should call refetch when the screen gains focus after the first render', () => {
		;(React.useRef as jest.Mock).mockReturnValue({ current: false })

		renderHook(() => useRefreshOnFocus(mockRefetch), {
			wrapper: NavigationContainer,
		})

		expect(mockRefetch).toHaveBeenCalled()
	})
})
