import { screen } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { Toast } from './Toast'

describe('<Toast/>', () => {
	it('should render the toast correctly', () => {
		customRender(<Toast />)

		expect(
			screen.getByRole('text', { name: /Toast component/i })
		).toBeOnTheScreen()
		expect(screen.getByRole('img')).toBeOnTheScreen()
	})
})
