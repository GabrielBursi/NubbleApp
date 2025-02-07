import { AppPermissionStatus } from './AppPermissionStatus'

export interface AppPermissionState {
	status: AppPermissionStatus | null
	isLoading: boolean
}
