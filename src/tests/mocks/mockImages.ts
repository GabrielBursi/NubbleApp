import { AppImages } from '@/assets/images'

import { customFaker } from '../utils/customFaker'

type Images = keyof typeof AppImages
type MockImages = Record<Images, string>

export const mockAppImages: MockImages = {
	ImagePlaceholder: customFaker.image.url(),
	UserProfilePlaceholder: customFaker.image.url(),
	OnboardingDark1: customFaker.image.url(),
	OnboardingDark2: customFaker.image.url(),
	OnboardingDark3: customFaker.image.url(),
	OnboardingLight1: customFaker.image.url(),
	OnboardingLight2: customFaker.image.url(),
	OnboardingLight3: customFaker.image.url(),
}
