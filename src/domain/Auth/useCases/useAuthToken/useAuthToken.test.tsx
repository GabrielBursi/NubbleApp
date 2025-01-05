import { renderHook } from '@testing-library/react-native'
import axios from 'axios'

import { NubbleApi } from '@/api/config'
import { customFaker } from '@/tests/utils'

import { useAuthToken } from './useAuthToken'

describe('useAuthToken', () => {
	const api = axios.create()
	const mockToken = customFaker.internet.jwt()

	beforeEach(() => {
		api.defaults.headers.common.Authorization = null
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
})
