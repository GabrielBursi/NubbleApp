import { PropsWithChildren } from 'react'
import { Linking } from 'react-native'

import { screen, userEvent } from '@testing-library/react-native'

import { Text } from '@/components'
import { AppPermissionStatus } from '@/services/permission'
import { usePermission } from '@/services/permission/usePermission'
import { mockUseNavigation } from '@/tests/mocks'
import { customRender } from '@/tests/utils'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { PermissionManager } from './PermissionManager'
import { PermissionManagerProps } from './PermissionManager.types'

type UsePermission = typeof usePermission
type ReturnUsePermission = ReturnHookMocked<UsePermission>
type MockUsePermission = HookMocked<UsePermission>

jest.mock('@/services/permission/usePermission')

describe('<PermissionManager/>', () => {
	const defaultProps: PropsWithChildren<PermissionManagerProps> = {
		permissionName: 'camera',
		children: <Text>Protected Content</Text>,
	}

	const spyOpenSettings = jest.spyOn(Linking, 'openSettings')

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

	it('should show loading state', () => {
		setupMockedUsePermission('granted', true)
		customRender(<PermissionManager {...defaultProps} />)

		expect(screen.getByTestId('loading-indicator')).toBeOnTheScreen()
	})

	it('should render children when permission is granted', () => {
		customRender(<PermissionManager {...defaultProps} />)

		expect(screen.getByText('Protected Content')).toBeOnTheScreen()
	})

	it('should render fallback when permission is denied and fallback is provided', () => {
		setupMockedUsePermission('denied')
		const fallback = <Text>Fallback Content</Text>

		customRender(<PermissionManager {...defaultProps} fallback={fallback} />)

		expect(screen.getByText('Fallback Content')).toBeOnTheScreen()
	})

	it('should render default denied message when permission is denied', () => {
		setupMockedUsePermission('denied')
		customRender(<PermissionManager {...defaultProps} />)

		expect(
			screen.getByText(
				'O aplicativo não tem permissão para acessar esse recurso.'
			)
		).toBeOnTheScreen()
	})

	it('should render custom denied message when provided', () => {
		setupMockedUsePermission('denied')
		const customMessage = 'Custom denied message'

		customRender(
			<PermissionManager {...defaultProps} description={customMessage} />
		)

		expect(screen.getByText(customMessage)).toBeOnTheScreen()
	})

	it('should render back to feed button', async () => {
		setupMockedUsePermission('denied')

		customRender(<PermissionManager {...defaultProps} />)

		await userEvent.press(
			screen.getByRole('button', { name: /Voltar para o feed/i })
		)

		expect(mockUseNavigation.navigate).toHaveBeenCalledWith('HomeScreen')
	})

	it('should show settings button when status is never_ask_again', async () => {
		setupMockedUsePermission('never_ask_again')
		customRender(<PermissionManager {...defaultProps} />)

		const settingsButton = screen.getByRole('button', {
			name: 'Abrir Configurações',
		})
		expect(settingsButton).toBeOnTheScreen()

		await userEvent.press(settingsButton)
		expect(spyOpenSettings).toHaveBeenCalled()
	})

	it('should call checkPermission on mount', () => {
		customRender(<PermissionManager {...defaultProps} />)

		expect(mockCheckPermission).toHaveBeenCalledTimes(1)
	})

	it('should show Android-specific message when platform is Android and status is never_ask_again', () => {
		jest.mock('react-native/Libraries/Utilities/Platform', () => ({
			OS: 'android',
		}))
		setupMockedUsePermission('never_ask_again')

		customRender(<PermissionManager {...defaultProps} />)

		expect(
			screen.getByText(
				/É necessário abrir e fechar o App novamente após alterar as configurações./i
			)
		).toBeOnTheScreen()
	})

	it('should show specific message when status is unavailable', () => {
		setupMockedUsePermission('unavailable')

		customRender(<PermissionManager {...defaultProps} />)

		expect(
			screen.getByText(
				'Esse recurso não está disponível para esse dispositivo.'
			)
		).toBeOnTheScreen()
	})

	it('should render with controlled props', () => {
		customRender(
			<PermissionManager {...defaultProps} status="never_ask_again" />
		)

		expect(
			screen.getByText(
				/É necessário abrir e fechar o App novamente após alterar as configurações./i
			)
		).toBeOnTheScreen()
		expect(mockCheckPermission).not.toHaveBeenCalled()
	})
})
