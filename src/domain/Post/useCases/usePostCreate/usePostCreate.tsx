import { useCallback } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { PostApi, PostModel } from '@/domain/Post'
import { ImageForUpload, MultimediaService } from '@/services/multimedia'
import { AppQueryKeys } from '@/types/api'
import { MutationOptions } from '@/types/shared'

export const usePostCreate = (options?: MutationOptions<PostModel>) => {
	const queryClient = useQueryClient()

	const { mutate, isPending, isError, data } = useMutation({
		mutationFn: ({
			text,
			imageCover,
		}: {
			text: string
			imageCover: ImageForUpload
		}) => PostApi.Create(text, imageCover),
		onSuccess: async (post) => {
			await queryClient.invalidateQueries({ queryKey: [AppQueryKeys.POSTS] })
			options?.onSuccess?.(post)
		},
		onError: () => {
			options?.onError?.(options?.errorMessage ?? 'erro ao criar post')
		},
	})

	const createPost = useCallback(
		({ description, imageUri }: { description: string; imageUri: string }) => {
			const imageCover = MultimediaService.prepareImageForUpload(imageUri)
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
