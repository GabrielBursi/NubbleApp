import { screen, userEvent } from '@testing-library/react-native'

import { PhotoList as IPhotoList } from '@/services/cameraRoll'
import { themeConfig } from '@/styles'
import { customFaker, customRender } from '@/tests/utils'

import { PhotoList } from './PhotoList'

describe('<PhotoList/>', () => {
	const mockOnPressImage = jest.fn()

	const mockImages: IPhotoList[] = Array.from({ length: 15 }, () => ({
		uri: customFaker.image.url(),
		id: customFaker.string.uuid(),
	}))

	it('should render the list correctly', () => {
		customRender(<PhotoList />)

		expect(screen.getByRole('list', { name: /photos/i })).toBeOnTheScreen()
	})

	it('should render the images on list correctly', () => {
		customRender(<PhotoList photos={mockImages} />)

		expect(
			screen.getByRole('listitem', { name: mockImages[0]?.uri })
		).toBeOnTheScreen()
	})

	it('should press the image on list correctly', async () => {
		customRender(
			<PhotoList photos={[mockImages[0]!]} onPressImage={mockOnPressImage} />
		)

		await userEvent.press(
			screen.getByRole('listitem', { name: mockImages[0]?.uri })
		)
		expect(mockOnPressImage).toHaveBeenCalledWith(mockImages[0])
	})

	it('should render the selected image correctly', () => {
		customRender(<PhotoList photos={[mockImages[0]!]} indexSelectedImage={0} />)

		expect(
			screen.getByRole('listitem', { name: mockImages[0]?.uri })
		).toHaveStyle({
			borderColor: themeConfig.colors.greenPrimary,
		})
	})
})
