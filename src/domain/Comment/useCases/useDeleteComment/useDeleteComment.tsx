import { useCallback } from 'react'
import { Alert } from 'react-native'

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

	const confirmDelete = useCallback((onConfirm: () => void) => {
		Alert.alert('Deseja excluir o comentário?', 'pressione confirmar', [
			{ text: 'Confirmar', onPress: onConfirm },
			{ text: 'Cancelar', style: 'cancel' },
		])
	}, [])

	const isAllowedToDelete = useCallback(
		(comment: CommentModel, userId: number, postAuthorId: number) =>
			postAuthorId === userId || comment.author.id === userId,
		[]
	)

	return {
		message: data ?? null,
		error,
		loading: isPending,
		isSuccess,
		deleteComment: mutate,
		resetDeleteComment: reset,
		confirmDelete,
		isAllowedToDelete,
	} as const
}
