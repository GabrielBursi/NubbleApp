import { useMutation } from '@tanstack/react-query'

import { CommentApi, CommentModel } from '@/domain/Comment'
import { PostModel } from '@/domain/Post'
import { useInvalidateQueryComments } from '@/hooks'
import { MutationOptions } from '@/types/shared'

export const useCreateComment = (
	postId: PostModel['id'],
	options?: MutationOptions<CommentModel>
) => {
	const { invalidateCommentCountPost, invalidateQueryComments } =
		useInvalidateQueryComments()

	const { data, error, isPending, isSuccess, mutate, reset } = useMutation({
		mutationKey: ['post-comment'],
		gcTime: 3 * 60 * 1000,
		mutationFn: ({
			message,
			postId,
		}: {
			postId: PostModel['id']
			message: string
		}) => CommentApi.SendComment(postId, message),
		onSuccess: async (data) => {
			await invalidateQueryComments(postId)
			invalidateCommentCountPost(postId, 'increment')
			if (options?.onSuccess) options.onSuccess(data)
		},
		onError: () => {
			if (options?.onError) {
				options.onError(options?.errorMessage ?? 'Ocorreu um erro.')
			}
		},
	})

	return {
		createdComment: data ?? null,
		error,
		loading: isPending,
		isSuccess,
		createComment: mutate,
		resetCreateComment: reset,
	} as const
}
