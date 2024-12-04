import { screen, userEvent } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { FeedEmpty } from './FeedEmpty'

describe('<FeedEmpty/>', () => {
	const mockRefetch = jest.fn()

	it('should render with default text message correctly', () => {
		customRender(<FeedEmpty />)

		expect(
			screen.getByRole('text', { name: /Não há publicações no seu feed/i })
		).toBeOnTheScreen()
	})

	it('should render loading correctly', () => {
		customRender(<FeedEmpty loading />)

		expect(screen.queryByRole('text')).not.toBeOnTheScreen()
		expect(screen.getByLabelText('loading')).toBeOnTheScreen()
	})

	it('should render with error correctly', () => {
		customRender(<FeedEmpty error={'Houve um erro'} />)

		expect(
			screen.getByRole('text', { name: /Não foi possível carregar o feed 😢/i })
		).toBeOnTheScreen()
		expect(
			screen.getByRole('button', { name: /recarregar/i })
		).toBeOnTheScreen()
	})

	it('should refetch when has error correctly', async () => {
		customRender(<FeedEmpty error={'Houve um erro'} refetch={mockRefetch} />)

		await userEvent.press(screen.getByRole('button', { name: /recarregar/i }))
		expect(mockRefetch).toHaveBeenCalled()
	})
})
