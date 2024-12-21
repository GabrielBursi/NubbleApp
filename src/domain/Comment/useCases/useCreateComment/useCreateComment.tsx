import { useMutation, useQueryClient } from '@tanstack/react-query'

import { CommentApi } from '@/domain/Comment'

//TODO: arrumar query key, assim vai limpar todas as requisições de comentários, o correto é limpar apenas o postId
export const useCreateComment = () => {
	const queryClient = useQueryClient()

	const { data, error, isPending, isSuccess, mutate, reset } = useMutation({
		mutationKey: ['post-comment'],
		gcTime: 3 * 60 * 1000,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				exact: false,
				queryKey: ['comments'],
			})
		},
		mutationFn: ({ message, postId }: { postId: number; message: string }) =>
			CommentApi.SendComment(postId, message),
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
