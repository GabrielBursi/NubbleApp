export type RootTabParamList = {
	Home: undefined
	Example: { userId: string }
	OtherExample: { sort: 'latest' | 'top' } | undefined
}
