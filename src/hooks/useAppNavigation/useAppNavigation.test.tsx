import { act, renderHook } from '@testing-library/react-native'

import { useAuthCredentials } from '@/services/auth/useAuthCredentials'
import { generateUser, mockUseNavigation } from '@/tests/mocks'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { useAppNavigation } from './useAppNavigation'

type UseAuthCredentials = typeof useAuthCredentials
type ReturnUseAuthCredentials = ReturnHookMocked<UseAuthCredentials>
type MockUseAuthCredentials = HookMocked<UseAuthCredentials>

jest.mock('@/services/auth/useAuthCredentials')

describe('useAppNavigation', () => {
	const mockUser = generateUser()

	const mockUseAuthCredentialsService: ReturnUseAuthCredentials = {
		user: mockUser,
	}

	beforeEach(() => {
		;(useAuthCredentials as MockUseAuthCredentials).mockReturnValue(
			mockUseAuthCredentialsService
		)
	})

	it('should navigate with app stack', () => {
		const { result } = renderHook(useAppNavigation)

		result.current.navigationAppStack.navigate('SettingsScreen')

		expect(mockUseNavigation.navigate).toHaveBeenCalled()
	})

	it('should navigate with app tab', () => {
		const { result } = renderHook(useAppNavigation)

		result.current.navigationAppTab.navigate('HomeScreen')

		expect(mockUseNavigation.navigate).toHaveBeenCalled()
	})

	it('should navigate with auth stack', () => {
		const { result } = renderHook(useAppNavigation)

		result.current.navigationAuthStack.navigate('SignUpScreen')

		expect(mockUseNavigation.navigate).toHaveBeenCalled()
	})

	it('should navigate to my profile screen correctly', async () => {
		const { result } = renderHook(useAppNavigation)

		await act(() => {
			result.current.navigate.toProfile(mockUser.id)
		})

		expect(mockUseNavigation.navigate).toHaveBeenCalledWith('MyProfileScreen')
	})

	it('should navigate to profile screen correctly', async () => {
		const { result } = renderHook(useAppNavigation)

		await act(() => {
			result.current.navigate.toProfile(-777)
		})

		expect(mockUseNavigation.push).toHaveBeenCalledWith('ProfileScreen', {
			userId: -777,
		})
	})

	it('should navigate to comments screen correctly', async () => {
		const { result } = renderHook(useAppNavigation)

		await act(() => {
			result.current.navigate.toComments({ postAuthorId: '1', postId: '1' })
		})

		expect(mockUseNavigation.push).toHaveBeenCalledWith('PostCommentScreen', {
			postAuthorId: '1',
			postId: '1',
			showPost: false,
		})
	})

	it('should navigate to post details screen correctly', async () => {
		const { result } = renderHook(useAppNavigation)

		await act(() => {
			result.current.navigate.toPostDetails({ postAuthorId: '1', postId: '1' })
		})

		expect(mockUseNavigation.push).toHaveBeenCalledWith('PostCommentScreen', {
			postAuthorId: '1',
			postId: '1',
			showPost: true,
		})
	})

	it('should navigate to edit profile screen correctly', async () => {
		const { result } = renderHook(useAppNavigation)

		await act(() => {
			result.current.navigate.toEditProfile(1)
		})

		expect(mockUseNavigation.navigate).toHaveBeenCalledWith(
			'EditProfileScreen',
			{ userId: 1 }
		)
	})
})
