import { styled, css } from 'styled-components/native'

export const Container = styled.View`
	${({ theme }) => css`
		flex: 1;
		margin-left: auto;
		margin-right: auto;
		padding-left: ${theme.spacings.small}px;
		padding-right: ${theme.spacings.small}px;
		width: 100%;
	`}
`
