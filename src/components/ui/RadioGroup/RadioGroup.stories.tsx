import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'

import { customFaker } from '@/tests/utils/customFaker'

import { RadioGroup } from './RadioGroup'

type List = {
	name: string
	id: string
	age: number
	job: string
}

const mockList: List[] = [
	{
		age: customFaker.number.int({ min: 10, max: 25 }),
		id: customFaker.database.mongodbObjectId(),
		job: customFaker.person.jobTitle(),
		name: customFaker.person.fullName(),
	},
	{
		age: customFaker.number.int({ min: 10, max: 25 }),
		id: customFaker.database.mongodbObjectId(),
		job: customFaker.person.jobTitle(),
		name: customFaker.person.fullName(),
	},
	{
		age: customFaker.number.int({ min: 10, max: 25 }),
		id: customFaker.database.mongodbObjectId(),
		job: customFaker.person.jobTitle(),
		name: customFaker.person.fullName(),
	},
	{
		age: customFaker.number.int({ min: 10, max: 25 }),
		id: customFaker.database.mongodbObjectId(),
		job: customFaker.person.jobTitle(),
		name: customFaker.person.fullName(),
	},
]

type RadioGroupList = typeof RadioGroup<List>

const meta: Meta<RadioGroupList> = {
	title: 'UI/RadioGroup',
	component: RadioGroup,
	args: {
		items: mockList,
		descriptionKey: 'job',
		labelKey: 'name',
		onSelect: action('onSelect'),
		initialItemIndexSelected: 1,
	},
	argTypes: {
		items: {
			type: 'symbol',
		},
		initialItemIndexSelected: {
			type: 'number',
			control: {
				min: 0,
				max: mockList.length - 1,
			},
		},
		descriptionKey: {
			type: 'string',
			control: 'radio',
			options: Object.keys(mockList[0]!),
		},
		labelKey: {
			type: 'string',
			control: 'radio',
			options: Object.keys(mockList[0]!),
		},
	},
}
export default meta

type Story = StoryObj<RadioGroupList>

export const Basic: Story = {
	args: {},
}
