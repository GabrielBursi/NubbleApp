import { act } from '@testing-library/react-native'

type CustomAct = (cb: () => void | Promise<void>) => Promise<void>
// eslint-disable-next-line sonarjs/deprecation
export const customAct: CustomAct = async (cb) => await act(cb)
