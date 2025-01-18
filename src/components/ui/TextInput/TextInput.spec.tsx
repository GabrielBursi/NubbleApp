import { screen, userEvent, fireEvent } from '@testing-library/react-native'

import { appTheme } from '@/styles'
import { customRender } from '@/tests/utils'

import { Icon } from '../Icon/Icon'

import { TextInput } from './TextInput'

describe('<TextInput/>', () => {
	it('should render the input correctly', () => {
		customRender(<TextInput label="jest" />)

		expect(screen.getByLabelText('jest', { exact: true })).toBeOnTheScreen()
		expect(screen.getByText('jest', { exact: true })).toBeOnTheScreen()
	})

	it('should render the input with icon correctly', () => {
		customRender(
			<TextInput label="jest" RightComponent={<Icon name="bell" />} />
		)

		expect(screen.getByRole('img')).toBeOnTheScreen()
		expect(screen.getByTestId('bell')).toBeOnTheScreen()
	})

	it('should render the input loading correctly', () => {
		customRender(
			<TextInput label="jest" RightComponent={<Icon name="bell" />} loading />
		)

		expect(screen.queryByRole('img')).not.toBeOnTheScreen()
		expect(screen.queryByTestId('bell')).not.toBeOnTheScreen()
		expect(screen.getByTestId('spin-indicator')).toBeOnTheScreen()
	})

	it('should render the focused input correctly', () => {
		customRender(<TextInput label="jest" />)

		fireEvent.press(screen.getByPlaceholderText('Digite aqui'))
		expect(screen.getByTestId('container-internal-input')).toHaveStyle({
			borderColor: appTheme.colors['primary'],
		})
		expect(
			screen.getByLabelText('jest', { exact: true })
		).toHaveAccessibilityState({
			selected: true,
		})
	})

	it('should handle focus and blur on input correctly', async () => {
		customRender(<TextInput label="jest" />)

		await userEvent.type(screen.getByPlaceholderText('Digite aqui'), 'sb')
		expect(screen.getByTestId('container-internal-input')).toHaveStyle({
			borderColor: appTheme.colors['gray4'],
		})
		expect(
			screen.getByLabelText('jest', { exact: true })
		).toHaveAccessibilityState({
			selected: false,
		})
	})

	it('should focus input on click label correctly', async () => {
		customRender(<TextInput label="jest" />)

		await userEvent.press(screen.getByText('jest', { exact: true }))

		expect(screen.getByTestId('container-internal-input')).toHaveStyle({
			borderColor: appTheme.colors['primary'],
		})
		expect(
			screen.getByLabelText('jest', { exact: true })
		).toHaveAccessibilityState({
			selected: true,
		})
	})

	it('should render the disabled input correctly', () => {
		customRender(<TextInput label="jest" disabled />)

		expect(screen.getByTestId('container-internal-input')).toHaveStyle({
			backgroundColor: appTheme.colors['gray5'],
		})
		expect(
			screen.getByLabelText('jest', { exact: true })
		).toHaveAccessibilityState({
			disabled: true,
		})
	})

	it('should render the input with error correctly', () => {
		customRender(<TextInput label="jest" errorMessage="jest error" />)

		expect(screen.getByTestId('container-internal-input')).toHaveStyle({
			borderWidth: 2,
			borderColor: appTheme.colors['error'],
		})
		expect(screen.getByText('jest error', { exact: true })).toBeOnTheScreen()
	})
})
