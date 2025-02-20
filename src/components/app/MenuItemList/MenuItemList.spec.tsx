import { screen } from '@testing-library/react-native'

import { customFaker, customRender } from '@/tests/utils'

import { MenuItemList } from './MenuItemList'
import { MenuItemListProps } from './MenuItemList.types'

describe('<MenuItemList/>', () => {
	const mockItems: Required<MenuItemListProps>['items'] = [
		{ label: customFaker.lorem.word(), onPress: jest.fn() },
		{ label: customFaker.lorem.words(3), onPress: jest.fn() },
		{ label: customFaker.lorem.word(), onPress: jest.fn() },
		{ label: customFaker.lorem.words(2), onPress: jest.fn() },
		{ label: customFaker.lorem.word(), onPress: jest.fn() },
	]

	it('should render the menu list', () => {
		customRender(<MenuItemList />)

		expect(screen.getByRole('menu', { name: /menu/i })).toBeOnTheScreen()
	})

	it('should render the items on list', () => {
		customRender(<MenuItemList items={[mockItems[0]!]} />)

		expect(
			screen.getByRole('menuitem', { name: mockItems[0]?.label })
		).toBeOnTheScreen()
	})
})
