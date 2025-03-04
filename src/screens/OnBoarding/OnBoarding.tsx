import React from 'react'

import { Box, Container, OnBoardingHeader, Text } from '@/components'

export const OnBoardingScreen = () => {
	return (
		<Box flex={1} backgroundColor="background">
			<Box flex={4} justifyContent="center" alignItems="center">
				<OnBoardingHeader />
			</Box>
			<Container flex={6}>
				<Box
					flex={5}
					backgroundColor="carrotSecondary"
					justifyContent="center"
					alignItems="center"
				>
					<Text>Box 2</Text>
				</Box>
				<Box
					flex={1}
					backgroundColor="success"
					justifyContent="center"
					alignItems="center"
				>
					<Text>Box 3</Text>
				</Box>
			</Container>
		</Box>
	)
}
