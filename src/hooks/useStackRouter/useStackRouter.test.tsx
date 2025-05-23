import { renderHook } from '@testing-library/react-native'

import { useAuthCredentials, useAuthCredentialsService } from '@/services/auth'
import { useOnBoarding, SettingsService } from '@/services/settings'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { useStackRouter } from './useStackRouter'

jest.mock('@/services/auth')
jest.mock('@/services/settings')

type UseAuthCredentials = typeof useAuthCredentials
type MockUseAuthCredentials = HookMocked<UseAuthCredentials>

type UseAuthCredentialsService = typeof useAuthCredentialsService
type MockUseAuthCredentialsService = HookMocked<UseAuthCredentialsService>
type ReturnUseAuthCredentialsService =
	ReturnHookMocked<UseAuthCredentialsService>

type UseOnBoarding = typeof useOnBoarding
type MockUseOnBoarding = HookMocked<UseOnBoarding>

describe('useStackRouter', () => {
	const mockHideSplashScreen = jest.fn()

	beforeEach(() => {
		jest.clearAllMocks()
		;(
			useAuthCredentialsService as MockUseAuthCredentialsService
		).mockReturnValue({
			isLoading: false,
		} as ReturnUseAuthCredentialsService)
		;(useAuthCredentials as MockUseAuthCredentials).mockReturnValue(null)
		;(useOnBoarding as MockUseOnBoarding).mockReturnValue(false)

		SettingsService.hideSplashScreen = mockHideSplashScreen
	})

	it('should return the loading state when isLoading is true', () => {
		;(
			useAuthCredentialsService as MockUseAuthCredentialsService
		).mockReturnValue({
			isLoading: true,
		} as ReturnUseAuthCredentialsService)

		const { result } = renderHook(() => useStackRouter())
		expect(result.current).toBe('Loading')
		expect(mockHideSplashScreen).not.toHaveBeenCalled()
	})

	it('should return the onboarding stack when showOnboarding is true', () => {
		;(useOnBoarding as MockUseOnBoarding).mockReturnValue(true)

		const { result } = renderHook(() => useStackRouter())
		expect(result.current).toBe('Onboarding')
		expect(mockHideSplashScreen).toHaveBeenCalledTimes(1)
	})

	it('should return the app stack when authenticated', () => {
		;(useAuthCredentials as MockUseAuthCredentials).mockReturnValue({
			token: 'test-token',
		})

		const { result } = renderHook(() => useStackRouter())
		expect(result.current).toBe('App')
		expect(mockHideSplashScreen).toHaveBeenCalledTimes(1)
	})

	it('should return the auth stack when not authenticated and onboarding completed', () => {
		const { result } = renderHook(() => useStackRouter())
		expect(result.current).toBe('Auth')
		expect(mockHideSplashScreen).toHaveBeenCalledTimes(1)
	})

	it('should call hideSplashScreen when isLoading changes to false', () => {
		;(
			useAuthCredentialsService as MockUseAuthCredentialsService
		).mockReturnValue({
			isLoading: true,
		} as ReturnUseAuthCredentialsService)

		const { rerender } = renderHook(() => useStackRouter())
		expect(mockHideSplashScreen).not.toHaveBeenCalled()
		;(
			useAuthCredentialsService as MockUseAuthCredentialsService
		).mockReturnValue({
			isLoading: false,
		} as ReturnUseAuthCredentialsService)

		rerender(undefined)
		expect(mockHideSplashScreen).toHaveBeenCalledTimes(1)
	})
})
