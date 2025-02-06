import { screen, userEvent } from '@testing-library/react-native'

import { mockAppImages, mockUseNavigation } from '@/tests/mocks'
import { customFaker, customRender } from '@/tests/utils'

import { HeaderPhotoList } from './HeaderPhotoList'

describe('<HeaderPhotoList/>', () => {
	const mockImage = customFaker.image.url()

	it('should render the header correctly', () => {
		customRender(<HeaderPhotoList selectedImage={mockImage} />)

		expect(screen.getByRole('banner', { name: mockImage })).toBeOnTheScreen()
		expect(screen.getByRole('text', { name: 'Sua galeria' })).toBeOnTheScreen()
		expect(screen.getByRole('img', { name: 'camera' })).toBeOnTheScreen()
	})

	it('should navigate to publish post screen correctly', async () => {
		customRender(<HeaderPhotoList selectedImage={mockImage} />)

		await userEvent.press(
			screen.getByRole('button', { name: /Escolher essa/i })
		)

		expect(mockUseNavigation.navigate).toHaveBeenCalledWith(
			'PublishPostScreen',
			{
				imageUri: mockImage,
			}
		)
	})

	it('should render the placeholder imagem on header correctly', () => {
		customRender(<HeaderPhotoList />)

		expect(screen.getByRole('banner')).toHaveProp(
			'source',
			mockAppImages.ImagePlaceholder
		)
	})
})
