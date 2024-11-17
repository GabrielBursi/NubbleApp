import { useCallback, useMemo } from 'react'

import {
	FieldValues,
	UseControllerProps,
	ValidationValueMessage,
} from 'react-hook-form'

type Rules<TField extends FieldValues> = Pick<
	UseControllerProps<TField>,
	'rules'
>['rules']

export const useControlledInput = <TField extends FieldValues>(
	rules: Rules<TField>
) => {
	//? assertion necessario para compilador ts, o compilador da erro
	const getValueFromRules = useCallback(
		(type: 'max' | 'min') => {
			if (rules) {
				if (rules[type]) return Number(rules[type])
				const lengthRule = type === 'max' ? 'maxLength' : 'minLength'
				if (
					typeof rules[lengthRule] === 'object' &&
					(rules[lengthRule] as ValidationValueMessage<number>)?.value
				)
					return Number(
						(rules[lengthRule] as ValidationValueMessage<number>)?.value
					)
			}

			return undefined
		},
		[rules]
	)

	const maxValue = useMemo(() => getValueFromRules('max'), [getValueFromRules])
	const minValue = useMemo(() => getValueFromRules('min'), [getValueFromRules])

	return {
		maxValue,
		minValue,
	} as const
}
