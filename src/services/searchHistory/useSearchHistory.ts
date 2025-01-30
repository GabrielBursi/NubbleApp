import { SearchHistoryService } from './models'
import {
	useSearchHistoryServiceZustand,
	useSearchHistoryZustand,
} from './store'

//TODO: implementar service em context
export const useSearchHistory = (): SearchHistoryService['userList'] =>
	useSearchHistoryZustand()

export const useSearchHistoryService = (): Omit<
	SearchHistoryService,
	'userList'
> => useSearchHistoryServiceZustand()
