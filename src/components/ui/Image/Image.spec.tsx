import { Dimensions } from 'react-native'

import { screen } from '@testing-library/react-native'

import { customFaker, customRender } from '@/tests/utils'

import { Image } from './Image'

describe('<Image/>', () => {
	const image = customFaker.image.url()
	const size = Dimensions.get('screen').width

	it('should render', () => {
		customRender(<Image width={size} height={size} source={{ uri: image }} />)

		expect(screen.getByRole('img')).toBeOnTheScreen()
	})
})
