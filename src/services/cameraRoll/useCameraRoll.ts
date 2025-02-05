import { useEffect, useState } from 'react'

import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'

import { AppQueryKeys } from '@/types/api'

import { PhotoListPaginated } from './models'
import { useAppCameraRollService } from './useAppCameraRollService'

/**
 * @param hasPermission
 * @default false
 */
export const useCameraRoll = (hasPermission: boolean = false) => {
	const [photoList, setPhotoList] = useState<string[]>([])
	const { getUriPhotos } = useAppCameraRollService()

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

	useEffect(() => {
		if (data) {
			const newList = data.pages.reduce<string[]>((prev, curr) => {
				return [...prev, ...curr.photoList]
			}, [])
			setPhotoList(newList)
		}
	}, [data])

	return {
		photoList,
		hasNextPage,
		fetchNextPage,
	} as const
}
