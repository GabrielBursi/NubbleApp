import { useCallback, useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import { PostApi, PostModel } from '@/domain/Post'

export const usePostList = () => {
	const [posts, setPosts] = useState<PostModel[]>([])
	const [page, setPage] = useState(1)

	const { data, error, isError, isFetched, isFetching, refetch } = useQuery({
		queryKey: [`posts`, page],
		queryFn: () => PostApi.GetPosts(page),
		staleTime: 10 * 60 * 1000,
		gcTime: 3 * 60 * 1000,
	})

	const fetchMorePostsWithPagination = useCallback(() => {
		setPage((oldPage) => oldPage + 1)
	}, [])

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		if (page > 1) (async () => await refetch())()
	}, [page, refetch])

	useEffect(() => {
		if (!!data && isFetched && !isError)
			setPosts((oldPosts) => [...oldPosts, ...data])
	}, [data, isFetched, isFetching, isError, error])

	return {
		posts,
		error,
		loading: isFetching,
		refetch,
		fetchMorePostsWithPagination,
	} as const
}
