import { screen, userEvent } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { RadioButtonItem } from './RadioButtonItem'

describe('<RadioButtonItem/>', () => {
	it('should render radio button item', () => {
		customRender(<RadioButtonItem label="jest" />)

		expect(screen.getByRole('radio', { name: /jest/i })).toBeOnTheScreen()
	})

	it('should render radio button item with description', () => {
		customRender(<RadioButtonItem label="jest" description="rtl" />)

		expect(screen.getByRole('radio', { name: /jest/i })).toBeOnTheScreen()
		expect(screen.getByRole('text', { name: /rtl/i })).toBeOnTheScreen()
	})

	it('should render content of radio button item on right side', () => {
		customRender(
			<RadioButtonItem label="jest" description="rtl" side="right" />
		)

		expect(screen.getByRole('radio', { name: /jest/i })).toBeOnTheScreen()
		expect(screen.getByRole('text', { name: /rtl/i })).toBeOnTheScreen()
	})

	it('should check radio on press label', async () => {
		customRender(<RadioButtonItem label="jest" description="rtl" />)

		await userEvent.press(screen.getByRole('text', { name: /jest/i }))
		expect(
			screen.getByRole('radio', { name: /jest/i })
		).toHaveAccessibilityState({ checked: true })
	})

	it('should check radio on description label', async () => {
		customRender(<RadioButtonItem label="jest" description="rtl" />)

		await userEvent.press(screen.getByRole('text', { name: /rtl/i }))
		expect(
			screen.getByRole('radio', { name: /jest/i })
		).toHaveAccessibilityState({ checked: true })
	})
})
