import { ButtonProps } from 'react-native'

export type FeedEmptyProps = {
	loading?: boolean
	error?: unknown
	refetch?: ButtonProps['onPress']
}
