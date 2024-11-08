import { PartialDeep } from '../recursive'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HookMock<THook extends (...args: any) => any> = jest.Mock<
	PartialDeep<ReturnType<THook>>
>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HookMocked<THook extends (...args: any) => any> = jest.Mocked<
	PartialDeep<ReturnType<THook>>
>
