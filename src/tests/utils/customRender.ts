import { ReactElement } from 'react'

import { RenderOptions, render } from '@testing-library/react-native'

import { TestProvider } from '@/providers'

export const customRender = (
	ui: ReactElement,
	options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { ...options, concurrentRoot: false, wrapper: TestProvider })

export * from '@testing-library/react-native'
