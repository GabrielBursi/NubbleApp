import { useCallback, useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import { PostApi, PostModel } from '@/domain/Post'

export const usePostList = () => {
	const [posts, setPosts] = useState<PostModel[]>([])
	const [page, setPage] = useState(1)
	const [refresh, setRefresh] = useState(false)

	const { data, error, isFetching, refetch } = useQuery({
		queryKey: [`posts`, page],
		queryFn: () => PostApi.GetPosts(page),
		staleTime: 0,
		refetchOnMount: true,
		refetchOnWindowFocus: true,
		refetchInterval: 0,
		gcTime: 3 * 60 * 1000,
		placeholderData: (oldData) => oldData,
	})

	const fetchMorePostsWithPagination = useCallback(() => {
		setPage((prevPage) => prevPage + 1)
	}, [])

	const refreshPosts = useCallback(() => {
		setPage(1)
		setRefresh(true)
	}, [])

	useEffect(() => {
		if (!isFetching && data) {
			setPosts((prevPosts) => (page === 1 ? data : [...prevPosts, ...data]))
		}
	}, [data, isFetching, page])

	useEffect(() => {
		if (page === 1 && refresh) {
			setRefresh(false)
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			refetch()
		}
	}, [page, refetch, refresh])

	return {
		posts,
		error,
		loading: isFetching,
		fetchMorePostsWithPagination,
		refreshPosts,
	} as const
}
