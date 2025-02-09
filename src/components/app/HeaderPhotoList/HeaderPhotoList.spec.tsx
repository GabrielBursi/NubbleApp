import { screen, userEvent } from '@testing-library/react-native'

import { PhotoList } from '@/services/cameraRoll'
import { mockAppImages, mockUseNavigation } from '@/tests/mocks'
import { customFaker, customRender } from '@/tests/utils'

import { HeaderPhotoList } from './HeaderPhotoList'

describe('<HeaderPhotoList/>', () => {
	const mockImage: PhotoList = {
		uri: customFaker.image.url(),
		id: customFaker.string.uuid(),
	}

	it('should render the header correctly', () => {
		customRender(<HeaderPhotoList selectedImage={mockImage} />)

		expect(
			screen.getByRole('banner', { name: mockImage.uri })
		).toBeOnTheScreen()
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
				imageUri: mockImage.uri,
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
