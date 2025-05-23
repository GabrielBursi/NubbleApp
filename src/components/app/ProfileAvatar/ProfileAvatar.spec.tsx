import { screen, userEvent } from '@testing-library/react-native'

import { useAppNavigation } from '@/hooks/useAppNavigation/useAppNavigation'
import { mockAppImages } from '@/tests/mocks'
import { customFaker, customRender } from '@/tests/utils'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { ProfileAvatar } from './ProfileAvatar'

type UseAppNavigation = typeof useAppNavigation
type ReturnUseAppNavigation = ReturnHookMocked<UseAppNavigation>
type MockedUseAppNavigation = HookMocked<UseAppNavigation>

jest.mock('@/hooks/useAppNavigation/useAppNavigation')

describe('<ProfileAvatar/>', () => {
	const mockImageUrl = customFaker.image.url()
	const mockNavigateToProfile = jest.fn()

	const mockReturnUseAppNavigation: ReturnUseAppNavigation = {
		navigate: {
			toProfile: mockNavigateToProfile,
		},
	}

	beforeEach(() => {
		;(useAppNavigation as MockedUseAppNavigation).mockReturnValue(
			mockReturnUseAppNavigation
		)
	})

	it('should render the image correctly', () => {
		customRender(<ProfileAvatar imageURL={mockImageUrl} />)

		expect(screen.getByRole('img', { name: mockImageUrl })).toBeOnTheScreen()
	})

	it('should render the user placeholder', () => {
		customRender(<ProfileAvatar />)

		expect(
			screen.getByRole('img', { name: 'user-placeholder' })
		).toBeOnTheScreen()
		expect(screen.getByRole('img', { name: 'user-placeholder' })).toHaveProp(
			'source',
			mockAppImages.UserProfilePlaceholder
		)
	})

	it('should navigate to profile correctly', async () => {
		customRender(<ProfileAvatar imageURL={mockImageUrl} authorId={1} />)

		await userEvent.press(screen.getByRole('img', { name: mockImageUrl }))
		expect(mockNavigateToProfile).toHaveBeenCalledWith(1)
	})
})
