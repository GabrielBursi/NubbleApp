/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Dimensions } from 'react-native'
import { lighten } from 'polished'
import normalize from 'react-native-normalize'
import { RFValue } from 'react-native-responsive-fontsize'

const windowHeight = Dimensions.get('window').height

export const theme = {
	border: {
		radius: {
			big: 10,
			small: 4,
		},
	},
	font: {
		family: {
			interMedium: 'Inter-Medium',
			interBold: 'Inter-Bold',
			interLight: 'Inter-Light',
			poppinsMedium: 'Poppins-Medium',
			poppinsBold: 'Poppins-Bold',
			poppinsLight: 'Poppins-Light',
			poppinsExtraBold: 'Poppins-ExtraBold',
			poppinsItalic: 'Poppins-Italic',
			poppinsRegular: 'Poppins-Regular',
			poppinsSemiBold: 'Poppins-SemiBold',
			rubikMedium: 'Rubik-Medium',
			rubikBold: 'Rubik-Bold',
			rubikLight: 'Rubik-Light',
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
			xxlarge: RFValue(20, windowHeight) as 20,
			huge: RFValue(48, windowHeight) as 48,
		},
	},
	colors: {
		primary: '#000',
		secondary: '#000',
		mainBg: '#000',
		secondaryBg: '#000',
		primaryText: '#000',
		secondaryText: '#000',
		black: '#000',
		white: '#fff',
		primaryShadow: lighten(0.4, `#000`),
		secondaryShadow: lighten(0.4, `#bbb`),
		shadow: lighten(0.4, `#828282`),
		lightShadow: lighten(0.4, `#F2F2F2`),
	},
	spacings: {
		xxsmall: normalize(4) as 4,
		xsmall: normalize(8) as 8,
		small: normalize(16) as 16,
		medium: normalize(24) as 24,
		large: normalize(32) as 32,
		xlarge: normalize(40) as 40,
		xxlarge: normalize(48) as 48,
	},
	layers: {
		base: 10,
		menu: 20,
		overlay: 30,
		modal: 40,
		alwaysOnTop: 50,
	},
	elevation: {
		small: 2,
		medium: 4,
		large: 8,
		xlarge: 16,
	},
	opacity: {
		low: 0.5,
		medium: 0.7,
		high: 0.9,
	},
} as const
