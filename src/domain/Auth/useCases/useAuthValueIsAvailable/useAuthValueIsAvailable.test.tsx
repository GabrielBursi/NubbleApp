import { renderHook, waitFor } from '@testing-library/react-native'
import { http, HttpResponse } from 'msw'
import Config from 'react-native-config'

import { AuthServices } from '@/api/services'
import { FieldIsAvailableAPIModel } from '@/domain/Auth'
import { useDebounce } from '@/hooks/useDebounce/useDebounce'
import { TestProvider } from '@/providers'
import { mockFieldIsAvailableApi } from '@/tests/mocks'
import { serverTest } from '@/tests/server'
import { AppQueryKeys, END_POINTS_API } from '@/types/api'
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
			() =>
				useAuthValueIsAvailable({
					queryKey: AppQueryKeys.EMAIL_AVAILABLE,
					value: '  ',
				}),
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
			() =>
				useAuthValueIsAvailable({
					queryKey: AppQueryKeys.USERNAME_AVAILABLE,
					value: '  ',
				}),
			{ wrapper: TestProvider }
		)

		await waitFor(() => {
			expect(spyVerifyEmail).not.toHaveBeenCalled()
			expect(spyVerifyUsername).not.toHaveBeenCalled()
		})
	})

	it('should return email available correctly', async () => {
		const { result } = renderHook(
			() =>
				useAuthValueIsAvailable({
					queryKey: AppQueryKeys.EMAIL_AVAILABLE,
					value: 'jest',
				}),
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
			() =>
				useAuthValueIsAvailable({
					queryKey: AppQueryKeys.USERNAME_AVAILABLE,
					value: 'jest',
				}),
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

	it('should disable the query correctly', async () => {
		renderHook(
			() =>
				useAuthValueIsAvailable({
					queryKey: AppQueryKeys.USERNAME_AVAILABLE,
					value: 'jest',
					enabled: false,
				}),
			{ wrapper: TestProvider }
		)

		await waitFor(() => {
			expect(spyVerifyEmail).not.toHaveBeenCalled()
			expect(spyVerifyUsername).not.toHaveBeenCalled()
		})
	})

	it('should return isUnvailable correctly', async () => {
		serverTest.use(
			...[
				http.get(`${Config.API_URL}${END_POINTS_API.AUTH_VALIDATE_EMAIL}`, () =>
					HttpResponse.json<FieldIsAvailableAPIModel>(
						{ isAvailable: false, message: 'false' },
						{
							status: 200,
						}
					)
				),
				http.get(
					`${Config.API_URL}${END_POINTS_API.AUTH_VALIDATE_USERNAME}`,
					() =>
						HttpResponse.json<FieldIsAvailableAPIModel>(
							{ isAvailable: false, message: 'false' },
							{ status: 200 }
						)
				),
			]
		)

		const { result } = renderHook(
			() =>
				useAuthValueIsAvailable({
					queryKey: AppQueryKeys.USERNAME_AVAILABLE,
					value: 'jest',
				}),
			{ wrapper: TestProvider }
		)

		await waitFor(() => {
			expect(result.current.isUnavailable).toBe(true)
			expect(result.current.isAvailable).toBe(false)
		})
	})
})
