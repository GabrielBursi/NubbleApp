import React, { PropsWithChildren } from 'react'
import * as S from './Container.styles'

export const Container = ({ children }: Readonly<PropsWithChildren>) => {
	return <S.Container testID="container">{children}</S.Container>
}
