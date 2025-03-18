import { screen, userEvent } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { EmptyList } from './EmptyList'

describe('<EmptyList/>', () => {
	const mockRefetch = jest.fn()

	it('should render with default text message correctly', () => {
		customRender(<EmptyList />)

		expect(
			screen.getByRole('text', { name: /A lista está vazia/i })
		).toBeOnTheScreen()
	})

	it('should render loading correctly', () => {
		customRender(<EmptyList loading />)

		expect(screen.queryByRole('text')).not.toBeOnTheScreen()
		expect(screen.getByLabelText('loading')).toBeOnTheScreen()
	})

	it('should render with error correctly', () => {
		customRender(<EmptyList error={'Houve um erro'} />)

		expect(
			screen.getByRole('text', {
				name: /Ocorreu um erro ao tentar carregar a lista/i,
			})
		).toBeOnTheScreen()
		expect(
			screen.getByRole('button', { name: /recarregar/i })
		).toBeOnTheScreen()
	})

	it('should refetch when has error correctly', async () => {
		customRender(<EmptyList error={'Houve um erro'} refetch={mockRefetch} />)

		await userEvent.press(screen.getByRole('button', { name: /recarregar/i }))
		expect(mockRefetch).toHaveBeenCalled()
	})
})
