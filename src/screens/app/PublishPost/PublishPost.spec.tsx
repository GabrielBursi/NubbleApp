import { screen, userEvent } from '@testing-library/react-native'

import { usePostCreate } from '@/domain/Post/useCases/usePostCreate/usePostCreate'
import { useToastService } from '@/services/toast/useToast'
import { mockUseNavigation } from '@/tests/mocks'
import { customFaker, customRender } from '@/tests/utils'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { PublishPostScreen } from './PublishPost'

type UseToastService = typeof useToastService
type ReturnUseToastService = ReturnHookMocked<UseToastService>
type MockUseToastService = HookMocked<UseToastService>

type UsePostCreate = typeof usePostCreate
type ReturnUsePostCreate = ReturnHookMocked<UsePostCreate>
type MockUsePostCreate = HookMocked<UsePostCreate>

jest.mock('@/services/toast/useToast')
jest.mock('@/domain/Post/useCases/usePostCreate/usePostCreate')

describe('<PublishPostScreen/>', () => {
	const mockImage = customFaker.image.url()
	const mockShowToast = jest.fn()
	const mockCreatePost = jest.fn()

	const returnUseToast: ReturnUseToastService = {
		showToast: mockShowToast,
	}

	const returnUsePostCreate: ReturnUsePostCreate = {
		loading: false,
		createPost: mockCreatePost,
	}

	beforeEach(() => {
		;(useToastService as MockUseToastService).mockReturnValue(returnUseToast)
		;(usePostCreate as MockUsePostCreate).mockReturnValue(returnUsePostCreate)
		;(usePostCreate as MockUsePostCreate).mockImplementation(
			({ onSuccess }: { onSuccess: () => void }) => {
				return {
					...returnUsePostCreate,
					createPost: mockCreatePost.mockImplementation(() => {
						onSuccess()
					}),
				}
			}
		)
	})

	it('should render the screen correctly', () => {
		customRender(
			<PublishPostScreen // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
				navigation={mockUseNavigation as any}
				route={{
					key: 'PublishPostScreen',
					name: 'PublishPostScreen',
					params: {
						imageUri: mockImage,
					},
				}}
			/>
		)

		expect(screen.getByRole('img', { name: mockImage })).toBeOnTheScreen()
		expect(
			screen.getByLabelText('Escreva uma legenda', { exact: true })
		).toBeOnTheScreen()
		expect(screen.getByRole('button', { name: 'Publicar post' })).toBeDisabled()
	})

	it('should publish a post', async () => {
		customRender(
			<PublishPostScreen // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
				navigation={mockUseNavigation as any}
				route={{
					key: 'PublishPostScreen',
					name: 'PublishPostScreen',
					params: {
						imageUri: mockImage,
					},
				}}
			/>
		)

		await userEvent.type(
			screen.getByLabelText('Escreva uma legenda', { exact: true }),
			'my post'
		)

		await userEvent.press(screen.getByRole('button', { name: 'Publicar post' }))

		expect(mockCreatePost).toHaveBeenCalledWith({
			description: 'my post',
			imageUri: mockImage,
		})
		expect(mockUseNavigation.navigate).toHaveBeenCalledWith('HomeScreen')
		expect(mockShowToast).toHaveBeenCalled()
	})
})
