import { screen, userEvent } from '@testing-library/react-native'

import { themeConfig } from '@/styles'
import { customFaker, customRender } from '@/tests/utils'

import { PhotoList } from './PhotoList'

describe('<PhotoList/>', () => {
	const mockOnPressImage = jest.fn()

	const mockImages = Array.from({ length: 15 }, () =>
		customFaker.image.urlPicsumPhotos({ width: 90 })
	)

	it('should render the list correctly', () => {
		customRender(<PhotoList />)

		expect(screen.getByRole('list', { name: /photos/i })).toBeOnTheScreen()
	})

	it('should render the images on list correctly', () => {
		customRender(<PhotoList urlImages={mockImages} />)

		expect(
			screen.getByRole('listitem', { name: mockImages[0] })
		).toBeOnTheScreen()
	})

	it('should press the image on list correctly', async () => {
		customRender(
			<PhotoList urlImages={[mockImages[0]!]} onPressImage={mockOnPressImage} />
		)

		await userEvent.press(screen.getByRole('listitem', { name: mockImages[0] }))
		expect(mockOnPressImage).toHaveBeenCalledWith(mockImages[0])
	})

	it('should render the selected image correctly', () => {
		customRender(
			<PhotoList urlImages={[mockImages[0]!]} selectedImage={mockImages[0]} />
		)

		expect(screen.getByRole('listitem', { name: mockImages[0] })).toHaveStyle({
			borderColor: themeConfig.colors.greenPrimary,
			borderRadius: 8,
			borderWidth: 2,
			opacity: 0.5,
		})
	})
})
