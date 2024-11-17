import { NavigationProp, useNavigation } from '@react-navigation/native'

import { HookMocked } from '@/types/tests'

export const mockUseNavigation: HookMocked<
	typeof useNavigation<NavigationProp<ReactNavigation.RootParamList>>
> = {
	goBack: jest.fn(),
	navigate: jest.fn(),
	reset: jest.fn(),
}
