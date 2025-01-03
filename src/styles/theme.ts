import { Dimensions } from 'react-native'

import { createTheme } from '@shopify/restyle'
import { lighten } from 'polished'
import normalize from 'react-native-normalize'
import { RFValue } from 'react-native-responsive-fontsize'

const windowHeight = Dimensions.get('window').height

export const themeConfig = {
	border: {
		radius: {
			s8: normalize(8, 'width') as 8,
			s12: normalize(12, 'width') as 12,
			s16: normalize(16, 'width') as 16,
		},
	},
	font: {
		family: {
			black: 'Satoshi-Black',
			blackItalic: 'Satoshi-BlackItalic',
			bold: 'Satoshi-Bold',
			boldItalic: 'Satoshi-BoldItalic',
			italic: 'Satoshi-Italic',
			light: 'Satoshi-Light',
			lightItalic: 'Satoshi-LightItalic',
			medium: 'Satoshi-Medium',
			mediumItalic: 'Satoshi-MediumItalic',
			regular: 'Satoshi-Regular',
		},
		light: 300,
		normal: 400,
		bold: 600,
		sizes: {
			xsmall: RFValue(10, windowHeight) as 10,
			small: RFValue(12, windowHeight) as 12,
			medium: RFValue(14, windowHeight) as 14,
			large: RFValue(16, windowHeight) as 16,
			xlarge: RFValue(18, windowHeight) as 18,
			xxlarge: RFValue(22, windowHeight) as 22,
			huge: RFValue(32, windowHeight) as 32,
		},
	},
	colors: {
		greenPrimary: '#074C4E',
		greenPrimaryLight: '#EAF6F6',
		carrotSecondary: '#F86F2D',
		carrotSecondaryLight: '#FAE6DD',
		greenSuccess: '#4ABC86',
		greenSuccessLight: '#D8FFEC',
		redError: '#EA3838',
		redErrorLight: '#FBECEC',
		grayBlack: '#000000',
		gray1: '#636363',
		gray2: '#8E8E8E',
		gray3: '#B3B3B3',
		gray4: '#E1E1E1',
		gray5: '#F5F5F5',
		grayWhite: '#FFFFFF',
		primaryShadow: lighten(0.4, `#000`),
		secondaryShadow: lighten(0.4, `#bbb`),
		shadow: lighten(0.4, `#828282`),
		lightShadow: lighten(0.4, `#F2F2F2`),
	},
	spacings: {
		s4: normalize(4, 'width') as 4,
		s8: normalize(8, 'width') as 8,
		s10: normalize(10, 'width') as 10,
		s12: normalize(12, 'width') as 12,
		s14: normalize(14, 'width') as 14,
		s16: normalize(16, 'width') as 16,
		s20: normalize(20, 'width') as 20,
		s24: normalize(24, 'width') as 24,
		s32: normalize(32, 'width') as 32,
		s40: normalize(40, 'width') as 40,
		s48: normalize(48, 'width') as 48,
		s56: normalize(56, 'width') as 56,
	},
	opacity: {
		low: 0.5,
		medium: 0.7,
		high: 0.9,
	},
	layers: {
		base: 10,
		menu: 20,
		overlay: 30,
		modal: 40,
		alwaysOnTop: 50,
	},
} as const

export const appTheme = createTheme({
	colors: {
		...themeConfig.colors,
		primary: themeConfig.colors.greenPrimary,
		primaryContrast: themeConfig.colors.grayWhite,
		buttonPrimary: themeConfig.colors.greenPrimary,
		background: themeConfig.colors.grayWhite,
		backgroundContrast: themeConfig.colors.grayBlack,
		error: themeConfig.colors.redError,
		errorLight: themeConfig.colors.redErrorLight,
		success: themeConfig.colors.greenSuccess,
		successLight: themeConfig.colors.greenSuccessLight,
		iconMarked: themeConfig.colors.carrotSecondary,
	},
	spacing: themeConfig.spacings,
	borderRadii: themeConfig.border.radius,
	zIndices: themeConfig.layers,
	textVariants: {
		defaults: {},
	},
})
