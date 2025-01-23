declare module 'react-native-config' {
	export interface NativeConfig {
		API_URL?: string

		/**
		 * Controls whether Mock Service Worker (MSW) handlers are enabled in the application.
		 * Possible values:
		 * - `'0'`: Disabled.
		 * - `'1'`: Enabled.
		 *
		 * @default '0'
		 */
		LOAD_MOCK?: '0' | '1'

		/**
		 * Controls whether MSW handlers should simulate errors in the application.
		 * Possible values:
		 * - `'0'`: No error simulation.
		 * - `'1'`: Simulate errors.
		 *
		 * @default '0'
		 */
		MOCK_ERROR?: '0' | '1'

		/**
		 * Determines the service implementation strategy for services.
		 * - `'0'`: Use a Zustand store.
		 * - `'1'`: Use a context provider as a service.
		 *
		 * @default '0'
		 */
		USE_CONTEXT_SERVICE?: '0' | '1'

		/**
		 * Controls if storage will be clear on initial load.
		 * - `'0'`: Not clear storage.
		 * - `'1'`: Clear storage on load.
		 *
		 * @default '0'
		 */
		CLEAR_STORAGE_ON_LOAD?: '0' | '1'
	}

	/**
	 * The application configuration object, providing access to environment variables.
	 */
	export const Config: NativeConfig

	export default Config
}
