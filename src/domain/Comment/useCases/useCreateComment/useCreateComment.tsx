import { useMutation, useQueryClient } from '@tanstack/react-query'

import { CommentApi } from '@/domain/Comment'
import { PostModel } from '@/domain/Post'
import { useToastService } from '@/services/toast'
import { AppQueryKeys } from '@/types/api'

//TODO: arrumar query key, assim vai limpar todas as requisições de comentários, o correto é limpar apenas o postId
export const useCreateComment = () => {
	const queryClient = useQueryClient()

	const { showToast } = useToastService()

	const { data, error, isPending, isSuccess, mutate, reset } = useMutation({
		mutationKey: ['post-comment'],
		gcTime: 3 * 60 * 1000,
		onSuccess: async () => {
			showToast({
				message: 'Comentário criado.',
				position: 'bottom',
			})
			await queryClient.invalidateQueries({
				exact: false,
				queryKey: [AppQueryKeys.COMMENTS],
			})
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
