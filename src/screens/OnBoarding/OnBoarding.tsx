import { AppImages } from '@/assets/images'
import { OnBoardingCarousel } from '@/components'
import { OnboardingPageItem } from '@/types/shared'

const page1: OnboardingPageItem = {
	title: 'Uma rede social de conexões reais',
	subtitle:
		'Fique por dentro do que acontece com as pessoas que você mais gosta',
	image: {
		light: AppImages.OnboardingLight1,
		dark: AppImages.OnboardingDark1,
	},
}
const page2: OnboardingPageItem = {
	title: 'Compartilhe suas histórias com seus amigos próximos',
	subtitle: 'Tenha sua linha do tempo personalizada',
	image: {
		light: AppImages.OnboardingLight2,
		dark: AppImages.OnboardingDark2,
	},
}

const page3: OnboardingPageItem = {
	title: 'Interaja em tempo real com as pessoas',
	subtitle: 'Curta, comente e favorite os conteúdos que você mais gostar',
	image: {
		light: AppImages.OnboardingLight3,
		dark: AppImages.OnboardingDark3,
	},
}

export const OnBoardingScreen = () => {
	return <OnBoardingCarousel items={[page1, page2, page3]} />
}
