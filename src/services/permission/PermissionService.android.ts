import {
	Platform,
	PermissionsAndroid as RNPermissionsAndroid,
	Permission as RNPermissionAndroid,
} from 'react-native'

import {
	AndroidPermission as RNPAndroidPermission,
	check as RNPcheck,
	request as RNPrequest,
} from 'react-native-permissions'

import { AppPermissionName, IPermissionService } from './models'
import { AppPermissionStatus } from './models/AppPermissionStatus'

type AndroidPermissions =
	| RNPAndroidPermission
	| Extract<RNPermissionAndroid, 'android.permission.POST_NOTIFICATIONS'>

class AndroidPermissionService implements IPermissionService {
	private mapNameToPermission(name: AppPermissionName): AndroidPermissions {
		switch (name) {
			case 'photoLibrary':
				if (Number(Platform.Version) >= 33) {
					return 'android.permission.READ_MEDIA_IMAGES'
				} else {
					return 'android.permission.READ_EXTERNAL_STORAGE'
				}
			case 'camera':
				return 'android.permission.CAMERA'

			case 'notification':
				return 'android.permission.POST_NOTIFICATIONS'

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

			if (permission === 'android.permission.POST_NOTIFICATIONS') {
				const result = await RNPermissionsAndroid.check(
					'android.permission.POST_NOTIFICATIONS'
				)
				return result ? 'granted' : 'denied'
			}

			const result = await RNPcheck(permission)
			return result === 'granted' ? 'granted' : 'denied'
		} catch {
			return 'unavailable'
		}
	}

	async request(name: AppPermissionName): Promise<AppPermissionStatus> {
		try {
			const permission = this.mapNameToPermission(name)
			if (permission === 'android.permission.POST_NOTIFICATIONS') {
				const result = await RNPermissionsAndroid.request(
					'android.permission.POST_NOTIFICATIONS'
				)
				return result
			}

			const result = await RNPrequest(permission)
			return result === 'granted' ? 'granted' : 'denied'
		} catch {
			return 'unavailable'
		}
	}
}

export const PermissionService = new AndroidPermissionService()
