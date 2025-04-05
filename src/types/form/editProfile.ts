import { z } from 'zod'

import { schemaTypes } from '@/utils'

export const editProfileSchema = z.object({
	username: schemaTypes.username,
	firstName: schemaTypes.name,
	lastName: schemaTypes.name,
})

export type EditProfileSchema = z.infer<typeof editProfileSchema>
