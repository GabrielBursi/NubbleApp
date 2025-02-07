import {
	check as RNPcheck,
	request as RNPrequest,
	PermissionStatus as RNPPermissionStatus,
	PERMISSIONS as RNP_PERMISSIONS,
	Permission as RNPPermission,
} from 'react-native-permissions'

import { AppPermissionName, IPermissionService } from './models'
import { AppPermissionStatus } from './models/AppPermissionStatus'

class IOSPermissionService implements IPermissionService {
	private readonly mapName: Record<AppPermissionName, RNPPermission> = {
		photoLibrary: RNP_PERMISSIONS.IOS.PHOTO_LIBRARY,
		camera: RNP_PERMISSIONS.IOS.CAMERA,
	}

	private readonly mapStatus: Record<RNPPermissionStatus, AppPermissionStatus> =
		{
			blocked: 'never_ask_again',
			denied: 'denied',
			granted: 'granted',
			limited: 'granted',
			unavailable: 'unavailable',
		}

	async check(name: AppPermissionName): Promise<AppPermissionStatus> {
		const status = await RNPcheck(this.mapName[name])
		return this.mapStatus[status]
	}

	async request(name: AppPermissionName): Promise<AppPermissionStatus> {
		const status = await RNPrequest(this.mapName[name])
		return this.mapStatus[status]
	}
}

export const PermissionService = new IOSPermissionService()
