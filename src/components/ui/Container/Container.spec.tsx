import { Text } from 'react-native'

import { screen } from '@testing-library/react-native'

import { Container } from './Container'

import { customRender } from '@/tests/utils'

describe('<Container/>', () => {
	it('should render with style correctly', () => {
		customRender(
			<Container>
				<Text>Container</Text>
			</Container>
		)

		expect(screen.getByRole('text', { name: /container/i })).toBeOnTheScreen()
		expect(screen.getByTestId('container')).toHaveStyle({
			paddingHorizontal: 48,
		})
	})
})
