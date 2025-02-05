import { screen } from '@testing-library/react-native'

import { mockAppImages } from '@/tests/mocks'
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

	it('should render the placeholder imagem on header correctly', () => {
		customRender(<HeaderPhotoList />)

		expect(screen.getByRole('banner')).toHaveProp('source', {
			uri: mockAppImages.ImagePlaceholder,
		})
	})
})
