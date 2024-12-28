jest.setTimeout(10000)

import '@testing-library/react-native/extend-expect'
import '@testing-library/jest-native/extend-expect'
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock'
require('@shopify/flash-list/jestSetup')

import { serverTest } from '@/tests/server'
import { mockUseNavigation } from '@/tests/mocks'
import { userEvent } from '@testing-library/react-native'
import { testQueryClient } from '@/providers'

jest.mock('react-native-reanimated', () => {
	const Reanimated = require('react-native-reanimated/mock')
	Reanimated.default.call = () => {}

	return Reanimated
})

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')
jest.mock('react-native-safe-area-context', () => mockSafeAreaContext)

jest.mock('@react-navigation/native', () => ({
	...jest.requireActual('@react-navigation/native'),
	useNavigation: () => mockUseNavigation,
	useScrollToTop: () => jest.fn(),
}))

beforeAll(() => {
	serverTest.listen({ onUnhandledRequest: 'error' })
	userEvent.setup()
})
beforeEach(() => {
	testQueryClient.clear()
})
afterEach(() => {
	serverTest.resetHandlers()
})
afterAll(() => {
	serverTest.close()
	testQueryClient.clear()
	testQueryClient.cancelQueries()
	testQueryClient.removeQueries()
	testQueryClient.resetQueries()
	testQueryClient.setDefaultOptions({
		queries: {
			gcTime: 0,
			staleTime: 0,
			enabled: false,
			networkMode: 'offlineFirst',
			retry: false,
		},
		mutations: {
			gcTime: 0,
			mutationKey: [],
			networkMode: 'offlineFirst',
			retry: false,
		},
	})
	testQueryClient.unmount()
})
