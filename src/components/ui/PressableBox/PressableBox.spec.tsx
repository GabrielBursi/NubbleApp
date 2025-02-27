import { screen } from '@testing-library/react-native'

import { lightTheme } from '@/styles'
import { customRender } from '@/tests/utils'

import { PressableBox } from './PressableBox'

describe('<PressableBox/>', () => {
	it('should render', () => {
		customRender(<PressableBox testID="box" paddingBottom="s10" />)

		expect(screen.getByTestId('box', { exact: true })).toHaveStyle({
			paddingBottom: lightTheme.spacing.s10,
		})
	})
})
