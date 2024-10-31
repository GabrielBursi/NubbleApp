import { device } from 'detox'

beforeAll(async () => {
	await device.launchApp({ newInstance: true })
})

beforeEach(async () => {
	await device.reloadReactNative()
})

afterAll(async () => {
	await device.terminateApp()
})
