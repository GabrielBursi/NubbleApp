import { useCallback, useEffect, useMemo, useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import { PostApi, PostModel } from '@/domain/Post'

export const usePostList = () => {
	const [posts, setPosts] = useState<PostModel[]>([])
	const [page, setPage] = useState(1)

	const { data, error, isFetching } = useQuery({
		queryKey: [`posts`, page],
		queryFn: () => PostApi.GetPosts(page),
		staleTime: 0,
		refetchOnMount: true,
		refetchOnWindowFocus: true,
		refetchInterval: 0,
		gcTime: 3 * 60 * 1000,
		placeholderData: (oldData) => oldData,
	})

	const postsFromApi = useMemo(() => data?.data ?? [], [data])
	const metaFromApi = useMemo(() => data?.meta ?? null, [data])
	const hasNextPage = useMemo(() => !!metaFromApi?.hasNextPage, [metaFromApi])

	const fetchMorePostsWithPagination = useCallback(() => {
		if (hasNextPage) setPage((prevPage) => prevPage + 1)
	}, [hasNextPage])

	const refreshPosts = useCallback(() => {
		setPage(1)
	}, [])

	useEffect(() => {
		if (!isFetching && postsFromApi) {
			setPosts((prevPosts) =>
				page === 1 ? postsFromApi : [...prevPosts, ...postsFromApi]
			)
		}
	}, [postsFromApi, isFetching, page])

	return {
		posts,
		error,
		loading: isFetching,
		fetchMorePostsWithPagination,
		refreshPosts,
	} as const
}
