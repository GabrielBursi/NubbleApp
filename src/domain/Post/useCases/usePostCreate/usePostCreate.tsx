import { useCallback } from 'react'

import { useMutation } from '@tanstack/react-query'

import { PostApi, PostModel } from '@/domain/Post'
import { useInvalidateQueryPosts } from '@/hooks'
import { ImageForUpload, MultimediaService } from '@/services/multimedia'
import { MutationOptions } from '@/types/shared'

export const usePostCreate = (options?: MutationOptions<PostModel>) => {
	const { invalidateQueryPosts } = useInvalidateQueryPosts()

	const { mutate, isPending, isError, data } = useMutation({
		mutationFn: ({
			text,
			imageCover,
		}: {
			text: string
			imageCover: ImageForUpload
		}) => PostApi.Create(text, imageCover),
		onSuccess: async (post) => {
			await invalidateQueryPosts()
			options?.onSuccess?.(post)
		},
		onError: () => {
			options?.onError?.(options?.errorMessage ?? 'erro ao criar post')
		},
	})

	const createPost = useCallback(
		async ({
			description,
			imageUri,
		}: {
			description: string
			imageUri: string
		}) => {
			const imageCover = await MultimediaService.prepareImageForUpload(imageUri)
			mutate({ text: description, imageCover })
		},
		[mutate]
	)

	return {
		createPost,
		loading: isPending,
		isError,
		newPost: data ?? null,
	} as const
}
