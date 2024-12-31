import { useMutation } from '@tanstack/react-query'

import { CommentApi } from '@/domain/Comment'
import { PostModel } from '@/domain/Post'
import { useInvalidateQueryComments } from '@/hooks'

export const useCreateComment = (
	postId: PostModel['id'],
	onSuccess?: () => void
) => {
	const { invalidateCommentCountPost, invalidateQueryComments } =
		useInvalidateQueryComments()

	const { data, error, isPending, isSuccess, mutate, reset } = useMutation({
		mutationKey: ['post-comment'],
		gcTime: 3 * 60 * 1000,
		onSuccess: async () => {
			await invalidateQueryComments(postId)
			invalidateCommentCountPost(postId, 'increment')
			onSuccess?.()
		},
		mutationFn: ({
			message,
			postId,
		}: {
			postId: PostModel['id']
			message: string
		}) => CommentApi.SendComment(postId, message),
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
