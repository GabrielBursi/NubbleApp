import { screen, userEvent } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { PostActions } from './PostActions'

describe('<PostActions/>', () => {
	it('should render the actions correctly', async () => {
		customRender(<PostActions />)

		const actions = screen.getAllByRole('img')

		for (const icon of actions) {
			await userEvent.press(icon)
		}

		expect(actions).toHaveLength(3)
	})
})
