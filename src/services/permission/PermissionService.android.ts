import { Platform } from 'react-native'

import {
	AndroidPermission as RNPAndroidPermission,
	check as RNPcheck,
	request as RNPrequest,
} from 'react-native-permissions'

import { AppPermissionName, IPermissionService } from './models'
import { AppPermissionStatus } from './models/AppPermissionStatus'

class AndroidPermissionService implements IPermissionService {
	private mapNameToPermission(name: AppPermissionName): RNPAndroidPermission {
		switch (name) {
			case 'photoLibrary':
				if (Number(Platform.Version) >= 33) {
					return 'android.permission.READ_MEDIA_IMAGES'
				} else {
					return 'android.permission.READ_EXTERNAL_STORAGE'
				}
			case 'camera':
				return 'android.permission.CAMERA'

			default: {
				const permissionNotTreated: never = name
				throw new Error(
					`permission name not treated: ${String(permissionNotTreated)}`
				)
			}
		}
	}

	async check(name: AppPermissionName): Promise<AppPermissionStatus> {
		try {
			const permission = this.mapNameToPermission(name)
			const result = await RNPcheck(permission)
			return result === 'granted' ? 'granted' : 'denied'
		} catch {
			return 'unavailable'
		}
	}

	async request(name: AppPermissionName): Promise<AppPermissionStatus> {
		try {
			const permission = this.mapNameToPermission(name)
			const result = await RNPrequest(permission)
			return result === 'granted' ? 'granted' : 'denied'
		} catch {
			return 'unavailable'
		}
	}
}

export const PermissionService = new AndroidPermissionService()
