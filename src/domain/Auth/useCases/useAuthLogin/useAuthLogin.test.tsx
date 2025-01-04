/* eslint-disable sonarjs/no-hardcoded-credentials */
import { act, renderHook, waitFor } from '@testing-library/react-native'

import { AuthServices } from '@/api/services'
import { TestProvider } from '@/providers'

import { useAuthLogin } from './useAuthLogin'

describe('useAuthLogin', () => {
	const spyLogin = jest.spyOn(AuthServices, 'SignIn')

	it('should login correctly', async () => {
		const { result } = renderHook(useAuthLogin, { wrapper: TestProvider })

		expect(result.current.authCredentials).toBeNull()

		await act(() => {
			result.current.login({ email: 'jest@email.com', password: 'jest' })
		})

		await waitFor(() => {
			expect(spyLogin).toHaveBeenCalledWith({
				email: 'jest@email.com',
				password: 'jest',
			})
			expect(result.current.authCredentials).not.toBeNull()
		})
	})
})
