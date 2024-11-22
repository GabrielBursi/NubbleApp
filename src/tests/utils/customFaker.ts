import { base, en, Faker, pt_BR, ja } from '@faker-js/faker'

export const customFaker = new Faker({
	locale: [pt_BR, ja, en, base],
})
