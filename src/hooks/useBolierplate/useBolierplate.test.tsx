import { renderHook } from '@testing-library/react-native'

import { useBolierplate } from './useBolierplate'

describe('useBolierplate', () => {
	it('should be 1', () => {
		const { result } = renderHook(useBolierplate)

		expect(result.current.count).toBe(1)
	})
})
