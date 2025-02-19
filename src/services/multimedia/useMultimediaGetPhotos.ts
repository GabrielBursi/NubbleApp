import { useCallback, useEffect, useState } from 'react'

import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'

import { AppQueryKeys } from '@/types/api'

import { PhotoList, PhotoListPaginated } from './models'
import { useMultimediaGetPhotosService } from './useMultimediaGetPhotosService'

/**
 * @param hasPermission
 * @default false
 */
export const useMultimediaGetPhotos = (
	hasPermission: boolean = false,
	onInitialLoad?: (firstImage: PhotoList) => void
) => {
	const [photoList, setPhotoList] = useState<PhotoList[]>([])
	const { getUriPhotos } = useMultimediaGetPhotosService()

	const { data, hasNextPage, fetchNextPage } = useInfiniteQuery<
		Readonly<PhotoListPaginated>,
		Error,
		InfiniteData<Readonly<PhotoListPaginated>, unknown>,
		AppQueryKeys[],
		string | undefined
	>({
		queryKey: [AppQueryKeys.CAMERA_ROLL],
		initialPageParam: undefined,
		queryFn: ({ pageParam }) => getUriPhotos(pageParam),
		getNextPageParam: ({ endCursor: cursor }) => cursor,
		enabled: hasPermission,
	})

	const handleFetchNextPage = useCallback(async () => {
		if (hasPermission) await fetchNextPage()
	}, [fetchNextPage, hasPermission])

	useEffect(() => {
		if (data) {
			const newList = data.pages.reduce<PhotoList[]>((prev, curr) => {
				return [...prev, ...curr.photoList]
			}, [])
			setPhotoList(newList)

			if (newList.length) onInitialLoad?.(newList[0]!)
		}
	}, [data, onInitialLoad])

	return {
		photoList,
		hasNextPage,
		fetchNextPage: handleFetchNextPage,
	} as const
}
