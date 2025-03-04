import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { OnBoardingScreen } from '@/screens'
import { OnboardingStackParamList } from '@/types/routes'

const Stack = createNativeStackNavigator<OnboardingStackParamList>()

type OnboardingStackRouterProps = {
	initialRouteName?: keyof OnboardingStackParamList
}

export function OnboardingStackRouter({
	initialRouteName = 'OnboardingScreen',
}: Readonly<OnboardingStackRouterProps>) {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				fullScreenGestureEnabled: true,
			}}
			initialRouteName={initialRouteName}
		>
			<Stack.Screen name="OnboardingScreen" component={OnBoardingScreen} />
		</Stack.Navigator>
	)
}
