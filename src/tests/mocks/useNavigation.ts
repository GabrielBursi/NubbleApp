import { NavigationProp, useNavigation } from '@react-navigation/native'

import { ReturnHookMocked } from '@/types/tests'

export const mockUseNavigation: ReturnHookMocked<
	typeof useNavigation<NavigationProp<ReactNavigation.RootParamList>>
> = {
	goBack: jest.fn(),
	navigate: jest.fn(),
	reset: jest.fn(),
}
