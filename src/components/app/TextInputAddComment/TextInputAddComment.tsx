import React, { useCallback, useEffect, useState } from 'react'
import { Keyboard } from 'react-native'

import { TextInput } from '@/components'
import { useCreateComment } from '@/domain/Comment'
import { useToastService } from '@/services/toast'

import { TextInputAddCommentProps } from './TextInputAddComment.types'

export const TextInputAddComment = ({
	postId,
}: Readonly<TextInputAddCommentProps>) => {
	const [comment, setComment] = useState('')
	const { showToast } = useToastService()
	const {
		createComment,
		loading,
		resetCreateComment,
		createdComment,
		isSuccess,
	} = useCreateComment(postId, {
		onSuccess: () => {
			showToast({
				message: 'Comentário criado.',
				position: 'bottom',
			})
		},
	})

	const onPressSend = useCallback(() => {
		createComment({ postId, message: comment })
		setComment('')
		Keyboard.dismiss()
	}, [comment, createComment, postId])

	useEffect(() => {
		if (isSuccess && createdComment) resetCreateComment()
	}, [createdComment, isSuccess, resetCreateComment])

	return (
		<TextInput.Send
			placeholder="Adicione um comentário"
			onPressSend={onPressSend}
			value={comment}
			onChangeText={setComment}
			readOnly={loading}
			editable={!loading}
		/>
	)
}
