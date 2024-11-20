import { screen } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { NewPostScreen } from './NewPost'

describe('<NewPostScreen/>', () => {
	it('should render', () => {
		customRender(<NewPostScreen />)

		expect(screen.getByRole('text', { name: /NewPost/i })).toBeOnTheScreen()
	})
})
