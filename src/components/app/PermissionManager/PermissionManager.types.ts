import { AppPermissionName, UsePermissionReturn } from '@/services/permission'

export type PermissionManagerProps = {
	permissionName: AppPermissionName
	/** @default 'O aplicativo não tem permissão para acessar esse recurso.' */
	description?: string
	fallback?: React.ReactElement
	/** @default true */
} & Partial<UsePermissionReturn[0]>

export type FallbackStateProps = Pick<
	Required<PermissionManagerProps>,
	'fallback'
>

export type DeniedStateProps = {
	description: string
	isNeverAskAgain: boolean
}
