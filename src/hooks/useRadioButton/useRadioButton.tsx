import { useCallback, useEffect, useState } from 'react'

import { RadioButtonProps } from '@/components/ui/RadioButton/RadioButton.types'

export const useRadioButton = (
	{
		checked,
		disabled,
		onChange,
	}: Pick<RadioButtonProps, 'checked' | 'disabled' | 'onChange'> = {
		checked: false,
		disabled: false,
		onChange: undefined,
	}
) => {
	const [internalValue, setInternalValue] = useState(checked)

	const handleChangeValue = useCallback(() => {
		if (disabled) return
		setInternalValue((old) => {
			onChange?.(!old)
			return !old
		})
	}, [onChange, disabled])

	useEffect(() => {
		setInternalValue(checked)
	}, [checked])

	return {
		checked: internalValue,
		onChange: handleChangeValue,
	} as const
}
