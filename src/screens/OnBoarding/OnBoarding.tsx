import { AppImages } from '@/assets/images'
import { OnBoardingCarousel } from '@/components'
import { OnboardingPageItem } from '@/types/shared'

const page1: OnboardingPageItem = {
	title: [
		{ text: 'Uma rede social de', highlight: false },
		{ text: '\nconexões reais', highlight: true },
	],
	subtitle:
		'Fique por dentro do que acontece com as pessoas que você mais gosta',
	image: {
		light: AppImages.OnboardingLight1,
		dark: AppImages.OnboardingDark1,
	},
}
const page2: OnboardingPageItem = {
	title: [
		{ text: 'Compartilhe suas', highlight: false },
		{ text: '\nhistórias', highlight: true },
		{ text: ' com seus amigos próximos', highlight: false },
	],
	subtitle: 'Tenha sua linha do tempo personalizada',
	image: {
		light: AppImages.OnboardingLight2,
		dark: AppImages.OnboardingDark2,
	},
}

const page3: OnboardingPageItem = {
	title: [
		{ text: 'Interaja', highlight: true },
		{ text: ' em tempo real com as pessoas', highlight: false },
	],
	subtitle: 'Curta, comente e favorite os conteúdos que você mais gostar',
	image: {
		light: AppImages.OnboardingLight3,
		dark: AppImages.OnboardingDark3,
	},
}

export const OnBoardingScreen = () => {
	return <OnBoardingCarousel items={[page1, page2, page3]} />
}
