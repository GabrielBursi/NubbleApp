import { QueryKey } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react-native'

import { UserDetailsModel } from '@/domain/User'
import { TestProvider } from '@/providers'
import { useAuthCredentials } from '@/services/auth'
import { generateUserDetails } from '@/tests/mocks'
import { AppQueryKeys } from '@/types/api'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { FollowApi } from '../../api'
import { useFollowUser } from '../useFollowUser/useFollowUser'

import { useRemoveFollow } from './useRemoveFollow'

type UseAuthCredentials = typeof useAuthCredentials
type ReturnUseAuthCredentials = ReturnHookMocked<UseAuthCredentials>
type MockUseAuthCredentials = HookMocked<UseAuthCredentials>

type UseFollowUser = typeof useFollowUser
type ReturnUseFollowUser = ReturnHookMocked<UseFollowUser>
type MockUseFollowUser = HookMocked<UseFollowUser>

type MockSetQueryData = jest.MockedFunction<
	(
		key: QueryKey,
		updater: (
			oldData: UserDetailsModel | undefined
		) => UserDetailsModel | undefined
	) => void
>

const mockSetQueryData = jest.fn()
const mockCancelQueries = jest.fn()
const mockInvalidateQueries = jest.fn()
const mockGetQueryData = jest.fn()
const mockFollowUser = jest.fn()

const mockReturnUseQueryClient = {
	setQueryData: mockSetQueryData,
	invalidateQueries: mockInvalidateQueries,
	cancelQueries: mockCancelQueries,
	getQueryData: mockGetQueryData,
}

const mockReturnUseFollowUser = {
	followUser: mockFollowUser,
	isLoading: false,
	followingUser: null,
	error: null,
	isSuccess: false,
	reset: jest.fn(),
	followContext: null,
}

jest.mock('@/services/auth')
jest.mock('../useFollowUser/useFollowUser')
jest.mock<{ useQueryClient: () => typeof mockReturnUseQueryClient }>(
	'@tanstack/react-query',
	() => ({
		...jest.requireActual('@tanstack/react-query'),
		useQueryClient: () => mockReturnUseQueryClient,
	})
)

describe('useRemoveFollow', () => {
	const mockUser = generateUserDetails()
	const mockFollowingUser = generateUserDetails()
	const mockFollowingUserDetails: UserDetailsModel = {
		...mockFollowingUser,
		meta: {
			followersCount: 5,
			followingCount: 10,
		},
		isFollowing: true,
	}
	const mockUserDetails: UserDetailsModel = {
		...mockUser,
		meta: {
			followersCount: 3,
			followingCount: 7,
		},
	}

	const mockOnSuccess = jest.fn()
	const mockOnError = jest.fn()
	const spyRemoveFollow = jest.spyOn(FollowApi, 'RemoveFollow')

	const mockAuthCredentials: ReturnUseAuthCredentials = {
		user: mockUser,
	}

	beforeEach(() => {
		;(useAuthCredentials as MockUseAuthCredentials).mockReturnValue(
			mockAuthCredentials
		)
		;(useFollowUser as MockUseFollowUser).mockReturnValue(
			mockReturnUseFollowUser as ReturnUseFollowUser
		)
		mockGetQueryData.mockImplementation((key: QueryKey) => {
			if (
				key[0] === AppQueryKeys.USER_BY_ID &&
				key[1] === mockFollowingUser.id
			) {
				return mockFollowingUserDetails
			}
			if (key[0] === AppQueryKeys.USER_BY_ID && key[1] === mockUser.id) {
				return mockUserDetails
			}
			return undefined
		})
		spyRemoveFollow.mockResolvedValue(undefined)
	})

	it('should remove follow successfully', async () => {
		const { result } = renderHook(
			() => useRemoveFollow(mockFollowingUser.id, { onSuccess: mockOnSuccess }),
			{ wrapper: TestProvider }
		)

		await act(() => {
			result.current.removeFollow()
		})

		await waitFor(() => {
			expect(spyRemoveFollow).toHaveBeenCalledWith(mockFollowingUser.id)
			expect(mockCancelQueries).toHaveBeenCalledTimes(2)
			expect(mockSetQueryData).toHaveBeenCalledWith(
				[AppQueryKeys.USER_BY_ID, mockFollowingUser.id],
				expect.any(Function)
			)
			expect(mockSetQueryData).toHaveBeenCalledWith(
				[AppQueryKeys.USER_BY_ID, mockUser.id],
				expect.any(Function)
			)
			expect(mockOnSuccess).toHaveBeenCalled()
			expect(mockInvalidateQueries).toHaveBeenCalledTimes(3)
		})
	})

	it('should update user counts optimistically', async () => {
		const { result } = renderHook(() => useRemoveFollow(mockFollowingUser.id), {
			wrapper: TestProvider,
		})

		await act(() => {
			result.current.removeFollow()
		})

		const followingUserUpdater = (
			mockSetQueryData as MockSetQueryData
		).mock.calls.find(
			(call) =>
				call[0][0] === AppQueryKeys.USER_BY_ID &&
				call[0][1] === mockFollowingUser.id
		)?.[1]

		const followerUserUpdater = (
			mockSetQueryData as MockSetQueryData
		).mock.calls.find(
			(call) =>
				call[0][0] === AppQueryKeys.USER_BY_ID && call[0][1] === mockUser.id
		)?.[1]

		expect(followingUserUpdater).toBeDefined()
		expect(followerUserUpdater).toBeDefined()

		const updatedFollowingUser = followingUserUpdater!(mockFollowingUserDetails)
		const updatedFollowerUser = followerUserUpdater!(mockUserDetails)

		expect(updatedFollowingUser?.meta.followersCount).toBe(
			mockFollowingUserDetails.meta.followersCount - 1
		)
		expect(updatedFollowingUser?.isFollowing).toBe(false)
		expect(updatedFollowerUser?.meta.followingCount).toBe(
			mockUserDetails.meta.followingCount - 1
		)
	})

	it('should handle error and revert optimistic updates', async () => {
		spyRemoveFollow.mockRejectedValue(new Error('Network error'))

		const { result } = renderHook(
			() => useRemoveFollow(mockFollowingUser.id, { onError: mockOnError }),
			{ wrapper: TestProvider }
		)

		await act(() => {
			result.current.removeFollow()
		})

		await waitFor(() => {
			expect(mockOnError).toHaveBeenCalledWith('erro ao deixar de seguir')
			expect(mockSetQueryData).toHaveBeenCalledWith(
				[AppQueryKeys.USER_BY_ID, mockFollowingUser.id],
				expect.any(Object)
			)
			expect(mockSetQueryData).toHaveBeenCalledWith(
				[AppQueryKeys.USER_BY_ID, mockUser.id],
				expect.any(Object)
			)
		})
	})

	it('should handle error with custom error message', async () => {
		spyRemoveFollow.mockRejectedValue(new Error('Network error'))

		const { result } = renderHook(
			() =>
				useRemoveFollow(mockFollowingUser.id, {
					onError: mockOnError,
					errorMessage: 'custom error message',
				}),
			{ wrapper: TestProvider }
		)

		await act(() => {
			result.current.removeFollow()
		})

		await waitFor(() => {
			expect(mockOnError).toHaveBeenCalledWith('custom error message')
		})
	})

	it('should invalidate queries after successful unfollow', async () => {
		const { result } = renderHook(() => useRemoveFollow(mockFollowingUser.id), {
			wrapper: TestProvider,
		})

		await act(() => {
			result.current.removeFollow()
		})

		await waitFor(() => {
			expect(mockInvalidateQueries).toHaveBeenCalledWith({
				queryKey: [AppQueryKeys.MY_FOLLOWING_LIST],
			})
			expect(mockInvalidateQueries).toHaveBeenCalledWith({
				queryKey: [AppQueryKeys.USER_BY_ID, mockFollowingUser.id],
			})
			expect(mockInvalidateQueries).toHaveBeenCalledWith({
				queryKey: [AppQueryKeys.USER_BY_ID, mockUser.id],
			})
		})
	})

	it('should not update data if user is undefined', async () => {
		mockGetQueryData.mockReturnValue(undefined)

		const { result } = renderHook(() => useRemoveFollow(mockFollowingUser.id), {
			wrapper: TestProvider,
		})

		await act(() => {
			result.current.removeFollow()
		})

		const followingUserUpdater = (
			mockSetQueryData as MockSetQueryData
		).mock.calls.find(
			(call) =>
				call[0][0] === AppQueryKeys.USER_BY_ID &&
				call[0][1] === mockFollowingUser.id
		)![1]
		expect(followingUserUpdater(undefined)).toBeUndefined()

		const followerUserUpdater = (
			mockSetQueryData as MockSetQueryData
		).mock.calls.find(
			(call) =>
				call[0][0] === AppQueryKeys.USER_BY_ID && call[0][1] === mockUser.id
		)![1]
		expect(followerUserUpdater(undefined)).toBeUndefined()
	})

	it('should expose correct loading state', async () => {
		const { result } = renderHook(() => useRemoveFollow(mockFollowingUser.id), {
			wrapper: TestProvider,
		})

		expect(result.current.isLoading).toBe(false)

		await act(() => {
			result.current.removeFollow()
		})

		expect(result.current.isLoading).toBe(false)
	})

	it('should call followUser when undoRemoveFollow is called', async () => {
		const { result } = renderHook(() => useRemoveFollow(mockFollowingUser.id), {
			wrapper: TestProvider,
		})

		await act(() => {
			result.current.undoRemoveFollow()
		})

		expect(mockFollowUser).toHaveBeenCalledWith(mockFollowingUser.id)
	})

	it('should expose reset function', async () => {
		const { result } = renderHook(() => useRemoveFollow(mockFollowingUser.id), {
			wrapper: TestProvider,
		})

		expect(typeof result.current.reset).toBe('function')

		await act(() => {
			result.current.reset()
		})
	})
})
