import { screen, userEvent } from '@testing-library/react-native'

import { mockUseNavigation } from '@/tests/mocks'
import { customRender } from '@/tests/utils'

import { CameraScreen } from './Camera'

describe('<CameraScreen/>', () => {
	it('should render camera screen correctly', () => {
		customRender(
			<CameraScreen
				// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
				navigation={mockUseNavigation.navigate as any}
				route={{
					key: 'CameraScreen',
					name: 'CameraScreen',
					path: 'CameraScreen',
				}}
			/>
		)

		expect(screen.getByRole('img', { name: /arrowLeft/i })).toBeOnTheScreen()
		expect(screen.getByRole('img', { name: /flashOff/i })).toBeOnTheScreen()
		expect(screen.getByRole('img', { name: /cameraClick/i })).toBeOnTheScreen()
	})

	it('should go back correctly', async () => {
		customRender(
			<CameraScreen
				// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
				navigation={mockUseNavigation as any}
				route={{
					key: 'CameraScreen',
					name: 'CameraScreen',
					path: 'CameraScreen',
				}}
			/>
		)

		await userEvent.press(screen.getByRole('img', { name: /arrowLeft/i }))
		expect(mockUseNavigation.goBack).toHaveBeenCalled()
	})

	it('should toggle flash icon correctly', async () => {
		customRender(
			<CameraScreen
				// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
				navigation={mockUseNavigation.navigate as any}
				route={{
					key: 'CameraScreen',
					name: 'CameraScreen',
					path: 'CameraScreen',
				}}
			/>
		)

		await userEvent.press(screen.getByRole('img', { name: /flashOff/i }))
		expect(screen.getByRole('img', { name: /flashOn/i })).toBeOnTheScreen()
		expect(
			screen.queryByRole('img', { name: /flashOff/i })
		).not.toBeOnTheScreen()
	})
})
