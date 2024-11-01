import { screen } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'
import { appTheme } from '@/styles'

import { Box } from './Box'

describe('<Box/>', () => {
	it('should render the box correctly', () => {
		customRender(<Box testID="box" paddingBottom="s10" />)

		expect(screen.getByTestId('box', { exact: true })).toHaveStyle({
			paddingBottom: appTheme.spacing.s10,
		})
	})
})
