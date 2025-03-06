import { AppImages } from '@/assets/images'
import { OnBoardingCarousel } from '@/components'
import {
	OnboardingPageItem,
	OnboardingPageItemWithoutMeta,
} from '@/types/shared'

const page1: OnboardingPageItemWithoutMeta = {
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
const page2: OnboardingPageItemWithoutMeta = {
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

const page3: OnboardingPageItemWithoutMeta = {
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

const onboardingPages: OnboardingPageItem[] = [page1, page2, page3].map(
	(page, index, array) => ({
		...page,
		index,
		total: array.length,
		isLast: index + 1 === array.length,
	})
)

export const OnBoardingScreen = () => {
	return <OnBoardingCarousel items={onboardingPages} />
}
