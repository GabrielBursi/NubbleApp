import { screen } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'
import { appTheme } from '@/styles'

import { Loading } from './Loading'

describe('<Loading/>', () => {
	it('should render with the color correctly', () => {
		customRender(<Loading color="primary" testID="loading" />)

		expect(screen.getByTestId('loading', { exact: true })).toHaveProp(
			'color',
			appTheme.colors.primary
		)
	})
})
