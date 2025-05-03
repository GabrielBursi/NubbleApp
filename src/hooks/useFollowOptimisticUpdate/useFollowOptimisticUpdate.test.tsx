import { QueryKey, useQueryClient } from '@tanstack/react-query'
import { act, renderHook } from '@testing-library/react-native'

import { UserDetailsModel } from '@/domain/User'
import { TestProvider } from '@/providers'
import { generateUserDetails } from '@/tests/mocks'
import { AppQueryKeys } from '@/types/api'
import { ReturnHookMocked } from '@/types/tests'

import { useFollowOptimisticUpdate } from './useFollowOptimisticUpdate'

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

const mockReturnUseQueryClient: ReturnHookMocked<typeof useQueryClient> = {
	setQueryData: mockSetQueryData,
	invalidateQueries: mockInvalidateQueries,
	cancelQueries: mockCancelQueries,
	getQueryData: mockGetQueryData,
}

jest.mock<{ useQueryClient: () => typeof mockReturnUseQueryClient }>(
	'@tanstack/react-query',
	() => ({
		...jest.requireActual('@tanstack/react-query'),
		useQueryClient: () => mockReturnUseQueryClient,
	})
)

describe('useFollowOptimisticUpdate', () => {
	const mockFollowingUser = generateUserDetails()
	const mockFollowerUser = generateUserDetails()
	const mockFollowingUserDetails: UserDetailsModel = {
		...mockFollowingUser,
		meta: {
			followersCount: 5,
			followingCount: 10,
		},
		isFollowing: false,
	}
	const mockFollowerUserDetails: UserDetailsModel = {
		...mockFollowerUser,
		meta: {
			followersCount: 3,
			followingCount: 7,
		},
	}

	const followQueryKeys = {
		followingId: mockFollowingUser.id,
		followerId: mockFollowerUser.id,
	}

	beforeEach(() => {
		jest.clearAllMocks()
		mockGetQueryData.mockImplementation((key: QueryKey) => {
			if (
				key[0] === AppQueryKeys.USER_BY_ID &&
				key[1] === mockFollowingUser.id
			) {
				return mockFollowingUserDetails
			}
			if (
				key[0] === AppQueryKeys.USER_BY_ID &&
				key[1] === mockFollowerUser.id
			) {
				return mockFollowerUserDetails
			}
			return undefined
		})
	})

	it('should cancel follow queries', async () => {
		const { result } = renderHook(() => useFollowOptimisticUpdate(), {
			wrapper: TestProvider,
		})

		await act(async () => {
			await result.current.cancelFollowRequests(followQueryKeys)
		})

		expect(mockCancelQueries).toHaveBeenCalledTimes(2)
		expect(mockCancelQueries).toHaveBeenCalledWith({
			queryKey: [AppQueryKeys.USER_BY_ID, mockFollowingUser.id],
			exact: true,
		})
		expect(mockCancelQueries).toHaveBeenCalledWith({
			queryKey: [AppQueryKeys.USER_BY_ID, mockFollowerUser.id],
			exact: true,
		})
	})

	it('should snapshot follow data', () => {
		const { result } = renderHook(() => useFollowOptimisticUpdate(), {
			wrapper: TestProvider,
		})

		const snapshot = result.current.snapshotFollowData(followQueryKeys)

		expect(mockGetQueryData).toHaveBeenCalledTimes(2)
		expect(mockGetQueryData).toHaveBeenCalledWith([
			AppQueryKeys.USER_BY_ID,
			mockFollowingUser.id,
		])
		expect(mockGetQueryData).toHaveBeenCalledWith([
			AppQueryKeys.USER_BY_ID,
			mockFollowerUser.id,
		])
		expect(snapshot).toEqual({
			previousFollowingUser: mockFollowingUserDetails,
			previousFollowerUser: mockFollowerUserDetails,
		})
	})

	it('should return null for users not found in snapshot', () => {
		mockGetQueryData.mockReturnValue(undefined)

		const { result } = renderHook(() => useFollowOptimisticUpdate(), {
			wrapper: TestProvider,
		})

		const snapshot = result.current.snapshotFollowData(followQueryKeys)

		expect(snapshot).toEqual({
			previousFollowingUser: null,
			previousFollowerUser: null,
		})
	})

	it('should restore follow data', () => {
		const { result } = renderHook(() => useFollowOptimisticUpdate(), {
			wrapper: TestProvider,
		})

		result.current.restoreFollowData(followQueryKeys)

		expect(mockSetQueryData).toHaveBeenCalledTimes(2)
		expect(mockSetQueryData).toHaveBeenCalledWith(
			[AppQueryKeys.USER_BY_ID, mockFollowingUser.id],
			mockFollowingUserDetails
		)
		expect(mockSetQueryData).toHaveBeenCalledWith(
			[AppQueryKeys.USER_BY_ID, mockFollowerUser.id],
			mockFollowerUserDetails
		)
	})

	it('should not restore data for undefined users', () => {
		mockGetQueryData.mockReturnValue(undefined)

		const { result } = renderHook(() => useFollowOptimisticUpdate(), {
			wrapper: TestProvider,
		})

		result.current.restoreFollowData(followQueryKeys)

		expect(mockSetQueryData).not.toHaveBeenCalled()
	})

	it('should refresh follow data', async () => {
		const { result } = renderHook(() => useFollowOptimisticUpdate(), {
			wrapper: TestProvider,
		})

		await act(async () => {
			await result.current.refreshFollowData(followQueryKeys)
		})

		expect(mockInvalidateQueries).toHaveBeenCalledTimes(3)
		expect(mockInvalidateQueries).toHaveBeenCalledWith({
			queryKey: [AppQueryKeys.MY_FOLLOWING_LIST],
		})
		expect(mockInvalidateQueries).toHaveBeenCalledWith({
			queryKey: [AppQueryKeys.USER_BY_ID, mockFollowingUser.id],
		})
		expect(mockInvalidateQueries).toHaveBeenCalledWith({
			queryKey: [AppQueryKeys.USER_BY_ID, mockFollowerUser.id],
		})
	})

	it('should apply follow optimistic update when following', () => {
		const { result } = renderHook(() => useFollowOptimisticUpdate(), {
			wrapper: TestProvider,
		})

		result.current.applyFollowOptimisticUpdate({
			...followQueryKeys,
			isFollowing: true,
		})

		expect(mockSetQueryData).toHaveBeenCalledTimes(2)

		const followingUserUpdater = (
			mockSetQueryData as MockSetQueryData
		).mock.calls.find(
			(call) =>
				call[0][0] === AppQueryKeys.USER_BY_ID &&
				call[0][1] === mockFollowingUser.id
		)![1]

		const followerUserUpdater = (
			mockSetQueryData as MockSetQueryData
		).mock.calls.find(
			(call) =>
				call[0][0] === AppQueryKeys.USER_BY_ID &&
				call[0][1] === mockFollowerUser.id
		)![1]

		const updatedFollowingUser = followingUserUpdater(mockFollowingUserDetails)
		const updatedFollowerUser = followerUserUpdater(mockFollowerUserDetails)

		expect(updatedFollowingUser!.isFollowing).toBe(true)
		expect(updatedFollowingUser!.meta.followersCount).toBe(
			mockFollowingUserDetails.meta.followersCount + 1
		)
		expect(updatedFollowerUser!.meta.followingCount).toBe(
			mockFollowerUserDetails.meta.followingCount + 1
		)
	})

	it('should apply unfollow optimistic update when unfollowing', () => {
		const followingUserWithFollowing = {
			...mockFollowingUserDetails,
			isFollowing: true,
		}

		mockGetQueryData.mockImplementation((key: QueryKey) => {
			if (
				key[0] === AppQueryKeys.USER_BY_ID &&
				key[1] === mockFollowingUser.id
			) {
				return followingUserWithFollowing
			}
			if (
				key[0] === AppQueryKeys.USER_BY_ID &&
				key[1] === mockFollowerUser.id
			) {
				return mockFollowerUserDetails
			}
			return undefined
		})

		const { result } = renderHook(() => useFollowOptimisticUpdate(), {
			wrapper: TestProvider,
		})

		result.current.applyFollowOptimisticUpdate({
			...followQueryKeys,
			isFollowing: false,
		})

		const followingUserUpdater = (
			mockSetQueryData as MockSetQueryData
		).mock.calls.find(
			(call) =>
				call[0][0] === AppQueryKeys.USER_BY_ID &&
				call[0][1] === mockFollowingUser.id
		)![1]

		const followerUserUpdater = (
			mockSetQueryData as MockSetQueryData
		).mock.calls.find(
			(call) =>
				call[0][0] === AppQueryKeys.USER_BY_ID &&
				call[0][1] === mockFollowerUser.id
		)![1]

		const updatedFollowingUser = followingUserUpdater(
			followingUserWithFollowing
		)
		const updatedFollowerUser = followerUserUpdater(mockFollowerUserDetails)

		expect(updatedFollowingUser!.isFollowing).toBe(false)
		expect(updatedFollowingUser!.meta.followersCount).toBe(
			followingUserWithFollowing.meta.followersCount - 1
		)
		expect(updatedFollowerUser!.meta.followingCount).toBe(
			mockFollowerUserDetails.meta.followingCount - 1
		)
	})

	it('should handle undefined users in optimistic update', () => {
		const { result } = renderHook(() => useFollowOptimisticUpdate(), {
			wrapper: TestProvider,
		})

		result.current.applyFollowOptimisticUpdate({
			...followQueryKeys,
			isFollowing: true,
		})

		const followingUserUpdater = (
			mockSetQueryData as MockSetQueryData
		).mock.calls.find(
			(call) =>
				call[0][0] === AppQueryKeys.USER_BY_ID &&
				call[0][1] === mockFollowingUser.id
		)![1]

		const followerUserUpdater = (
			mockSetQueryData as MockSetQueryData
		).mock.calls.find(
			(call) =>
				call[0][0] === AppQueryKeys.USER_BY_ID &&
				call[0][1] === mockFollowerUser.id
		)![1]

		expect(followingUserUpdater(undefined)).toBeUndefined()
		expect(followerUserUpdater(undefined)).toBeUndefined()
	})

	it('should return expected functions', () => {
		const { result } = renderHook(() => useFollowOptimisticUpdate(), {
			wrapper: TestProvider,
		})

		expect(typeof result.current.cancelFollowRequests).toBe('function')
		expect(typeof result.current.snapshotFollowData).toBe('function')
		expect(typeof result.current.restoreFollowData).toBe('function')
		expect(typeof result.current.refreshFollowData).toBe('function')
		expect(typeof result.current.applyFollowOptimisticUpdate).toBe('function')
	})
})
