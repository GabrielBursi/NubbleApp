import React, { useCallback, useEffect, useState } from 'react'
import { Keyboard } from 'react-native'

import { TextInputMessage } from '@/components'
import { useCreateComment } from '@/domain/Comment'

import { TextInputAddCommentProps } from './TextInputAddComment.types'

export const TextInputAddComment = ({
	postId,
}: Readonly<TextInputAddCommentProps>) => {
	const [comment, setComment] = useState('')
	const {
		createComment,
		loading,
		resetCreateComment,
		createdComment,
		isSuccess,
	} = useCreateComment()

	const onPressSend = useCallback(() => {
		createComment({ postId, message: comment })
		setComment('')
		Keyboard.dismiss()
	}, [comment, createComment, postId])

	useEffect(() => {
		if (isSuccess && createdComment) resetCreateComment()
	}, [createdComment, isSuccess, resetCreateComment])

	return (
		<TextInputMessage
			placeholder="Adicione um comentário"
			onPressSend={onPressSend}
			value={comment}
			onChangeText={setComment}
			readOnly={loading}
			editable={!loading}
		/>
	)
}
