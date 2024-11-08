import { ComponentProps } from 'react'

import { TextInput } from '@/components/ui'
import { StrictOmit } from '@/types/utils'

export type PasswordInputProps = StrictOmit<
	ComponentProps<typeof TextInput>,
	'RightComponent' | 'secureTextEntry'
>
