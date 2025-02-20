import { screen, userEvent } from '@testing-library/react-native'

import { AppPermissionStatus } from '@/services/permission'
import { usePermission } from '@/services/permission/usePermission'
import { mockUseNavigation } from '@/tests/mocks'
import { customRender } from '@/tests/utils'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { CameraScreen } from './Camera'

type UsePermission = typeof usePermission
type ReturnUsePermission = ReturnHookMocked<UsePermission>
type MockUsePermission = HookMocked<UsePermission>

jest.mock('@/services/permission/usePermission')

describe('<CameraScreen/>', () => {
	const mockCheckPermission = jest.fn()

	const mockReturnUsePermission: ReturnUsePermission = [
		{ status: 'granted', isLoading: false },
		mockCheckPermission,
	]

	const setupMockedUsePermission = (
		status: AppPermissionStatus = 'granted',
		isLoading = false
	) => {
		const mockReturnUsePermission: ReturnUsePermission = [
			{ status, isLoading },
			mockCheckPermission,
		]
		;(usePermission as unknown as MockUsePermission).mockReturnValue(
			mockReturnUsePermission
		)
	}

	beforeEach(() => {
		setupMockedUsePermission()
		mockCheckPermission.mockResolvedValue(true)
		;(usePermission as unknown as MockUsePermission).mockReturnValue(
			mockReturnUsePermission
		)
	})

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
