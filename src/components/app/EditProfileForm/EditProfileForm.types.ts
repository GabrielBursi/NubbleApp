import { UserModel } from '@/domain/User'

export type EditProfileFormRef = {
	onSubmit: () => void
}

export type EditProfileFormProps = {
	/** @default null */
	user?: UserModel | null
	onChangeIsValid?: (isValid: boolean) => void
	onChangeIsLoading?: (loading: boolean) => void
}
