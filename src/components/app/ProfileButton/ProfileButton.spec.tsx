import { screen } from '@testing-library/react-native'

import { customRender } from '@/tests/utils'

import { ProfileButton } from './ProfileButton'

describe('<ProfileButton/>', () => {
	it('should render follow button', () => {
		customRender(<ProfileButton />)

		expect(screen.getByRole('button', { name: /Seguir/i })).toBeOnTheScreen()
	})

	it('should render following button', () => {
		customRender(<ProfileButton isFollowing />)

		expect(screen.getByRole('button', { name: /Mensagem/i })).toBeOnTheScreen()
	})

	it('should render my profile button', () => {
		customRender(<ProfileButton isMyProfile />)

		expect(
			screen.getByRole('button', { name: /Editar perfil/i })
		).toBeOnTheScreen()
	})
})
