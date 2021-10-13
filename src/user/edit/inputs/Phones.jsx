import { useCallback } from 'react';

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
	const { home, work, ...others } = value ?? {};

	const onValueChange = useCallback(newValue => onChange(newValue), [
		onChange,
	]);

	const onHomeChange = useCallback(
		number =>
			number
				? onValueChange({ home: number, work, ...others })
				: onValueChange({ work, ...others }),
		[value, onValueChange]
	);

	const onWorkChange = useCallback(
		number =>
			number
				? onChange({ home, work: number, ...others })
				: onChange({ home, ...others }),
		[value, onValueChange]
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
