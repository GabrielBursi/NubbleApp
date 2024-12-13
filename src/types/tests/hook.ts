import { PartialDeep } from '../recursive'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PartialDeepReturnHook<THook extends (...args: any) => any> = PartialDeep<
	ReturnType<THook>
>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ReturnHookMocked<THook extends (...args: any) => any> = jest.Mocked<
	PartialDeepReturnHook<THook>
>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HookMocked<THook extends (...args: any) => any> = jest.Mock<
	PartialDeepReturnHook<THook>
>
