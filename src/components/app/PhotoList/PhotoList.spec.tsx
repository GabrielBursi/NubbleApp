import { screen } from '@testing-library/react-native'

import { mockAppImages } from '@/tests/mocks'
import { customFaker, customRender } from '@/tests/utils'

import { PhotoList } from './PhotoList'

describe('<PhotoList/>', () => {
	const mockImages = Array.from({ length: 15 }, () =>
		customFaker.image.urlPicsumPhotos({ width: 90 })
	)

	it('should render the list correctly', () => {
		customRender(<PhotoList />)

		expect(screen.getByRole('list', { name: /photos/i })).toBeOnTheScreen()
	})

	it('should render the placeholder imagem on header correctly', () => {
		customRender(<PhotoList />)

		expect(screen.getByRole('banner')).toHaveProp('source', {
			uri: mockAppImages.ImagePlaceholder,
		})
	})

	it('should render the images on list correctly', () => {
		customRender(<PhotoList urlImages={mockImages} />)

		expect(
			screen.getByRole('listitem', { name: mockImages[0] })
		).toBeOnTheScreen()
	})
})
