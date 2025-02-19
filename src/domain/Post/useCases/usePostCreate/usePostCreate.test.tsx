import { act, renderHook, waitFor } from '@testing-library/react-native'
import { http, HttpResponse } from 'msw'
import Config from 'react-native-config'

import { PostApi } from '@/domain/Post'
import { TestProvider } from '@/providers'
import { ImageForUpload, MultimediaService } from '@/services/multimedia'
import { serverTest } from '@/tests/server'
import { customFaker } from '@/tests/utils'
import { END_POINTS_API } from '@/types/api'

import { usePostCreate } from './usePostCreate'

describe('usePostCreate', () => {
	const spyPostCreate = jest.spyOn(PostApi, 'Create')
	const spyPrepareImageForUpload = jest.spyOn(
		MultimediaService,
		'prepareImageForUpload'
	)
	const mockOnSuccess = jest.fn()
	const mockOnError = jest.fn()

	const mockImageUpload: ImageForUpload = {
		name: customFaker.lorem.word(5),
		type: 'image/jpeg',
		uri: customFaker.internet.url(),
	}

	const mockPost = {
		description: customFaker.lorem.text(),
		imageUri: customFaker.internet.url(),
	}

	beforeAll(() => {
		spyPrepareImageForUpload.mockResolvedValue(mockImageUpload)
	})

	it('should create a post', async () => {
		const { result } = renderHook(
			() => usePostCreate({ onSuccess: mockOnSuccess }),
			{ wrapper: TestProvider }
		)

		await act(async () => {
			await result.current.createPost(mockPost)
		})
		await waitFor(() => {
			expect(spyPostCreate).toHaveBeenCalledWith(
				mockPost.description,
				mockImageUpload
			)
		})

		await waitFor(() => {
			expect(spyPrepareImageForUpload).toHaveBeenCalledWith(mockPost.imageUri)
		})

		await waitFor(
			() => {
				expect(result.current.newPost).toBeTruthy()
			},
			{ timeout: 10000 }
		)

		await waitFor(() => {
			expect(mockOnSuccess).toHaveBeenCalled()
		})
	})

	it('should call onError with default error message correctly', async () => {
		const { result } = renderHook(
			() => usePostCreate({ onError: mockOnError }),
			{ wrapper: TestProvider }
		)

		serverTest.use(
			...[
				http.post(`${Config.API_URL}${END_POINTS_API.POST}`, () =>
					HttpResponse.error()
				),
			]
		)

		await act(async () => {
			await result.current.createPost(mockPost)
		})

		await waitFor(() => {
			expect(mockOnError).toHaveBeenCalledWith('erro ao criar post')
			expect(result.current.newPost).toBeNull()
		})
	})

	it('should call onError with custom error message correctly', async () => {
		const { result } = renderHook(
			() =>
				usePostCreate({
					onError: mockOnError,
					errorMessage: 'custom message',
				}),
			{ wrapper: TestProvider }
		)

		serverTest.use(
			...[
				http.post(`${Config.API_URL}${END_POINTS_API.POST}`, () =>
					HttpResponse.error()
				),
			]
		)

		await act(async () => {
			await result.current.createPost(mockPost)
		})

		await waitFor(() => {
			expect(mockOnError).toHaveBeenCalledWith('custom message')
			expect(result.current.newPost).toBeNull()
		})
	})
})
