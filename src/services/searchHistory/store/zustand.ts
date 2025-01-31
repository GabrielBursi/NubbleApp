import { useMemo } from 'react'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { storage } from '@/services/storage'

import { SearchHistoryService } from '../models'

const useSearchHistoryStore = create<SearchHistoryService>()(
	persist(
		(set, get) => ({
			userList: [],
			addUser: (user) => {
				const userList = get().userList
				const userExists = userList.find((item) => item.id === user.id)
				if (!userExists) {
					const updatedList = [...userList, user]
					set({ userList: updatedList })
				}
			},
			removeUser: (userId) => {
				const userList = get().userList
				const updatedList = userList.filter((user) => user.id !== userId)
				set({ userList: updatedList })
			},
			clearUserList: () => {
				set({ userList: [] })
			},
		}),
		{
			name: '@SearchHistory',
			storage: storage,
		}
	)
)

export const useSearchHistoryZustand = (): SearchHistoryService['userList'] => {
	const userList = useSearchHistoryStore((state) => state.userList)
	return useMemo(() => userList, [userList])
}

export const useSearchHistoryServiceZustand = (): Omit<
	SearchHistoryService,
	'userList'
> => {
	const addUser = useSearchHistoryStore((state) => state.addUser)
	const removeUser = useSearchHistoryStore((state) => state.removeUser)
	const clearUserList = useSearchHistoryStore((state) => state.clearUserList)

	return useMemo(
		() => ({
			addUser,
			removeUser,
			clearUserList,
		}),
		[addUser, clearUserList, removeUser]
	)
}
