import { cloneDeep } from 'lodash'
import { http, HttpHandler, HttpResponse, PathParams } from 'msw'
import Config from 'react-native-config'

import { FollowingUserAPIModel, FollowerUserAPIModel } from '@/domain/Follow'
import {
	generateFollowingUserAPI,
	mockFollowerUsersAPI,
	mockFollowingUsersAPI,
} from '@/tests/mocks/mockFollow'
import { mockMetaPaginationApi } from '@/tests/mocks/mockMetaPagination'
import { END_POINTS_API, PageAPI } from '@/types/api'

let mockFollowingUsersClone = cloneDeep(mockFollowingUsersAPI)
const mockFollowerUsersClone = cloneDeep(mockFollowerUsersAPI)

const followingRelationships = new Map<number, boolean>()

export const followHandlers: HttpHandler[] = [
	http.post<PathParams, { followed_user_id: number }>(
		`${Config.API_URL}${END_POINTS_API.FOLLOW}`,
		({ request }) => {
			console.log('Handler', request.method, request.url)

			if (Number(Config.MOCK_ERROR)) return HttpResponse.error()

			const url = new URL(request.url)
			const followedUserId = Number(url.searchParams.get('followed_user_id'))

			const newFollow = generateFollowingUserAPI()
			newFollow.followed_user_id = followedUserId

			mockFollowingUsersClone = [...mockFollowingUsersClone, newFollow]

			followingRelationships.set(followedUserId, true)

			return HttpResponse.json<FollowingUserAPIModel>(newFollow, {
				status: 200,
			})
		}
	),

	http.get(
		`${Config.API_URL}${END_POINTS_API.FOLLOW}/followers`,
		({ request }) => {
			console.log('Handler', request.method, request.url)

			if (Number(Config.MOCK_ERROR)) return HttpResponse.error()

			const url = new URL(request.url)
			const page = Number(url.searchParams.get('page')) || 1
			const perPage = Number(url.searchParams.get('per_page')) || 10

			const startIndex = (page - 1) * perPage
			const endIndex = page * perPage
			const paginatedData = mockFollowerUsersClone.slice(startIndex, endIndex)

			return HttpResponse.json<PageAPI<FollowerUserAPIModel>>(
				{
					data: paginatedData,
					meta: {
						...mockMetaPaginationApi,
						current_page: page,
						per_page: perPage,
						total: mockFollowerUsersClone.length,
					},
				},
				{ status: 200 }
			)
		}
	),

	http.get(
		`${Config.API_URL}${END_POINTS_API.FOLLOW}/following`,
		({ request }) => {
			console.log('Handler', request.method, request.url)

			if (Number(Config.MOCK_ERROR)) return HttpResponse.error()

			const url = new URL(request.url)
			const page = Number(url.searchParams.get('page')) || 1
			const perPage = Number(url.searchParams.get('per_page')) || 10

			const startIndex = (page - 1) * perPage
			const endIndex = page * perPage
			const paginatedData = mockFollowingUsersClone.slice(startIndex, endIndex)

			return HttpResponse.json<PageAPI<FollowingUserAPIModel>>(
				{
					data: paginatedData,
					meta: {
						...mockMetaPaginationApi,
						current_page: page,
						per_page: perPage,
						total: mockFollowingUsersClone.length,
					},
				},
				{ status: 200 }
			)
		}
	),

	http.get(
		`${Config.API_URL}${END_POINTS_API.FOLLOW}/is-following/:userId`,
		({ params, request }) => {
			console.log('Handler', request.method, request.url)

			if (Number(Config.MOCK_ERROR)) return HttpResponse.error()

			const userId = Number(params.userId)

			let isFollowing = followingRelationships.get(userId)

			if (isFollowing === undefined) {
				isFollowing = mockFollowingUsersClone.some(
					(follow) => follow.followed_user_id === userId
				)

				followingRelationships.set(userId, isFollowing)
			}

			return HttpResponse.json<{ isFollowing: boolean }>(
				{ isFollowing },
				{ status: 200 }
			)
		}
	),

	http.delete(
		`${Config.API_URL}${END_POINTS_API.FOLLOW}/:followId`,
		({ params, request }) => {
			console.log('Handler', request.method, request.url)

			if (Number(Config.MOCK_ERROR)) return HttpResponse.error()

			const followId = Number(params.followId)

			const followToRemove = mockFollowingUsersClone.find(
				(f) => f.id === followId
			)
			if (followToRemove) {
				followingRelationships.set(followToRemove.followed_user_id, false)
			}

			mockFollowingUsersClone = mockFollowingUsersClone.filter(
				(follow) => follow.id !== followId
			)

			return HttpResponse.json<string>(
				'Follow relationship removed successfully',
				{ status: 200 }
			)
		}
	),
]
