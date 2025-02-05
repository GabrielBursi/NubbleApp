import { Dimensions } from 'react-native'

import { renderHook } from '@testing-library/react-native'

import { usePhotoList } from './usePhotoList'

describe('usePhotoList', () => {
	const spyDimensionsGet = jest.spyOn(Dimensions, 'get')

	beforeEach(() => {
		spyDimensionsGet.mockReturnValue({
			...Dimensions.get('screen'),
			width: 100,
		})
	})

	it('should return the photo"s width correctly', () => {
		const { result } = renderHook(usePhotoList)

		expect(result.current.PHOTO_ITEM_WIDTH).toBe(100 / 4)
	})
})
