import React, { useCallback } from 'react';

import { scoped } from '@nti/lib-locale';
import { Input } from '@nti/web-commons';

const t = scoped('nti-profiles.user.edit.inputs.Phones', {
	home: 'Home Phone',
	work: 'Work Phone',
});

const PhoneInput = styled(Input.Text).attrs({
	type: 'tel',
	placeholder: '(xxx) xxx-xxxx',
})``;

export function Phones({
	className,
	readOnly,
	schema: { value_type: valueType },
	value,
	onChange,
	onInvalid,
}) {
	const { home, work } = value ?? {};

	const onValueChange = useCallback(
		value =>
			!value.home && !value.work ? onChange(null) : onChange(value),
		[onChange, home, work]
	);

	const onHomeChange = useCallback(
		number =>
			number
				? onValueChange({ home: number, work })
				: onValueChange({ work }),
		[work, home, onValueChange]
	);

	const onWorkChange = useCallback(
		number => (number ? onChange({ home, work: number }) : onChange(home)),
		[work, home, onValueChange]
	);

	return (
		<>
			<Input.Label label={t('home')}>
				<PhoneInput
					name="home"
					value={home ?? ''}
					onChange={onHomeChange}
				/>
			</Input.Label>
			<Input.Label label={t('work')}>
				<PhoneInput
					name="work"
					value={work ?? ''}
					onChange={onWorkChange}
				/>
			</Input.Label>
		</>
	);
}

Phones.fieldLabel = () => '';
