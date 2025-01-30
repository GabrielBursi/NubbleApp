import { UserModel } from '@/domain/User'

export interface SearchHistoryService {
	userList: UserModel[]
	addUser: (user: UserModel) => void
	removeUser: (userId: UserModel['id']) => void
	clearUserList: () => void
}
