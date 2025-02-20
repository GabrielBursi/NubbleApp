export const mockCamera = {
	useCameraDevice: jest.fn(),
	useCameraFormat: jest.fn(),
	useCodeScanner: jest.fn(),
	useCameraPermission: () => ({
		hasPermission: true,
		requestPermission: jest.fn(),
	}),
} as const
