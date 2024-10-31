declare module 'react-native-config' {
	export interface NativeConfig {
		LOAD_STORYBOOK?: 'true' | 'false'
		API_URL?: string
	}

	export const Config: NativeConfig
	export default Config
}
