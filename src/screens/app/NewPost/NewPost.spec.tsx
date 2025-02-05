import { screen, userEvent } from '@testing-library/react-native'

import { useCameraRoll } from '@/services/cameraRoll/useCameraRoll'
import { customFaker, customRender } from '@/tests/utils'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { NewPostScreen } from './NewPost'

type UseCameraRoll = typeof useCameraRoll
type ReturnUseCameraRoll = ReturnHookMocked<UseCameraRoll>
type MockUseCameraRoll = HookMocked<UseCameraRoll>

jest.mock('@/services/cameraRoll/useCameraRoll')

describe('<NewPostScreen/>', () => {
	const mockImages = Array.from({ length: 15 }, () =>
		customFaker.image.urlPicsumPhotos()
	)

	const mockFetchNextPage = jest.fn()

	const mockReturnUseCameraRoll: ReturnUseCameraRoll = {
		photoList: mockImages,
		fetchNextPage: mockFetchNextPage,
		hasNextPage: false,
	}

	beforeEach(() => {
		;(useCameraRoll as MockUseCameraRoll).mockReturnValue(
			mockReturnUseCameraRoll
		)
	})

	it('should render the  screen with photos list correctly', () => {
		customRender(<NewPostScreen />)

		expect(screen.getByRole('list', { name: /photos/i })).toBeOnTheScreen()
		expect(
			screen.getByRole('listitem', { name: mockImages[0] })
		).toBeOnTheScreen()
	})

	it('should select the image on list correctly', async () => {
		;(useCameraRoll as MockUseCameraRoll).mockReturnValue({
			...mockReturnUseCameraRoll,
			photoList: [mockImages[0]],
		})

		customRender(<NewPostScreen />)

		await userEvent.press(screen.getByRole('listitem', { name: mockImages[0] }))

		expect(
			screen.getByRole('banner', { name: mockImages[0] })
		).toBeOnTheScreen()
	})
})
