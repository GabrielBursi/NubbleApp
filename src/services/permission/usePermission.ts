import { useCallback, useState } from 'react'

import {
	AppPermissionName,
	AppPermissionStatus,
	UsePermissionReturn,
} from './models'
import { PermissionService } from './PermissionService'

export const usePermission = (
	permissionName: AppPermissionName
): Readonly<UsePermissionReturn> => {
	const [isLoading, setIsLoading] = useState(true)
	const [status, setStatus] = useState<AppPermissionStatus | null>(null)

	const checkPermission = useCallback(async () => {
		try {
			setIsLoading(true)
			const initialStatus = await PermissionService.check(permissionName)
			if (initialStatus === 'denied') {
				const _status = await PermissionService.request(permissionName)
				setStatus(_status)
			} else {
				setStatus(initialStatus)
			}
		} catch {
			setStatus('unavailable')
		} finally {
			setIsLoading(false)
		}
	}, [permissionName])

	return [
		{
			status,
			isLoading,
		},
		checkPermission,
	] as const
}
