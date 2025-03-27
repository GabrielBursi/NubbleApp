import { useEffect, useState } from 'react'

import {
	InfiniteData,
	QueryKey,
	UndefinedInitialDataInfiniteOptions,
	useInfiniteQuery,
} from '@tanstack/react-query'

import { MetaDataPaginationApp, PageApp } from '@/types/shared'
import { StrictOmit } from '@/types/utils'

interface UsePaginatedList<TData extends object>
	extends Pick<MetaDataPaginationApp, 'hasNextPage'> {
	list: TData[]
	isError: boolean
	error: string | null
	isLoading: boolean
	fetchNextPage: () => Promise<InfiniteData<PageApp<TData>> | null>
	refreshList: () => Promise<InfiniteData<PageApp<TData>> | null>
}

export const usePaginatedList = <TData extends object>(
	getList: (page: number) => Promise<PageApp<TData>>,
	optionsQuery: StrictOmit<
		UndefinedInitialDataInfiniteOptions<
			PageApp<TData>,
			Error,
			InfiniteData<PageApp<TData>, number>,
			QueryKey,
			number
		>,
		'queryFn' | 'getNextPageParam' | 'initialPageParam'
	>
): UsePaginatedList<TData> => {
	const [listData, setListData] = useState<TData[]>([])

	const {
		data,
		error,
		isError,
		isFetched,
		isFetching,
		hasNextPage,
		fetchNextPage,
		refetch,
	} = useInfiniteQuery({
		initialPageParam: 1,
		queryFn: ({ pageParam }) => getList(pageParam),
		getNextPageParam: ({ meta }) =>
			meta.hasNextPage ? meta.currentPage + 1 : null,
		staleTime: 5 * 60 * 1000,
		refetchOnMount: true,
		refetchOnWindowFocus: true,
		gcTime: 3 * 60 * 1000,
		placeholderData: (oldData) => oldData,
		...optionsQuery,
	})

	useEffect(() => {
		if (data && isFetched && !isError) {
			const newList = data.pages.reduce<TData[]>((prev, curr) => {
				return [...prev, ...curr.data]
			}, [])
			setListData(newList)
		}
	}, [data, isError, isFetched])

	return {
		list: listData,
		error: error ? error.message : null,
		isError,
		isLoading: isFetching,
		refreshList: async () => (await refetch()).data ?? null,
		fetchNextPage: async () => (await fetchNextPage()).data ?? null,
		hasNextPage,
	} as const
}
