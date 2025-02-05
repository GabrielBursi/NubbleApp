import { screen } from '@testing-library/react-native'

import { mockUseNavigation } from '@/tests/mocks'
import { customFaker, customRender } from '@/tests/utils'

import { PublishPostScreen } from './PublishPost'

describe('<PublishPostScreen/>', () => {
	const mockImage = customFaker.image.url()

	it('should render the screen correctly', () => {
		customRender(
			<PublishPostScreen // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
				navigation={mockUseNavigation as any}
				route={{
					key: 'PublishPostScreen',
					name: 'PublishPostScreen',
					params: {
						imageUri: mockImage,
					},
				}}
			/>
		)

		expect(screen.getByRole('img', { name: mockImage })).toBeOnTheScreen()
		expect(
			screen.getByLabelText('Escreva uma legenda', { exact: true })
		).toBeOnTheScreen()
		expect(
			screen.getByRole('button', { name: 'Publicar post' })
		).toBeOnTheScreen()
	})
})
