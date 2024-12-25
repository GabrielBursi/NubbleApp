import { Toast } from '@/services/toast'

import { customFaker } from '../utils/customFaker'

export const generateToast = (): Toast => ({
	message: customFaker.lorem.text(),
	duration: customFaker.number.int({ min: 2000, max: 5000 }),
	type: 'success',
	position: 'top',
})

export const mockToast = generateToast()
