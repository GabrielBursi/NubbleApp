import { useMutation } from '@tanstack/react-query'

import { CommentApi } from '@/domain/Comment'
import { PostModel } from '@/domain/Post'
import { useInvalidateQueryComments } from '@/hooks'
import { useToastService } from '@/services/toast'

export const useCreateComment = (postId: PostModel['id']) => {
	const { showToast } = useToastService()
	const { invalidateCommentCountPost, invalidateQueryComments } =
		useInvalidateQueryComments()

	const { data, error, isPending, isSuccess, mutate, reset } = useMutation({
		mutationKey: ['post-comment'],
		gcTime: 3 * 60 * 1000,
		onSuccess: async () => {
			showToast({
				message: 'Comentário criado.',
				position: 'bottom',
			})
			await invalidateQueryComments(postId)
			invalidateCommentCountPost(postId, 'increment')
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
