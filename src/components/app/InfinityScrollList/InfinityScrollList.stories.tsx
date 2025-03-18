import type { Meta, StoryObj } from '@storybook/react'

import { Text } from '@/components'
import { PostModel } from '@/domain/Post'
import { generateMockMetaPaginationApp } from '@/tests/mocks/mockMetaPagination'
import { generatePost } from '@/tests/mocks/mockPosts'

import { InfinityScrollList } from './InfinityScrollList'

type InfinityScrollListStory = typeof InfinityScrollList<PostModel>

const meta: Meta<InfinityScrollListStory> = {
	title: 'Components/InfinityScrollList',
	component: InfinityScrollList,
	args: {
		queryOpt: {
			queryKey: ['sb'],
		},
		getList: async () => {
			await new Promise((res) => setTimeout(res, 1000))
			return {
				data: [
					generatePost(),
					generatePost(),
					generatePost(),
					generatePost(),
					generatePost(),
					generatePost(),
				],
				meta: generateMockMetaPaginationApp(),
			}
		},
		accessibilityLabel: 'storybook-list',
		estimatedItemSize: 100,
		keyExtractor: ({ id }, index) => `${id}-${index}`,
		errorMessage: 'Houve um erro',
		emptyMessage: 'Lista Vazia',
		renderItem: ({ item: { author } }) => <Text mb="s10">{author.name}</Text>,
	},
	argTypes: {
		queryOpt: {
			type: 'symbol',
		},
		getList: {
			type: 'symbol',
		},
		renderItem: {
			type: 'symbol',
		},
		keyExtractor: {
			type: 'symbol',
		},
		estimatedItemSize: {
			type: 'symbol',
		},
	},
}
export default meta

type Story = StoryObj<InfinityScrollListStory>

export const Basic: Story = {
	args: {},
}

export const Empty: Story = {
	args: {
		queryOpt: {
			queryKey: ['empty'],
		},
		getList: async () => {
			await new Promise((res) => setTimeout(res, 500))
			return {
				data: [],
				meta: generateMockMetaPaginationApp(),
			}
		},
	},
}

export const Erro: Story = {
	args: {
		queryOpt: {
			queryKey: ['error'],
		},
		getList: async () => {
			await new Promise((_res, rej) => setTimeout(rej, 200))
			return {
				data: [],
				meta: generateMockMetaPaginationApp(),
			}
		},
	},
}
