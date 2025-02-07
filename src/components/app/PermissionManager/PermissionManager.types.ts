import { AppPermissionName } from '@/services/permission'

export type PermissionManagerProps = {
	permissionName: AppPermissionName
	description?: string
	fallback?: React.ReactElement
}

export type FallbackStateProps = Pick<
	Required<PermissionManagerProps>,
	'fallback'
>

export type DeniedStateProps = {
	description: string
	isNeverAskAgain: boolean
}
