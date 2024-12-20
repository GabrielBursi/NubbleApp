import { useCallback, useEffect, useMemo, useState } from 'react'

import { UndefinedInitialDataOptions, useQuery } from '@tanstack/react-query'

import { useQueryFocusAware } from '@/hooks'
import { PageApp } from '@/types/shared'

export const usePaginatedList = <TData extends object>(
	getList: (page: number) => Promise<PageApp<TData>>,
	queryKey: string,
	optionsQuery?: UndefinedInitialDataOptions<PageApp<TData>>
) => {
	const [listData, setListData] = useState<TData[]>([])
	const [page, setPage] = useState(1)

	const isFocused = useQueryFocusAware()

	const { data, error, isFetching } = useQuery({
		queryKey: [queryKey, page],
		queryFn: () => getList(page),
		staleTime: 0,
		refetchOnMount: true,
		refetchOnWindowFocus: true,
		gcTime: 3 * 60 * 1000,
		placeholderData: (oldData) => oldData,
		enabled: isFocused(),
		...optionsQuery,
	})

	const dataFromApi = useMemo(() => data?.data ?? [], [data])
	const metaFromApi = useMemo(() => data?.meta ?? null, [data])
	const hasNextPage = useMemo(() => !!metaFromApi?.hasNextPage, [metaFromApi])

	const fetchMoreDataWithPagination = useCallback(() => {
		if (hasNextPage) setPage((prevPage) => prevPage + 1)
	}, [hasNextPage])

	const refreshList = useCallback(() => {
		setPage(1)
	}, [])

	useEffect(() => {
		if (!isFetching && dataFromApi) {
			setListData((prevList) =>
				page === 1 ? dataFromApi : [...prevList, ...dataFromApi]
			)
		}
	}, [dataFromApi, isFetching, page])

	return {
		listData,
		error,
		loading: isFetching,
		fetchMoreDataWithPagination,
		refreshList,
	} as const
}
