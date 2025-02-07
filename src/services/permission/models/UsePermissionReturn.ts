import { AppPermissionState } from './AppPermissionState'

export type UsePermissionReturn = [AppPermissionState, () => Promise<void>]
