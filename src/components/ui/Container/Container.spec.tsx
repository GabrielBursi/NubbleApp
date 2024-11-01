import { screen } from '@testing-library/react-native'
import { Text } from 'react-native'
import { customRender } from '@/tests/utils'
import { Container } from './Container'

describe('<Container/>', () => {
	it('should render', () => {
		customRender(
			<Container>
				<Text>Container</Text>
			</Container>
		)

		expect(screen.getByRole('text', { name: /container/i })).toBeOnTheScreen()
		expect(screen.getByTestId('container')).toHaveStyle({
			paddingLeft: 32,
			paddingRight: 32,
		})
	})
})
