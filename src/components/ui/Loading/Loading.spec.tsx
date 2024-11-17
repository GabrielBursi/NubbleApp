import { screen } from '@testing-library/react-native'

import { Loading } from './Loading'

import { appTheme } from '@/styles'
import { customRender } from '@/tests/utils'

describe('<Loading/>', () => {
	it('should render with the color correctly', () => {
		customRender(<Loading color="primary" testID="loading" />)

		expect(screen.getByTestId('loading', { exact: true })).toHaveProp(
			'color',
			appTheme.colors.primary
		)
	})
})
