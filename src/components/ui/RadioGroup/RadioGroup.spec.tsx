import { screen, userEvent } from '@testing-library/react-native'

import { customFaker, customRender } from '@/tests/utils'

import { RadioGroup } from './RadioGroup'
import { RadioItem } from './RadioGroup.types'

type Mock = {
	name: string
	id: string
	age: number
	job: string
}

describe('<RadioGroup/>', () => {
	const mockList: RadioItem<Mock>[] = [
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
			<RadioGroup items={mockList} descriptionKey="job" labelKey="name" />
		)

		expect(screen.getByRole('radiogroup')).toBeOnTheScreen()
		expect(screen.getByRole('radio')).toBeOnTheScreen()
	})

	it('should render the radio item with correct text', () => {
		customRender(
			<RadioGroup items={[mockList[0]!]} descriptionKey="job" labelKey="name" />
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
			<RadioGroup
				items={[mockList[0]!]}
				descriptionKey="job"
				labelKey="name"
				onSelect={mockOnSelect}
			/>
		)

		await userEvent.press(screen.getByRole('text', { name: mockList[0]?.job }))

		expect(mockOnSelect).toHaveBeenCalledWith(mockList[0], true)
		expect(screen.getByRole('radio')).toHaveAccessibilityState({
			checked: true,
		})
	})

	it('should render with a selected radio', () => {
		customRender(
			<RadioGroup
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
			<RadioGroup
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
