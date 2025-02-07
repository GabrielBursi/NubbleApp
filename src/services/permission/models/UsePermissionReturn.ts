import { AppPermissionStatus } from './AppPermissionStatus'

interface PermissionState {
	status: AppPermissionStatus | null
	isLoading: boolean
}

export type UsePermissionReturn = [PermissionState, () => Promise<void>]
