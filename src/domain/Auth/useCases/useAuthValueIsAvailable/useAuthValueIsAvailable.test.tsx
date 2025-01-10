import { renderHook, waitFor } from '@testing-library/react-native'

import { AuthServices } from '@/api/services'
import { useDebounce } from '@/hooks/useDebounce/useDebounce'
import { TestProvider } from '@/providers'
import { mockFieldIsAvailableApi } from '@/tests/mocks'
import { AppQueryKeys } from '@/types/api'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { useAuthValueIsAvailable } from './useAuthValueIsAvailable'

type UseDebounce = typeof useDebounce
type ReturnUseDebounce = ReturnHookMocked<UseDebounce>
type MockUseDebounce = HookMocked<UseDebounce>

jest.mock('@/hooks/useDebounce/useDebounce')

describe('useAuthValueIsAvailable', () => {
	const spyVerifyEmail = jest.spyOn(AuthServices, 'VerifyEmail')
	const spyVerifyUsername = jest.spyOn(AuthServices, 'VerifyUsername')

	const mockReturnUseDebounce: ReturnUseDebounce = {
		debouncedValue: 'jest',
		isDebouncing: false,
	}

	beforeEach(() => {
		;(useDebounce as MockUseDebounce).mockReturnValue(mockReturnUseDebounce)
	})

	it('should disabled the query when the value is empty correctly', async () => {
		;(useDebounce as MockUseDebounce).mockReturnValue({
			...mockReturnUseDebounce,
			debouncedValue: '  ',
		})

		renderHook(
			() => useAuthValueIsAvailable('  ', AppQueryKeys.EMAIL_AVAILABLE),
			{ wrapper: TestProvider }
		)

		await waitFor(() => {
			expect(spyVerifyEmail).not.toHaveBeenCalled()
			expect(spyVerifyUsername).not.toHaveBeenCalled()
		})
	})

	it('should disabled the query when the value is debouncing correctly', async () => {
		;(useDebounce as MockUseDebounce).mockReturnValue({
			...mockReturnUseDebounce,
			isDebouncing: true,
		})

		renderHook(
			() => useAuthValueIsAvailable('  ', AppQueryKeys.USERNAME_AVAILABLE),
			{ wrapper: TestProvider }
		)

		await waitFor(() => {
			expect(spyVerifyEmail).not.toHaveBeenCalled()
			expect(spyVerifyUsername).not.toHaveBeenCalled()
		})
	})

	it('should return email available correctly', async () => {
		const { result } = renderHook(
			() => useAuthValueIsAvailable('jest', AppQueryKeys.EMAIL_AVAILABLE),
			{ wrapper: TestProvider }
		)

		await waitFor(() => {
			expect(spyVerifyEmail).toHaveBeenCalledWith('jest')
			expect(spyVerifyUsername).not.toHaveBeenCalled()
			expect(result.current.isAvailable).toBe(
				mockFieldIsAvailableApi.isAvailable
			)
		})
	})

	it('should return username available correctly', async () => {
		const { result } = renderHook(
			() => useAuthValueIsAvailable('jest', AppQueryKeys.USERNAME_AVAILABLE),
			{ wrapper: TestProvider }
		)

		await waitFor(() => {
			expect(spyVerifyEmail).not.toHaveBeenCalled()
			expect(spyVerifyUsername).toHaveBeenCalledWith('jest')
			expect(result.current.isAvailable).toBe(
				mockFieldIsAvailableApi.isAvailable
			)
		})
	})
})
