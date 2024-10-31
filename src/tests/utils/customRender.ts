import { ReactElement } from 'react'
import { RenderOptions, render } from '@testing-library/react-native'
import { TestProvider } from '@/providers'

export const customRender = (
	ui: ReactElement,
	options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: TestProvider, ...options })

export * from '@testing-library/react-native'
