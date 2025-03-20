import { useCallback } from 'react'
import { Alert } from 'react-native'

import { useMutation } from '@tanstack/react-query'

import { CommentApi, CommentModel } from '@/domain/Comment'
import { PostModel } from '@/domain/Post'
import { useInvalidateQueryComments, useInvalidateQueryPosts } from '@/hooks'
import { MutationOptions } from '@/types/shared'

export const useDeleteComment = (
	postId: PostModel['id'],
	options?: MutationOptions<string>
) => {
	const { invalidateQueryComments } = useInvalidateQueryComments()
	const { updatePostCommentCount } = useInvalidateQueryPosts()

	const { data, error, isPending, isSuccess, mutate, reset } = useMutation({
		mutationKey: ['delete-comment'],
		gcTime: 3 * 60 * 1000,
		mutationFn: (commentId: CommentModel['id']) =>
			CommentApi.DeleteComment(commentId),
		onSuccess: async (message) => {
			await invalidateQueryComments(postId)
			updatePostCommentCount(postId, 'decrement')
			if (options?.onSuccess) options.onSuccess(message)
		},
		onError: () => {
			if (options?.onError) {
				options?.onError(options.errorMessage ?? 'Ocorreu um erro.')
			}
		},
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
