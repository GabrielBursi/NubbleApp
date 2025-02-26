import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'

import { Radio } from '@/components/ui'
import { customFaker } from '@/tests/utils/customFaker'

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

const meta: Meta<typeof Radio | typeof Radio.Button | typeof Radio.Group> = {
	title: 'Components/Radio',
	component: Radio,
	args: {},
	argTypes: {
		onChange: {
			type: 'symbol',
		},
		onSelect: {
			type: 'symbol',
		},
		side: {
			type: 'string',
			control: 'radio',
			options: ['left', 'right'],
		},
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

type StoryRadio = StoryObj<typeof Radio>
type StoryRadioButton = StoryObj<typeof Radio.Button>
type StoryRadioGroup = StoryObj<typeof Radio.Group>

export const Basic: StoryRadio = {
	args: {
		checked: true,
		onChange: action('onChange'),
		disabled: false,
	},
	render: (args) => <Radio {...args} />,
}

export const Button: StoryRadioButton = {
	args: {
		side: 'left',
		label: 'Storybook',
		description: customFaker.lorem.paragraph({ min: 10, max: 15 }),
	},
	render: (args) => <Radio.Button {...args} />,
}

export const Group: StoryRadioGroup = {
	args: {
		items: mockList,
		descriptionKey: 'job',
		labelKey: 'name',
		onSelect: action('onSelect'),
		initialItemIndexSelected: 1,
	},
	render: (args) => <Radio.Group {...args} />,
}
