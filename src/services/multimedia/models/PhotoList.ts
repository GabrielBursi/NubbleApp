export interface PhotoList {
	/** photo uri */
	uri: string
	/**
	 * an photo unique id, it is a combination of an uniqueId (lodash) and photo's id (camera roll)
	 * @example `${uniqueId()}-${edge.node.id}`
	 */
	id: string
}
