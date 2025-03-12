jest.setTimeout(10000)

import '@testing-library/react-native/extend-expect'
import '@testing-library/jest-native/extend-expect'
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock'
require('@shopify/flash-list/jestSetup')

import { serverTest } from '@/tests/server'
import {
	mockAppImages,
	mockAuth,
	mockStorage,
	mockUseNavigation,
	mockCamera,
} from '@/tests/mocks'
import { userEvent } from '@testing-library/react-native'
import { testQueryClient } from '@/providers'
import { initializeStorage } from '@/services/storage'
import { useAuthCredentialsStorage } from '@/services/auth/store/useAuthCredentialsStorage'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

jest.mock('expo-image-manipulator', () => ({
	manipulateAsync: jest.fn(),
}))

jest.mock('react-native-bootsplash', () => {
	return {
		hide: jest.fn().mockImplementation(() => Promise.resolve()),
		isVisible: jest.fn().mockResolvedValue(false),
		useHideAnimation: jest.fn().mockReturnValue({
			container: {},
			logo: { source: 0 },
			brand: { source: 0 },
		}),
	}
})

jest.mock('react-native-vision-camera', () => ({
	Camera: jest.fn(() => 'Camera'),
	...mockCamera,
	Templates: {
		Instagram: {},
	},
}))

jest.mock('react-native-reanimated', () => {
	const Reanimated = require('react-native-reanimated/mock')
	Reanimated.default.call = () => {}

	return Reanimated
})

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')
jest.mock('react-native-safe-area-context', () => mockSafeAreaContext)

jest.mock('@react-native-async-storage/async-storage', () =>
	require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

jest.mock('@react-navigation/native', () => ({
	...jest.requireActual('@react-navigation/native'),
	useNavigation: () => mockUseNavigation,
	useScrollToTop: () => jest.fn(),
}))

jest.mock('@react-native-camera-roll/camera-roll', () => ({
	CameraRoll: {
		getPhotos: jest.fn(async () => ({
			edges: [
				{ node: { image: { uri: 'image-1' } } },
				{ node: { image: { uri: 'image-2' } } },
				{ node: { image: { uri: 'image-3' } } },
			],
		})),
	},
}))

jest.mock('react-native-permissions', () =>
	require('react-native-permissions/mock')
)

jest.mock('@/services/permission/PermissionService', () => ({
	PermissionService: {
		request: jest.fn(),
		check: jest.fn(),
	},
}))

jest.mock('@/services/auth/store/useAuthCredentialsStorage')
jest.mock('@/assets/images', () => ({
	AppImages: mockAppImages,
}))

type UseAuthCredentialsStorage = typeof useAuthCredentialsStorage
type MockUseAuthCredentialsStorage = HookMocked<UseAuthCredentialsStorage>
type ReturnUseAuthCredentialsStorage =
	ReturnHookMocked<UseAuthCredentialsStorage>

beforeAll(() => {
	serverTest.listen({ onUnhandledRequest: 'error' })
	userEvent.setup()
	initializeStorage(mockStorage)

	const mockGetAuth = jest.fn().mockResolvedValue(mockAuth)
	const mockRemoveAuth = jest.fn().mockResolvedValue(undefined)
	const mockSetAuth = jest.fn().mockResolvedValue(undefined)

	const mockReturnUseAuthCredentialsStorage: ReturnUseAuthCredentialsStorage = {
		getAuth: mockGetAuth,
		removeAuth: mockRemoveAuth,
		setAuth: mockSetAuth,
	}
	;(useAuthCredentialsStorage as MockUseAuthCredentialsStorage).mockReturnValue(
		mockReturnUseAuthCredentialsStorage
	)
})
beforeEach(() => {
	jest.useFakeTimers()
	testQueryClient.clear()
})
afterEach(() => {
	serverTest.resetHandlers()
	jest.useRealTimers()
})
afterAll(() => {
	serverTest.close()
	testQueryClient.clear()
	testQueryClient.unmount()
})
