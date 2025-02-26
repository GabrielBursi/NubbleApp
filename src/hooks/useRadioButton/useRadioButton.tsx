import { useCallback, useEffect, useState } from 'react'

import { RadioButtonProps } from '@/components/ui/Radio/Radio.types'

export const useRadioButton = (
	opt: Partial<Pick<RadioButtonProps, 'checked' | 'disabled' | 'onChange'>> = {
		checked: false,
		disabled: false,
		onChange: undefined,
	}
) => {
	const { checked, disabled, onChange } = opt

	const [internalValue, setInternalValue] = useState(!!checked)

	const handleChangeValue = useCallback(() => {
		if (disabled) return

		const newValue = !internalValue
		setInternalValue(newValue)
		onChange?.(newValue)
	}, [onChange, disabled, internalValue])

	useEffect(() => {
		setInternalValue(!!checked)
	}, [checked])

	return {
		checked: internalValue,
		onChange: handleChangeValue,
	} as const
}
