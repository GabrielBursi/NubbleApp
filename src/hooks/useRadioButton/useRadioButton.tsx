import { useCallback, useEffect, useMemo, useState } from 'react'

import { RadioButtonProps } from '@/components/ui/Radio/Radio.types'

export const useRadioButton = (
	opt: Partial<
		Pick<RadioButtonProps, 'checked' | 'onChange' | 'canUncheck'>
	> = {
		checked: false,
		onChange: undefined,
		canUncheck: true,
	}
) => {
	const { checked = false, onChange, canUncheck = true } = opt

	const [internalValue, setInternalValue] = useState(checked)

	const shouldAllowUncheck = useMemo(
		() => canUncheck && internalValue,
		[canUncheck, internalValue]
	)

	const handleChangeValue = useCallback(() => {
		const newValue = !internalValue

		if (newValue || shouldAllowUncheck) {
			setInternalValue(newValue)
			onChange?.(newValue)
		}
	}, [onChange, internalValue, shouldAllowUncheck])

	useEffect(() => {
		setInternalValue(!!checked)
	}, [checked])

	return {
		checked: internalValue,
		onChange: handleChangeValue,
	} as const
}
