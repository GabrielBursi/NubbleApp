import { act, renderHook, waitFor } from '@testing-library/react-native'

import { CommentApi } from '@/domain/Comment'
import { TestProvider } from '@/providers'
import { useToastService } from '@/services/toast/useToast'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { useCreateComment } from './useCreateComment'

type UseToastService = typeof useToastService
type ReturnUseToastService = ReturnHookMocked<UseToastService>
type MockUseToastService = HookMocked<UseToastService>

jest.mock('@/services/toast/useToast')

describe('useCreateComment', () => {
	const spySendComment = jest.spyOn(CommentApi, 'SendComment')
	const mockHideToast = jest.fn()
	const mockShowToast = jest.fn()

	const mockInicialUseToastService: ReturnUseToastService = {
		hideToast: mockHideToast,
		showToast: mockShowToast,
	}

	beforeEach(() => {
		;(useToastService as MockUseToastService).mockReturnValue(
			mockInicialUseToastService
		)
	})

	it('should create a comment correctly', async () => {
		const { result } = renderHook(useCreateComment, { wrapper: TestProvider })

		await act(() => {
			result.current.createComment({ message: 'jest', postId: '1' })
		})
		await waitFor(() => {
			expect(spySendComment).toHaveBeenCalledWith('1', 'jest')
			expect(mockShowToast).toHaveBeenCalledWith({
				message: 'Comentário criado.',
				position: 'bottom',
			})
		})
	})

	it('should return the comment create correctly', async () => {
		const { result } = renderHook(useCreateComment, { wrapper: TestProvider })

		await act(() => {
			result.current.createComment({ message: 'jest', postId: '1' })
		})
		await waitFor(() => {
			expect(result.current.createdComment).toBeTruthy()
		})
	})
})
