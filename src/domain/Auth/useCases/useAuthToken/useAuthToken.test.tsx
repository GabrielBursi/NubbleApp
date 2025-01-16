import { renderHook } from '@testing-library/react-native'
import axios from 'axios'
import Config from 'react-native-config'

import { NubbleApi } from '@/api/config'
import { customFaker } from '@/tests/utils'
import { END_POINTS_API } from '@/types/api'

import { useAuthToken } from './useAuthToken'

describe('useAuthToken', () => {
	const api = axios.create({
		baseURL: Config.API_URL,
		headers: {
			'Content-Type': 'application/json',
		},
	})

	const mockToken = customFaker.internet.jwt()

	beforeEach(() => {
		api.defaults.headers.common.Authorization = null
		jest.spyOn(global, 'fetch').mockResolvedValue({
			ok: true,
			json: () => ({}),
		} as Response)
	})

	afterEach(() => {
		jest.restoreAllMocks()
	})

	it('should update header token correctly', () => {
		const { result } = renderHook(() => useAuthToken(api))

		result.current.updateToken(mockToken)
		expect(api.defaults.headers.common.Authorization).toBe(
			`Bearer ${mockToken}`
		)
	})

	it('should remove header token correctly', () => {
		const { result } = renderHook(() => useAuthToken(api))

		result.current.updateToken(mockToken)
		result.current.removeToken()
		expect(api.defaults.headers.common.Authorization).toBeNull()
	})

	it('should use the default instance correctly', () => {
		const { result } = renderHook(useAuthToken)

		expect(result.current.instance).toStrictEqual(NubbleApi)
	})

	it('should verify if request is refresh token correctly', () => {
		const { result } = renderHook(useAuthToken)

		expect(
			result.current.verifyIfIsRefreshTokenRequest({
				url: END_POINTS_API.AUTH_REFRESH_TOKEN,
			})
		).toBe(true)
	})
})
