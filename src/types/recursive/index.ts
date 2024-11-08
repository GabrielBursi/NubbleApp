import { Call, Objects } from 'hotscript'

export type PartialDeep<TObj extends object> = Call<Objects.PartialDeep, TObj>
