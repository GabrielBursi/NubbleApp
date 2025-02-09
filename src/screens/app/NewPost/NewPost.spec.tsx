import { Alert } from 'react-native'

import { screen, userEvent, waitFor } from '@testing-library/react-native'

import { PhotoList } from '@/services/cameraRoll'
import { useCameraRoll } from '@/services/cameraRoll/useCameraRoll'
import { usePermission } from '@/services/permission/usePermission'
import { customFaker, customRender } from '@/tests/utils'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { NewPostScreen } from './NewPost'

type UseCameraRoll = typeof useCameraRoll
type ReturnUseCameraRoll = ReturnHookMocked<UseCameraRoll>
type MockUseCameraRoll = HookMocked<UseCameraRoll>

type UsePermission = typeof usePermission
type ReturnUsePermission = ReturnHookMocked<UsePermission>
type MockUsePermission = HookMocked<UsePermission>

jest.mock('@/services/cameraRoll/useCameraRoll')
jest.mock('@/services/permission/usePermission')

describe('<NewPostScreen/>', () => {
	const mockImages: PhotoList[] = Array.from({ length: 15 }, () => ({
		uri: customFaker.image.url(),
		id: customFaker.string.uuid(),
	}))

	const spyAlert = jest.spyOn(Alert, 'alert')
	const mockFetchNextPage = jest.fn()
	const mockCheckPermission = jest.fn()

	const mockReturnUseCameraRoll: ReturnUseCameraRoll = {
		photoList: mockImages,
		fetchNextPage: mockFetchNextPage,
		hasNextPage: false,
	}

	const mockReturnUsePermission: ReturnUsePermission = [
		{ status: 'granted', isLoading: false },
		mockCheckPermission,
	]

	beforeEach(() => {
		mockCheckPermission.mockResolvedValue(true)
		;(usePermission as unknown as MockUsePermission).mockReturnValue(
			mockReturnUsePermission
		)
		;(useCameraRoll as MockUseCameraRoll).mockReturnValue(
			mockReturnUseCameraRoll
		)
	})

	it('should render the  screen with photos list correctly', () => {
		customRender(<NewPostScreen />)

		expect(screen.getByRole('list', { name: /photos/i })).toBeOnTheScreen()
		expect(
			screen.getByRole('listitem', { name: mockImages[0]?.uri })
		).toBeOnTheScreen()
	})

	it('should show error on try to request permission correctly', async () => {
		mockCheckPermission.mockRejectedValue(false)

		customRender(<NewPostScreen />)

		await waitFor(() => {
			expect(spyAlert).toHaveBeenCalled()
		})
	})

	it('should select the image on list correctly', async () => {
		;(useCameraRoll as MockUseCameraRoll).mockReturnValue({
			...mockReturnUseCameraRoll,
			photoList: [mockImages[0]],
		})

		customRender(<NewPostScreen />)

		await userEvent.press(
			screen.getByRole('listitem', { name: mockImages[0]?.uri })
		)

		expect(
			screen.getByRole('banner', { name: mockImages[0]?.uri })
		).toBeOnTheScreen()
	})
})
