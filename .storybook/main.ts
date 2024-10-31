import { StorybookConfig } from '@storybook/react-native'

const main: StorybookConfig = {
	stories: [
		'../src/components/**/*.stories.(ts|tsx)',
		'../src/screens/**/*.stories.(ts|tsx)',
	],
	addons: [
		'@storybook/addon-ondevice-controls',
		'@storybook/addon-ondevice-actions',
		'@storybook/addon-ondevice-notes',
		'@storybook/addon-ondevice-controls',
		'@storybook/addon-ondevice-backgrounds',
		'@storybook/addon-ondevice-actions',
	],
}

export default main
