import { screen } from '@testing-library/react-native'

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

	const mockReturn: ReturnUseCameraRoll = {
		photoList: mockImages,
		fetchNextPage: mockFetchNextPage,
		hasNextPage: false,
	}

	beforeEach(() => {
		;(useCameraRoll as MockUseCameraRoll).mockReturnValue(mockReturn)
	})

	it('should render the  screen with photos list correctly', () => {
		customRender(<NewPostScreen />)

		expect(screen.getByRole('list', { name: /photos/i })).toBeOnTheScreen()
		expect(
			screen.getByRole('listitem', { name: mockImages[0] })
		).toBeOnTheScreen()
	})
})
