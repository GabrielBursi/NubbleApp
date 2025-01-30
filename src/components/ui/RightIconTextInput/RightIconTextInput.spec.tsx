import { screen } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { Icon } from '../Icon/Icon'

import { RightIconTextInput } from './RightIconTextInput'

describe('<RightIconTextInput/>', () => {
	it('should render loading indicator correctly', () => {
		customRender(<RightIconTextInput loading />)

		expect(
			screen.getByTestId('spin-indicator', { exact: true })
		).toBeOnTheScreen()
	})

	it('should render clear icon correctly', () => {
		customRender(<RightIconTextInput allowClear isFocused />)

		expect(
			screen.queryByTestId('spin-indicator', { exact: true })
		).not.toBeOnTheScreen()
		expect(screen.getByRole('img', { name: 'trash' })).toBeOnTheScreen()
	})

	it('should render right icon correctly', () => {
		customRender(<RightIconTextInput rightIcon={<Icon name="arrowLeft" />} />)

		expect(
			screen.queryByTestId('spin-indicator', { exact: true })
		).not.toBeOnTheScreen()
		expect(screen.queryByRole('img', { name: 'trash' })).not.toBeOnTheScreen()
		expect(screen.getByRole('img', { name: 'arrowLeft' })).toBeOnTheScreen()
	})

	it('should render an empty node correctly', () => {
		customRender(<RightIconTextInput />)

		expect(
			screen.queryByTestId('spin-indicator', { exact: true })
		).not.toBeOnTheScreen()
		expect(screen.queryAllByRole('img')).toHaveLength(0)
	})
})
