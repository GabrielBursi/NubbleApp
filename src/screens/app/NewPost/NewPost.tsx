import React from 'react'
import { StyleSheet } from 'react-native'

import { HeaderPhotoList, PhotoList } from '@/components'
import { useCameraRoll } from '@/services/cameraRoll'
import { ScreenTemplate } from '@/templates'

export const NewPostScreen = () => {
	const { photoList, fetchNextPage } = useCameraRoll()

	return (
		<ScreenTemplate canGoBack title="Novo post" style={styles.containerScreen}>
			<PhotoList
				urlImages={photoList}
				// eslint-disable-next-line @typescript-eslint/no-misused-promises, sonarjs/no-misused-promises
				onEndReached={fetchNextPage}
				onEndReachedThreshold={0.1}
				ListHeaderComponent={<HeaderPhotoList imageSelected={photoList[0]} />}
			/>
		</ScreenTemplate>
	)
}

const styles = StyleSheet.create({
	containerScreen: {
		paddingHorizontal: 0,
	},
})
