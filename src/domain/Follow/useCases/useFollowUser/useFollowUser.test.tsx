import { act, renderHook, waitFor } from '@testing-library/react-native'

import { UserDetailsModel, UserModel } from '@/domain/User'
import { useFollowOptimisticUpdate } from '@/hooks'
import { TestProvider } from '@/providers'
import { useAuthCredentials } from '@/services/auth'
import { generateUserDetails, generateFollowUser } from '@/tests/mocks'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { FollowApi } from '../../api'

import { useFollowUser } from './useFollowUser'

type UseAuthCredentials = typeof useAuthCredentials
type ReturnUseAuthCredentials = ReturnHookMocked<UseAuthCredentials>
type MockUseAuthCredentials = HookMocked<UseAuthCredentials>

type UseFollowOptimisticUpdate = typeof useFollowOptimisticUpdate
type ReturnUseFollowOptimisticUpdate =
	ReturnHookMocked<UseFollowOptimisticUpdate>
type MockUseFollowOptimisticUpdate = HookMocked<UseFollowOptimisticUpdate>

jest.mock('@/hooks')
jest.mock('@/services/auth')

describe('useFollowUser', () => {
	const mockUser = generateUserDetails()
	const mockFollowingUser = generateFollowUser()
	const mockFollowingUserDetails: UserDetailsModel = {
		...mockFollowingUser,
		meta: {
			followersCount: 5,
			followingCount: 10,
		},
		isFollowing: false,
	}

	const mockCancelFollowRequests = jest.fn()
	const mockApplyFollowOptimisticUpdate = jest.fn()
	const mockSnapshotFollowData = jest.fn()
	const mockRestoreFollowData = jest.fn()
	const mockRefreshFollowData = jest.fn()

	const mockOnSuccessFollow = jest.fn()
	const mockOnErrorFollow = jest.fn()
	const mockOnSuccessRemove = jest.fn()
	const mockOnErrorRemove = jest.fn()

	const mockAuthCredentials: ReturnUseAuthCredentials = {
		user: mockUser,
	}

	const mockOptimisticSnapshotReturn = {
		previousFollowingUser: mockFollowingUserDetails,
		previousFollowerUser: mockUser,
	}

	const mockFollowOptimisticUpdateReturn: ReturnUseFollowOptimisticUpdate = {
		cancelFollowRequests: mockCancelFollowRequests,
		applyFollowOptimisticUpdate: mockApplyFollowOptimisticUpdate,
		snapshotFollowData: mockSnapshotFollowData,
		restoreFollowData: mockRestoreFollowData,
		refreshFollowData: mockRefreshFollowData,
	}

	beforeEach(() => {
		;(useAuthCredentials as MockUseAuthCredentials).mockReturnValue(
			mockAuthCredentials
		)
		;(
			useFollowOptimisticUpdate as MockUseFollowOptimisticUpdate
		).mockReturnValue(mockFollowOptimisticUpdateReturn)
		mockSnapshotFollowData.mockReturnValue(mockOptimisticSnapshotReturn)

		jest.spyOn(FollowApi, 'FollowUser').mockResolvedValue(mockFollowingUser)
		jest.spyOn(FollowApi, 'RemoveFollow').mockResolvedValue(undefined)
	})

	it('should follow user successfully', async () => {
		const { result } = renderHook(
			() =>
				useFollowUser(mockFollowingUser.id, {
					followUserOptions: { onSuccess: mockOnSuccessFollow },
				}),
			{ wrapper: TestProvider }
		)

		await act(() => {
			result.current.followUser()
		})

		await waitFor(() => {
			expect(FollowApi.FollowUser).toHaveBeenCalledWith(mockFollowingUser.id)
			expect(mockCancelFollowRequests).toHaveBeenCalledWith({
				followerId: mockUser.id,
				followingId: mockFollowingUser.id,
			})
			expect(mockSnapshotFollowData).toHaveBeenCalledWith({
				followerId: mockUser.id,
				followingId: mockFollowingUser.id,
			})
			expect(mockApplyFollowOptimisticUpdate).toHaveBeenCalledWith({
				followerId: mockUser.id,
				followingId: mockFollowingUser.id,
				isFollowing: true,
			})
			expect(mockOnSuccessFollow).toHaveBeenCalled()
			expect(mockRefreshFollowData).toHaveBeenCalledWith({
				followerId: mockUser.id,
				followingId: mockFollowingUser.id,
			})
			expect(result.current.followingUser).toBeTruthy()
			expect(result.current.isSuccessFollowUser).toBe(true)
		})
	})

	it('should handle error when following user', async () => {
		const error = new Error('Network error')
		jest.spyOn(FollowApi, 'FollowUser').mockRejectedValueOnce(error)

		const { result } = renderHook(
			() =>
				useFollowUser(mockFollowingUser.id, {
					followUserOptions: {
						onError: mockOnErrorFollow,
						errorMessage: 'custom follow error',
					},
				}),
			{ wrapper: TestProvider }
		)

		await act(() => {
			result.current.followUser()
		})

		await waitFor(() => {
			expect(mockOnErrorFollow).toHaveBeenCalledWith('custom follow error')
			expect(mockCancelFollowRequests).toHaveBeenCalledTimes(2)
			expect(mockRestoreFollowData).toHaveBeenCalledWith({
				followerId: mockUser.id,
				followingId: mockFollowingUser.id,
			})
			expect(result.current.errorFollowUser).toBeDefined()
			expect(result.current.followingUser).toBeNull()
		})
	})

	it('should use default error message when not provided in follow user', async () => {
		const error = new Error('Network error')
		jest.spyOn(FollowApi, 'FollowUser').mockRejectedValueOnce(error)

		const { result } = renderHook(
			() =>
				useFollowUser(mockFollowingUser.id, {
					followUserOptions: { onError: mockOnErrorFollow },
				}),
			{ wrapper: TestProvider }
		)

		await act(() => {
			result.current.followUser()
		})

		await waitFor(() => {
			expect(mockOnErrorFollow).toHaveBeenCalledWith('erro ao seguir usuário')
		})
	})

	it('should handle null user id success case follow user', async () => {
		;(useAuthCredentials as MockUseAuthCredentials).mockReturnValue({
			user: { ...mockUser, id: null } as unknown as UserModel,
		})

		const { result } = renderHook(() => useFollowUser(mockFollowingUser.id), {
			wrapper: TestProvider,
		})

		await act(() => {
			result.current.followUser()
		})

		await waitFor(() => {
			expect(FollowApi.FollowUser).toHaveBeenCalledWith(mockFollowingUser.id)
			expect(mockCancelFollowRequests).not.toHaveBeenCalled()
			expect(mockApplyFollowOptimisticUpdate).not.toHaveBeenCalled()
			expect(mockRefreshFollowData).not.toHaveBeenCalled()
		})
	})

	it('should handle null user id error case follow user', async () => {
		const error = new Error('Network error')
		jest.spyOn(FollowApi, 'FollowUser').mockRejectedValueOnce(error)
		;(useAuthCredentials as MockUseAuthCredentials).mockReturnValue({
			user: { ...mockUser, id: null } as unknown as UserModel,
		})

		const { result } = renderHook(
			() =>
				useFollowUser(mockFollowingUser.id, {
					followUserOptions: { onError: mockOnErrorFollow },
				}),
			{
				wrapper: TestProvider,
			}
		)

		await act(() => {
			result.current.followUser()
		})

		await waitFor(() => {
			expect(FollowApi.FollowUser).toHaveBeenCalledWith(mockFollowingUser.id)
			expect(mockCancelFollowRequests).not.toHaveBeenCalled()
			expect(mockApplyFollowOptimisticUpdate).not.toHaveBeenCalled()
			expect(mockRefreshFollowData).not.toHaveBeenCalled()
			expect(mockOnErrorFollow).not.toHaveBeenCalled()
		})
	})

	it('should remove following successfully', async () => {
		const { result } = renderHook(
			() =>
				useFollowUser(mockFollowingUser.id, {
					removeFollowingOptions: { onSuccess: mockOnSuccessRemove },
				}),
			{ wrapper: TestProvider }
		)

		await act(() => {
			result.current.removeFollowing(mockFollowingUser.followId)
		})

		await waitFor(() => {
			expect(FollowApi.RemoveFollow).toHaveBeenCalledWith(
				mockFollowingUser.followId
			)
			expect(mockCancelFollowRequests).toHaveBeenCalledWith({
				followerId: mockFollowingUser.id,
				followingId: mockUser.id,
			})
			expect(mockSnapshotFollowData).toHaveBeenCalledWith({
				followerId: mockFollowingUser.id,
				followingId: mockUser.id,
			})
			expect(mockApplyFollowOptimisticUpdate).toHaveBeenCalledWith({
				followerId: mockFollowingUser.id,
				followingId: mockUser.id,
				isFollowing: false,
			})
			expect(mockOnSuccessRemove).toHaveBeenCalled()
			expect(mockRefreshFollowData).toHaveBeenCalledWith({
				followerId: mockFollowingUser.id,
				followingId: mockUser.id,
			})
			expect(result.current.isSuccessRemoveFollowing).toBe(true)
		})
	})

	it('should handle error when removing follow', async () => {
		const error = new Error('Network error')
		jest.spyOn(FollowApi, 'RemoveFollow').mockRejectedValueOnce(error)

		const { result } = renderHook(
			() =>
				useFollowUser(mockFollowingUser.id, {
					removeFollowingOptions: {
						onError: mockOnErrorRemove,
						errorMessage: 'custom unfollow error',
					},
				}),
			{ wrapper: TestProvider }
		)

		await act(() => {
			result.current.removeFollowing(mockFollowingUser.followId)
		})

		await waitFor(() => {
			expect(mockOnErrorRemove).toHaveBeenCalledWith('custom unfollow error')
			expect(mockCancelFollowRequests).toHaveBeenCalledTimes(2)
			expect(mockRestoreFollowData).toHaveBeenCalledWith({
				followerId: mockFollowingUser.id,
				followingId: mockUser.id,
			})
			expect(result.current.errorRemoveFollowing).toBeDefined()
		})
	})

	it('should use default error message when not provided in remove follow', async () => {
		const error = new Error('Network error')
		jest.spyOn(FollowApi, 'RemoveFollow').mockRejectedValueOnce(error)

		const { result } = renderHook(
			() =>
				useFollowUser(mockFollowingUser.id, {
					removeFollowingOptions: { onError: mockOnErrorRemove },
				}),
			{ wrapper: TestProvider }
		)

		await act(() => {
			result.current.removeFollowing(mockFollowingUser.followId)
		})

		await waitFor(() => {
			expect(mockOnErrorRemove).toHaveBeenCalledWith(
				'erro ao deixar de seguir o usuário'
			)
		})
	})

	it('should handle null user id success case remove follow', async () => {
		;(useAuthCredentials as MockUseAuthCredentials).mockReturnValue({
			user: { ...mockUser, id: null } as unknown as UserModel,
		})

		const { result } = renderHook(() => useFollowUser(mockFollowingUser.id), {
			wrapper: TestProvider,
		})

		await act(() => {
			result.current.removeFollowing(mockFollowingUser.followId)
		})

		await waitFor(() => {
			expect(FollowApi.RemoveFollow).toHaveBeenCalledWith(
				mockFollowingUser.followId
			)
			expect(mockCancelFollowRequests).not.toHaveBeenCalled()
			expect(mockApplyFollowOptimisticUpdate).not.toHaveBeenCalled()
			expect(mockRefreshFollowData).not.toHaveBeenCalled()
		})
	})

	it('should handle null user id error case remove follow', async () => {
		const error = new Error('Network error')
		jest.spyOn(FollowApi, 'RemoveFollow').mockRejectedValueOnce(error)
		;(useAuthCredentials as MockUseAuthCredentials).mockReturnValue({
			user: { ...mockUser, id: null } as unknown as UserModel,
		})

		const { result } = renderHook(
			() =>
				useFollowUser(mockFollowingUser.id, {
					removeFollowingOptions: { onError: mockOnErrorRemove },
				}),
			{
				wrapper: TestProvider,
			}
		)

		await act(() => {
			result.current.removeFollowing(mockFollowingUser.followId)
		})

		await waitFor(() => {
			expect(FollowApi.RemoveFollow).toHaveBeenCalledWith(
				mockFollowingUser.followId
			)
			expect(mockCancelFollowRequests).not.toHaveBeenCalled()
			expect(mockApplyFollowOptimisticUpdate).not.toHaveBeenCalled()
			expect(mockRefreshFollowData).not.toHaveBeenCalled()
			expect(mockOnErrorRemove).not.toHaveBeenCalled()
		})
	})

	it('should call followUser function when undoRemoveFollow is called', async () => {
		const { result } = renderHook(() => useFollowUser(mockFollowingUser.id), {
			wrapper: TestProvider,
		})

		await act(() => {
			result.current.undoRemoveFollow()
		})

		await waitFor(() => {
			expect(FollowApi.FollowUser).toHaveBeenCalledWith(mockFollowingUser.id)
		})
	})

	it('should expose reset functions', async () => {
		const { result } = renderHook(() => useFollowUser(mockFollowingUser.id), {
			wrapper: TestProvider,
		})

		expect(typeof result.current.resetFollowUser).toBe('function')
		expect(typeof result.current.resetRemoveFollowing).toBe('function')

		await act(() => {
			result.current.resetFollowUser()
			result.current.resetRemoveFollowing()
		})
	})

	it('should expose loading states', () => {
		const { result } = renderHook(() => useFollowUser(mockFollowingUser.id), {
			wrapper: TestProvider,
		})

		expect(result.current.isPendingFollowUser).toBe(false)
		expect(result.current.isPendingRemoveFollowing).toBe(false)
	})
})
