import type { Meta, StoryObj } from '@storybook/react'

import { Text } from '@/components/ui'

import { PermissionManager } from './PermissionManager'

const meta: Meta<typeof PermissionManager> = {
	title: 'Components/PermissionManager',
	component: PermissionManager,
	args: {
		description: 'O aplicativo não tem permissão para acessar esse recurso.',
		permissionName: 'photoLibrary',
	},
	argTypes: {
		permissionName: {
			options: ['photoLibrary', 'camera'],
			control: 'inline-radio',
			mapping: {
				photoLibrary: 'Gallery',
				camera: 'Camera',
			},
		},
		children: {
			type: 'symbol',
		},
		fallback: {
			type: 'symbol',
		},
	},
	render: (args) => (
		<PermissionManager {...args}>
			<Text>Permission granted to Storybook!</Text>
		</PermissionManager>
	),
}
export default meta

type Story = StoryObj<typeof PermissionManager>

export const Basic: Story = {
	args: {},
}

export const Fallback: Story = {
	args: {
		fallback: (
			<Text>Permission denied to Storybook, but... granted to Fallback!</Text>
		),
	},
}
