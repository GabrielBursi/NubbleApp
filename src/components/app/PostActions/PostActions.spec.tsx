/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { screen, userEvent } from '@testing-library/react-native'

import { PostReactionType } from '@/domain/PostReaction'
import { useReaction } from '@/domain/PostReaction/useCases/useReaction/useReaction'
import { useNavigationApp } from '@/hooks/useNavigationApp/useNavigationApp'
import { useToastService } from '@/services/toast/useToast'
import { generatePost, mockUseNavigation } from '@/tests/mocks'
import { customRender } from '@/tests/utils'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { PostActions } from './PostActions'

type UseToastService = typeof useToastService
type ReturnUseToastService = ReturnHookMocked<UseToastService>
type MockUseToastService = HookMocked<UseToastService>

type UseReaction = typeof useReaction
type ReturnUseReaction = ReturnHookMocked<UseReaction>
type MockUseReaction = HookMocked<UseReaction>

type UseNavigationApp = typeof useNavigationApp
type ReturnUseNavigationApp = ReturnHookMocked<UseNavigationApp>
type MockUseNavigationApp = HookMocked<UseNavigationApp>

jest.mock('@/services/toast/useToast')
jest.mock('@/domain/PostReaction/useCases/useReaction/useReaction')
jest.mock('@/hooks/useNavigationApp/useNavigationApp')

describe('<PostActions/>', () => {
	const mockHideToast = jest.fn()
	const mockShowToast = jest.fn()
	const mockReactToPost = jest.fn()

	const mockUseToastService: ReturnUseToastService = {
		hideToast: mockHideToast,
		showToast: mockShowToast,
	}

	const mockUseNavigationApp: ReturnUseNavigationApp = {
		navigationAppStack: mockUseNavigation,
	}

	const mockUseReaction: ReturnUseReaction = {
		error: null,
		hasReacted: false,
		isLoading: false,
		reaction: null,
		reactToPost: mockReactToPost,
	}

	const post = generatePost()

	beforeEach(() => {
		;(useToastService as MockUseToastService).mockReturnValue(
			mockUseToastService
		)
		;(useNavigationApp as MockUseNavigationApp).mockReturnValue(
			mockUseNavigationApp
		)
		;(useReaction as MockUseReaction).mockReturnValue(mockUseReaction)
	})

	it('should render the actions correctly', () => {
		customRender(<PostActions post={post} />)

		const actions = screen.getAllByRole('img')

		expect(actions).toHaveLength(3)
	})

	it('should hide comment action correctly', async () => {
		customRender(<PostActions post={post} hideCommentAction />)

		const actions = screen.getAllByRole('img')

		for (const icon of actions) {
			await userEvent.press(icon)
		}

		expect(actions).toHaveLength(2)
	})

	it('should call useReaction correctly', () => {
		customRender(<PostActions post={post} />)

		expect(useReaction).toHaveBeenCalledTimes(2)
		expect(useReaction).toHaveBeenCalledWith({
			post,
			postReactionType: PostReactionType.FAVORITE,
			options: expect.anything(),
		})
		expect(useReaction).toHaveBeenCalledWith({
			post,
			postReactionType: PostReactionType.LIKE,
			options: expect.anything(),
		})
	})

	it('should navigate to comments correctly', async () => {
		customRender(<PostActions post={post} />)

		await userEvent.press(screen.getByRole('img', { name: 'comment' }))

		expect(mockUseNavigation.navigate).toHaveBeenCalledWith(
			'PostCommentScreen',
			{
				postAuthorId: post.author.id,
				postId: post.id,
			}
		)
	})

	it('should like post correctly', async () => {
		customRender(<PostActions post={post} />)

		await userEvent.press(screen.getByRole('img', { name: 'heart' }))
		expect(mockReactToPost).toHaveBeenCalled()
	})

	it('should favorite post correctly', async () => {
		customRender(<PostActions post={post} />)

		await userEvent.press(screen.getByRole('img', { name: 'bookmark' }))
		expect(mockReactToPost).toHaveBeenCalled()
	})

	it('should show toast error when like fails correctly', async () => {
		;(useReaction as MockUseReaction).mockImplementation(
			({ options: { onError } }: { options: { onError: () => void } }) => {
				return {
					...mockUseReaction,
					reactToPost: jest.fn(() => {
						onError()
					}),
				}
			}
		)

		customRender(<PostActions post={post} />)

		await userEvent.press(screen.getByRole('img', { name: 'heart' }))
		expect(mockShowToast).toHaveBeenCalledWith({
			type: 'error',
			message: 'Ocorreu um erro ao dar like no post.',
			position: 'bottom',
		})
	})

	it('should show toast error when favorite fails correctly', async () => {
		;(useReaction as MockUseReaction).mockImplementation(
			({ options: { onError } }: { options: { onError: () => void } }) => {
				return {
					...mockUseReaction,
					reactToPost: jest.fn(() => {
						onError()
					}),
				}
			}
		)
		customRender(<PostActions post={post} />)

		await userEvent.press(screen.getByRole('img', { name: 'bookmark' }))
		expect(mockShowToast).toHaveBeenCalledWith({
			type: 'error',
			message: 'Ocorreu um erro ao favoritar post.',
			position: 'bottom',
		})
	})

	it('should render like and favorite actions marked', () => {
		;(useReaction as MockUseReaction).mockReturnValue({
			...mockUseReaction,
			hasReacted: true,
		})

		customRender(<PostActions post={post} />)

		expect(screen.getByRole('img', { name: 'heartFill' })).toBeOnTheScreen()
		expect(screen.getByRole('img', { name: 'bookmarkFill' })).toBeOnTheScreen()
	})
})
