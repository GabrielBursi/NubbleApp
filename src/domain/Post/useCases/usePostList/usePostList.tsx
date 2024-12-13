import { useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import { PostApi, PostModel } from '@/domain/Post'

export const usePostList = () => {
	const [posts, setPosts] = useState<PostModel[]>([])

	const { data, error, isError, isFetched, isFetching, refetch } = useQuery({
		queryKey: [`posts`],
		queryFn: () => PostApi.GetPosts(),
		staleTime: 10 * 60 * 1000,
		gcTime: 3 * 60 * 1000,
	})

	useEffect(() => {
		if (!!data && isFetched && !isError) setPosts(data)
	}, [data, isFetched, isFetching, isError, error])

	return {
		posts,
		error,
		loading: isFetching,
		refetch,
	} as const
}
