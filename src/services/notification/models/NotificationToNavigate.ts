export interface NotificationToNavigate<TParams extends object = object> {
	screen: string
	params?: TParams
}
