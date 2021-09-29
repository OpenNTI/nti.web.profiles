import React from 'react';

import { scoped } from '@nti/lib-locale';
import { Input } from '@nti/web-commons';

const t = scoped('nti-profiles.user.edit.inputs.Phones', {
	home: 'Home Phone',
	work: 'Work Phone',
	cell: 'Cell Phone',
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
	const { home, work, cell } = value ?? {};

	const onValueChange = (number, e) => {
		const { name } = e.target;

		onChange({
			home,
			work,
			cell,
			[name]: number,
		});
	};

	return (
		<>
			<Input.Label label={t('home')}>
				<PhoneInput
					name="home"
					value={home ?? ''}
					onChange={onValueChange}
				/>
			</Input.Label>
			<Input.Label label={t('work')}>
				<PhoneInput
					name="work"
					value={work ?? ''}
					onChange={onValueChange}
				/>
			</Input.Label>
			<Input.Label label={t('cell')}>
				<PhoneInput
					name="cell"
					value={cell ?? ''}
					onChange={onValueChange}
				/>
			</Input.Label>
		</>
	);
}

Phones.fieldLabel = () => '';
