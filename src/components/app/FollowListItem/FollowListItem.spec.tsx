import { screen, userEvent } from '@testing-library/react-native'

import { useFollowUser } from '@/domain/Follow'
import { useToastService } from '@/services/toast'
import { generateFollowUser } from '@/tests/mocks'
import { customRender } from '@/tests/utils'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { FollowListItem } from './FollowListItem'
import { FollowListItemProps } from './FollowListItem.types'

type UseToastService = typeof useToastService
type ReturnUseToastService = ReturnHookMocked<UseToastService>
type MockUseToastService = HookMocked<UseToastService>

type UseFollowUser = typeof useFollowUser
type ReturnUseFollowUser = ReturnHookMocked<UseFollowUser>
type MockUseFollowUser = HookMocked<UseFollowUser>

jest.mock('@/services/toast/useToast')
jest.mock('@/domain/Follow/useCases/useFollowUser/useFollowUser')

describe('<FollowListItem/>', () => {
	const mockShowToast = jest.fn()
	const mockRemoveFollowing = jest.fn()
	const mockUndoRemoveFollow = jest.fn()

	const mockUseToastService: ReturnUseToastService = {
		showToast: mockShowToast,
	}

	const mockReturnUseFollowUser: ReturnUseFollowUser = {
		removeFollowing: mockRemoveFollowing,
		undoRemoveFollow: mockUndoRemoveFollow,
	}

	beforeEach(() => {
		;(useToastService as MockUseToastService).mockReturnValue(
			mockUseToastService
		)
		;(useFollowUser as MockUseFollowUser).mockImplementation(
			(
				_id: number,
				options: { removeFollowingOptions: { onSuccess: () => void } }
			) => {
				return {
					...mockReturnUseFollowUser,
					removeFollowing: () => {
						options.removeFollowingOptions?.onSuccess?.()
						mockReturnUseFollowUser?.removeFollowing?.(
							mockBasicProps.user.followId
						)
					},
				}
			}
		)
	})

	const mockBasicProps: FollowListItemProps = {
		buttonTitle: 'Storybook',
		toastMessage: 'Jest',
		user: generateFollowUser(),
	}

	it('renders username and button', () => {
		customRender(<FollowListItem {...mockBasicProps} />)
		expect(screen.getByText(mockBasicProps.user.username)).toBeOnTheScreen()
		expect(
			screen.getAllByRole('button', { name: mockBasicProps.buttonTitle })
		).toHaveLength(2)
	})

	it('calls useFollowUser with correct id and removeFollowingOptions', () => {
		customRender(<FollowListItem {...mockBasicProps} />)
		expect(useFollowUser).toHaveBeenCalledWith(
			mockBasicProps.user.id,
			expect.objectContaining({
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				removeFollowingOptions: expect.objectContaining({
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
					onSuccess: expect.any(Function),
				}),
			})
		)
	})

	it('calls removeFollowing when button pressed', async () => {
		customRender(<FollowListItem {...mockBasicProps} />)
		await userEvent.press(
			screen.getAllByRole('button', { name: mockBasicProps.buttonTitle })[1]!
		)
		expect(mockRemoveFollowing).toHaveBeenCalledWith(
			mockBasicProps.user.followId
		)
	})

	it('shows toast without undo when canUndoRemoveFollow is false', async () => {
		customRender(<FollowListItem {...mockBasicProps} />)
		await userEvent.press(
			screen.getAllByRole('button', { name: mockBasicProps.buttonTitle })[1]!
		)
		expect(mockShowToast).toHaveBeenCalledWith({
			message: mockBasicProps.toastMessage,
			type: 'success',
			position: 'bottom',
			action: undefined,
		})
	})

	it('shows toast with undo action when canUndoRemoveFollow is true and calls undo on action press', async () => {
		customRender(<FollowListItem {...mockBasicProps} canUndoRemoveFollow />)
		await userEvent.press(
			screen.getAllByRole('button', { name: mockBasicProps.buttonTitle })[1]!
		)
		expect(mockShowToast).toHaveBeenCalledWith({
			message: mockBasicProps.toastMessage,
			type: 'success',
			position: 'bottom',
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			action: expect.objectContaining({
				title: 'Desfazer',
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				onPress: expect.any(Function),
			}),
		})
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		const action = mockShowToast.mock.calls[0][0].action!
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
		action.onPress!()
		expect(mockUndoRemoveFollow).toHaveBeenCalled()
	})
})
