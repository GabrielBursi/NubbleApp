export type RootStackParamList = {
	Home: undefined
	Example: { userId: string }
	OtherExample: { sort: 'latest' | 'top' } | undefined
}
