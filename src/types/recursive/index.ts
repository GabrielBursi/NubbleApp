import { Call, Objects } from 'hotscript'

export type PartialDeep<TObj extends object> = Call<Objects.PartialDeep, TObj>
export type RequiredDeep<TObj extends object> = Call<Objects.RequiredDeep, TObj>
