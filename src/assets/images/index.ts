/* eslint-disable @typescript-eslint/no-var-requires */
export const AppImages = {
	ImagePlaceholder: require('./image_placeholder.png') as number,
	OnboardingLight1:
		require('./images/onboarding/onboarding-light-1.png') as number,
	OnboardingLight2:
		require('./images/onboarding/onboarding-light-2.png') as number,
	OnboardingLight3:
		require('./images/onboarding/onboarding-light-3.png') as number,
	OnboardingDark1:
		require('./images/onboarding/onboarding-dark-1.png') as number,
	OnboardingDark2:
		require('./images/onboarding/onboarding-dark-2.png') as number,
	OnboardingDark3:
		require('./images/onboarding/onboarding-dark-3.png') as number,
} as const
