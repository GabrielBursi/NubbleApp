import { screen, userEvent, waitFor } from '@testing-library/react-native'
import { http, HttpResponse } from 'msw'
import Config from 'react-native-config'

import { PostApi, PostAPIModel } from '@/domain/Post'
import { useUserGetById } from '@/domain/User/useCases/useUserGetById/useUserGetById'
import { useAppNavigation } from '@/hooks/useAppNavigation/useAppNavigation'
import {
	generatePostAPI,
	generateUser,
	mockMetaPaginationApi,
} from '@/tests/mocks'
import { serverTest } from '@/tests/server'
import { customRender } from '@/tests/utils'
import { END_POINTS_API, PageAPI } from '@/types/api'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { Profile } from './Profile'

type UseUserGetById = typeof useUserGetById
type ReturnUseUseUserGetById = ReturnHookMocked<UseUserGetById>
type MockUseUseUserGetById = HookMocked<UseUserGetById>

type UseAppNavigation = typeof useAppNavigation
type ReturnUseAppNavigation = ReturnHookMocked<UseAppNavigation>
type MockUseAppNavigation = HookMocked<UseAppNavigation>

jest.mock('@/domain/User/useCases/useUserGetById/useUserGetById')
jest.mock('@/hooks/useAppNavigation/useAppNavigation')

describe('<Profile/>', () => {
	const spyGetPosts = jest.spyOn(PostApi, 'GetPosts')
	const mockRefetch = jest.fn()
	const mockNavigateToPostDetails = jest.fn()
	const mockUser = generateUser()
	const mockPost = generatePostAPI()

	const mockReturnUseUseUserGetById: ReturnUseUseUserGetById = {
		user: mockUser,
		error: null,
		isLoading: false,
		refetch: mockRefetch,
	}

	const mockReturnUseAppNavigation: ReturnUseAppNavigation = {
		navigate: {
			toPostDetails: mockNavigateToPostDetails,
		},
	}

	beforeEach(() => {
		;(useUserGetById as MockUseUseUserGetById).mockReturnValue(
			mockReturnUseUseUserGetById
		)
		;(useAppNavigation as MockUseAppNavigation).mockReturnValue(
			mockReturnUseAppNavigation
		)
	})

	it('should call useUserGetById with user id', () => {
		customRender(<Profile userId={mockUser.id} />)
		expect(useUserGetById).toHaveBeenCalledWith(mockUser.id)
	})

	it('should render loading', () => {
		;(useUserGetById as MockUseUseUserGetById).mockReturnValue({
			...mockReturnUseUseUserGetById,
			isLoading: true,
		})
		customRender(<Profile userId={mockUser.id} />)
		expect(screen.getByTestId('loading-indicator')).toBeOnTheScreen()
		expect(screen.queryByRole('list')).not.toBeOnTheScreen()
	})

	it('should render the profile', async () => {
		serverTest.use(
			...[
				http.get(`${Config.API_URL}${END_POINTS_API.POST}`, () =>
					HttpResponse.json<PageAPI<PostAPIModel>>(
						{ data: [mockPost], meta: mockMetaPaginationApi },
						{ status: 200 }
					)
				),
			]
		)

		customRender(<Profile userId={mockUser.id} />)

		await waitFor(() => {
			expect(screen.getByRole('list', { name: 'user posts' })).toBeOnTheScreen()
		})
		await waitFor(() => {
			expect(spyGetPosts).toHaveBeenCalledWith(1, String(mockUser.id))
		})
		await waitFor(() => {
			expect(
				screen.getByRole('img', { name: mockUser.profileUrl })
			).toBeOnTheScreen()
		})
		await waitFor(() => {
			expect(screen.getByText(mockUser.fullName)).toBeOnTheScreen()
		})
		await waitFor(() => {
			expect(screen.getByText(`@${mockUser.username}`)).toBeOnTheScreen()
		})
		await waitFor(() => {
			expect(
				screen.getByText(`${mockUser.meta.followersCount}`)
			).toBeOnTheScreen()
		})
		await waitFor(() => {
			expect(
				screen.getByText(`${mockUser.meta.followingCount}`)
			).toBeOnTheScreen()
		})
		await waitFor(() => {
			expect(
				screen.getByText(`${mockMetaPaginationApi.total}`)
			).toBeOnTheScreen()
		})
		await waitFor(() => {
			expect(
				screen.getAllByRole('img', { name: mockPost.image_url }).length
			).toBeGreaterThan(0)
		})
	})

	it('should navigate to post details screen', async () => {
		serverTest.use(
			...[
				http.get(`${Config.API_URL}${END_POINTS_API.POST}`, () =>
					HttpResponse.json<PageAPI<PostAPIModel>>(
						{ data: [mockPost], meta: mockMetaPaginationApi },
						{ status: 200 }
					)
				),
			]
		)

		customRender(<Profile userId={mockUser.id} />)

		await waitFor(() => {
			expect(screen.getByRole('list', { name: 'user posts' })).toBeOnTheScreen()
		})

		await waitFor(() => {
			expect(
				screen.getAllByRole('img', { name: mockPost.image_url }).length
			).toBeGreaterThan(0)
		})

		await userEvent.press(
			screen.getAllByRole('img', { name: mockPost.image_url })[0]!
		)
		expect(mockNavigateToPostDetails).toHaveBeenCalledWith({
			postAuthorId: mockUser.id.toString(),
			postId: mockPost.id.toString(),
		})
	})
})
