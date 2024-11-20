import React, { memo } from 'react'

import { BottomTabBarProps } from '@react-navigation/bottom-tabs'

import { Box, Icon, Text, TouchableOpacityBox } from '@/components'
import { useAppSafeArea, useAppTheme } from '@/hooks'
import { RootAppTabBottomRouterParamList } from '@/types/routes'
import { IconName } from '@/types/theme'

export const mapScreenToProps: Record<
	keyof RootAppTabBottomRouterParamList,
	{
		label: string
		icon: {
			focused: IconName
			unfocused: IconName
		}
	}
> = {
	HomeScreen: {
		label: 'Início',
		icon: {
			focused: 'homeFill',
			unfocused: 'home',
		},
	},
	NewPostScreen: {
		label: 'Novo post',
		icon: {
			focused: 'newPost',
			unfocused: 'newPost',
		},
	},
	FavoriteScreen: {
		label: 'Favorito',
		icon: {
			focused: 'bookmarkFill',
			unfocused: 'bookmark',
		},
	},
	MyProfileScreen: {
		label: 'Meu perfil',
		icon: {
			focused: 'profileFill',
			unfocused: 'profile',
		},
	},
}

const AppTabBarCustomMemoized = ({
	state,
	descriptors,
	navigation,
}: BottomTabBarProps) => {
	const { bottom } = useAppSafeArea()
	const { colors } = useAppTheme()

	return (
		<Box
			paddingTop="s12"
			backgroundColor="background"
			flexDirection="row"
			style={[
				{ paddingBottom: bottom },
				// eslint-disable-next-line react-native/no-inline-styles, react-native/no-color-literals
				{
					elevation: 10,
					shadowColor: colors.primaryShadow,
					shadowOpacity: 0.05,
					shadowRadius: 12,
					shadowOffset: { width: 0, height: -3 },
				},
			]}
		>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key]

				const tabItem =
					mapScreenToProps[route.name as keyof RootAppTabBottomRouterParamList]

				const isFocused = state.index === index

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
						canPreventDefault: true,
					})

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate({
							name: route.name,
							params: route.params,
							merge: true,
						})
					}
				}

				const onLongPress = () => {
					navigation.emit({
						type: 'tabLongPress',
						target: route.key,
					})
				}

				return (
					<TouchableOpacityBox
						activeOpacity={1}
						alignItems="center"
						accessibilityRole="button"
						accessibilityState={isFocused ? { selected: true } : {}}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarTestID}
						onPress={onPress}
						onLongPress={onLongPress}
						// eslint-disable-next-line react-native/no-inline-styles
						style={{ flex: 1 }}
						key={`${route.key}-${index}`}
					>
						<Icon
							color={isFocused ? 'primary' : 'backgroundContrast'}
							name={isFocused ? tabItem.icon.focused : tabItem.icon.unfocused}
						/>
						<Text
							semiBold
							marginTop="s4"
							preset="paragraphCaption"
							color={isFocused ? 'primary' : 'backgroundContrast'}
						>
							{tabItem.label}
						</Text>
					</TouchableOpacityBox>
				)
			})}
		</Box>
	)
}

export const AppTabBarCustom = memo(AppTabBarCustomMemoized)
