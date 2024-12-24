import { useMutation, useQueryClient } from '@tanstack/react-query'

import { CommentApi, CommentModel } from '@/domain/Comment'

export const useDeleteComment = () => {
	const queryClient = useQueryClient()

	const { data, error, isPending, isSuccess, mutate, reset } = useMutation({
		mutationKey: ['delete-comment'],
		gcTime: 3 * 60 * 1000,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				exact: false,
				queryKey: ['comments'],
			})
		},
		mutationFn: (commentId: CommentModel['id']) =>
			CommentApi.DeleteComment(commentId),
	})

	return {
		message: data ?? null,
		error,
		loading: isPending,
		isSuccess,
		deleteComment: mutate,
		resetDeleteComment: reset,
	} as const
}
