export interface PhotoListPaginated {
	photoList: string[]
	/** A cursor that matches `page_info { end_cursor }` returned from a previous call to getPhotos. */
	endCursor?: string
	hasNextPage: boolean
}
