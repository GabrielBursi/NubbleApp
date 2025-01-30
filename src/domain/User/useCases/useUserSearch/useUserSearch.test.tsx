import { renderHook, waitFor } from '@testing-library/react-native'

import { TestProvider } from '@/providers'

import { UserApi } from '../../api'

import { useUserSearch } from './useUserSearch'

describe('useUserSearch', () => {
	const spyGetUsers = jest.spyOn(UserApi, 'GetAllWithSearch')

	it('should call get users api correctly', async () => {
		renderHook(() => useUserSearch('jest'), { wrapper: TestProvider })

		await waitFor(() => {
			expect(spyGetUsers).toHaveBeenCalledWith('jest')
		})
	})

	it('should not call get users api when search is empty correctly', async () => {
		renderHook(() => useUserSearch('  '), { wrapper: TestProvider })

		await waitFor(() => {
			expect(spyGetUsers).not.toHaveBeenCalled()
		})
	})
})
