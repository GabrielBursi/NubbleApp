import { screen } from '@testing-library/react-native'

import { lightTheme } from '@/styles'
import { customRender } from '@/tests/utils'

import { Loading } from './Loading'

describe('<Loading/>', () => {
	it('should render with the color correctly', () => {
		customRender(<Loading color="primary" testID="loading" />)

		expect(screen.getByTestId('loading', { exact: true })).toHaveProp(
			'color',
			lightTheme.colors.primary
		)
	})
})
