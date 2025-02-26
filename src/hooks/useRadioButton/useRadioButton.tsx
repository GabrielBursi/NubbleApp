import { useCallback, useEffect, useState } from 'react'

import { RadioButtonProps } from '@/components/ui/Radio/Radio.types'

export const useRadioButton = (
	opt: Partial<
		Pick<RadioButtonProps, 'checked' | 'disabled' | 'onChange' | 'canUncheck'>
	> = {
		checked: false,
		disabled: false,
		onChange: undefined,
		canUncheck: true,
	}
) => {
	const { checked = false, disabled = false, onChange, canUncheck = true } = opt

	const [internalValue, setInternalValue] = useState(checked)

	const handleChangeValue = useCallback(() => {
		if (disabled) return

		const newValue = !internalValue
		const shouldAllowUncheck = canUncheck && !newValue

		if (newValue || shouldAllowUncheck) {
			setInternalValue(newValue)
			onChange?.(newValue)
		}
	}, [onChange, disabled, internalValue, canUncheck])

	useEffect(() => {
		setInternalValue(!!checked)
	}, [checked])

	return {
		checked: internalValue,
		onChange: handleChangeValue,
	} as const
}
