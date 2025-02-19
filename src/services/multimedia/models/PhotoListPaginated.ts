import { PhotoList } from './PhotoList'

export interface PhotoListPaginated {
	photoList: PhotoList[]
	/** A cursor that matches `page_info { end_cursor }` returned from a previous call to getPhotos. */
	endCursor?: string
	hasNextPage: boolean
}
