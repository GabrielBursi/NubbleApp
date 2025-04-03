import { screen, waitFor } from '@testing-library/react-native'
import { http, HttpResponse } from 'msw'
import Config from 'react-native-config'

import { PostApi, PostAPIModel } from '@/domain/Post'
import { useUserGetById } from '@/domain/User/useCases/useUserGetById/useUserGetById'
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

jest.mock('@/domain/User/useCases/useUserGetById/useUserGetById')

describe('<Profile/>', () => {
	const spyGetPosts = jest.spyOn(PostApi, 'GetPosts')
	const mockRefetch = jest.fn()

	const mockUser = generateUser()

	const mockReturnUseUseUserGetById: ReturnUseUseUserGetById = {
		user: mockUser,
		error: null,
		isLoading: false,
		refetch: mockRefetch,
	}

	beforeEach(() => {
		;(useUserGetById as MockUseUseUserGetById).mockReturnValue(
			mockReturnUseUseUserGetById
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
		const mockPost = generatePostAPI()

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
			).toBeGreaterThan(1)
		})
	})
})
