import { AppPermissionName } from './AppPermissionName'
import { AppPermissionStatus } from './AppPermissionStatus'

export interface IPermissionService {
	request: (name: AppPermissionName) => Promise<AppPermissionStatus>
	check: (name: AppPermissionName) => Promise<AppPermissionStatus>
}
