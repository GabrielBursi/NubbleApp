import { screen, userEvent } from '@testing-library/react-native'

import { customFaker, customRender } from '@/tests/utils'

import { Radio } from './Radio'
import { RadioItem } from './Radio.types'

type MockItem = {
	name: string
	id: string
	age: number
	job: string
}

describe('Radio Compound', () => {
	describe('<Radio />', () => {
		const mockOnChange = jest.fn()

		it('should render the radio button', () => {
			customRender(<Radio />)

			expect(screen.getByRole('radio')).toHaveAccessibilityState({
				disabled: false,
				checked: false,
			})
		})

		it('should render the controlled radio button', () => {
			customRender(<Radio checked />)

			expect(screen.getByRole('radio')).toHaveAccessibilityState({
				disabled: false,
				checked: true,
			})
		})

		it('should press radio button', async () => {
			customRender(<Radio checked onChange={mockOnChange} />)

			await userEvent.press(screen.getByRole('radio'))

			expect(mockOnChange).toHaveBeenCalledWith(false)
		})

		it('should render the radio button disabled', async () => {
			customRender(<Radio checked onChange={mockOnChange} disabled />)

			expect(screen.getByRole('radio')).toHaveAccessibilityState({
				disabled: true,
				checked: true,
			})

			await userEvent.press(screen.getByRole('radio'))

			expect(mockOnChange).not.toHaveBeenCalled()
		})
	})

	describe('<Radio.Button />', () => {
		it('should render radio button item', () => {
			customRender(<Radio.Button label="jest" />)

			expect(screen.getByRole('radio', { name: /jest/i })).toBeOnTheScreen()
		})

		it('should render radio button item with description', () => {
			customRender(<Radio.Button label="jest" description="rtl" />)

			expect(screen.getByRole('radio', { name: /jest/i })).toBeOnTheScreen()
			expect(screen.getByRole('text', { name: /rtl/i })).toBeOnTheScreen()
		})

		it('should render content of radio button item on right side', () => {
			customRender(<Radio.Button label="jest" description="rtl" side="right" />)

			expect(screen.getByRole('radio', { name: /jest/i })).toBeOnTheScreen()
			expect(screen.getByRole('text', { name: /rtl/i })).toBeOnTheScreen()
		})

		it('should check radio on press label', async () => {
			customRender(<Radio.Button label="jest" description="rtl" />)

			await userEvent.press(screen.getByRole('text', { name: /jest/i }))
			expect(
				screen.getByRole('radio', { name: /jest/i })
			).toHaveAccessibilityState({ checked: true })
		})

		it('should check radio on description label', async () => {
			customRender(<Radio.Button label="jest" description="rtl" />)

			await userEvent.press(screen.getByRole('text', { name: /rtl/i }))
			expect(
				screen.getByRole('radio', { name: /jest/i })
			).toHaveAccessibilityState({ checked: true })
		})
	})

	describe('<Radio.Group />', () => {
		const mockList: RadioItem<MockItem>[] = [
			{
				age: customFaker.number.int({ min: 1 }),
				id: customFaker.database.mongodbObjectId(),
				job: customFaker.person.jobTitle(),
				name: customFaker.person.fullName(),
			},
			{
				age: customFaker.number.int({ min: 1 }),
				id: customFaker.database.mongodbObjectId(),
				job: customFaker.person.jobTitle(),
				name: customFaker.person.fullName(),
			},
			{
				age: customFaker.number.int({ min: 1 }),
				id: customFaker.database.mongodbObjectId(),
				job: customFaker.person.jobTitle(),
				name: customFaker.person.fullName(),
			},
		]

		const mockOnSelect = jest.fn()

		it('should render the radio group', () => {
			customRender(
				<Radio.Group items={mockList} descriptionKey="job" labelKey="name" />
			)

			expect(screen.getByRole('radiogroup')).toBeOnTheScreen()
			expect(screen.getByRole('radio')).toBeOnTheScreen()
		})

		it('should render the radio item with correct text', () => {
			customRender(
				<Radio.Group
					items={[mockList[0]!]}
					descriptionKey="job"
					labelKey="name"
				/>
			)

			expect(
				screen.getByRole('text', { name: mockList[0]?.job })
			).toBeOnTheScreen()
			expect(
				screen.getByRole('text', { name: mockList[0]?.name })
			).toBeOnTheScreen()
		})

		it('should select a radio item', async () => {
			customRender(
				<Radio.Group
					items={[mockList[0]!]}
					descriptionKey="job"
					labelKey="name"
					onSelect={mockOnSelect}
				/>
			)

			await userEvent.press(
				screen.getByRole('text', { name: mockList[0]?.job })
			)

			expect(mockOnSelect).toHaveBeenCalledWith(mockList[0], true)
			expect(screen.getByRole('radio')).toHaveAccessibilityState({
				checked: true,
			})
		})

		it('should render with a selected radio', () => {
			customRender(
				<Radio.Group
					items={[mockList[0]!]}
					descriptionKey="job"
					labelKey="name"
					onSelect={mockOnSelect}
					initialItemIndexSelected={0}
				/>
			)

			expect(screen.getByRole('radio')).toHaveAccessibilityState({
				checked: true,
			})
		})

		it('should render the radio not selected when the index not exists', () => {
			customRender(
				<Radio.Group
					items={[mockList[0]!]}
					descriptionKey="job"
					labelKey="name"
					onSelect={mockOnSelect}
					initialItemIndexSelected={999}
				/>
			)

			expect(screen.getByRole('radio')).toHaveAccessibilityState({
				checked: false,
			})
		})
	})
})
