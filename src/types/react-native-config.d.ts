declare module 'react-native-config' {
	export interface NativeConfig {
		LOAD_STORYBOOK?: 'true' | 'false'
		API_URL?: string
		LOAD_MOCK?: '0' | '1'
		MOCK_ERROR?: '0' | '1'
	}

	export const Config: NativeConfig
	export default Config
}
