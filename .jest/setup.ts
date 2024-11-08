import '@testing-library/react-native/extend-expect'
import '@testing-library/jest-native/extend-expect'
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock'

import { serverApiTest } from '@/tests/server'
import { mockUseNavigation } from '@/tests/mocks'

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
}))

beforeAll(() => serverApiTest.listen({ onUnhandledRequest: 'error' }))
afterEach(() => serverApiTest.resetHandlers())
afterAll(() => serverApiTest.close())
