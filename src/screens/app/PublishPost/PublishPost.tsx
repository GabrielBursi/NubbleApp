import React from 'react'
import { Text } from 'react-native'

import { PublishPostScreenProps } from '@/types/screens'

export const PublishPostScreen = ({
	route,
}: Readonly<PublishPostScreenProps>) => {
	return <Text accessibilityRole="text">{route.params.imageUri}</Text>
}
