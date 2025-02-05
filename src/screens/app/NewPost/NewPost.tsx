import React from 'react'
import { StyleSheet } from 'react-native'

import { PhotoList } from '@/components'
import { useCameraRoll } from '@/services/cameraRoll'
import { ScreenTemplate } from '@/templates'

export const NewPostScreen = () => {
	const { list } = useCameraRoll()

	return (
		<ScreenTemplate canGoBack title="Novo post" style={styles.containerScreen}>
			<PhotoList urlImages={list} />
		</ScreenTemplate>
	)
}

const styles = StyleSheet.create({
	containerScreen: {
		paddingHorizontal: 0,
	},
})
