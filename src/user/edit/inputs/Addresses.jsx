import React, { useCallback } from 'react';

import { scoped } from '@nti/lib-locale';
import { Input } from '@nti/web-commons';

const t = scoped('nti-profiles.user.edit.inputs.Addresses', {
	mailing: 'Mailing Address',
	billing: 'Billing Address',
});

const street1 = 'street_address_1';
const street2 = 'street_address_2';
const city = 'city';
const state = 'state';
const zip = 'postal_code';
const country = 'country';

const Street = styled(Input.Text)`
	display: block;
`;

const City = styled(Input.Text)`
	display: block;
`;

const State = styled(Input.Text)`
	display: block;
`;

const Zip = styled(Input.Text)`
	display: block;
`;

const Country = styled(Input.Text)`
	display: block;
`;

const Address = styled('fieldset')`
	border: none;
	padding: 0;

	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: repeat(auto, 6);
	row-gap: 0.625rem;
`;

function AddressInput({ value, schema, onChange }) {
	const handleChange = useCallback(
		(newValue, e) =>
			onChange({
				...value,
				[e.target.name]: newValue,
			}),
		[onChange, value]
	);

	const label = n => schema[n].description;
	const placeholder = n => schema[n].title;

	return (
		<Address>
			<Input.Label label={label(street1)}>
				<Street
					name={street1}
					value={value[street1]}
					onChange={handleChange}
					placeholder={placeholder(street1)}
				/>
			</Input.Label>
			<Input.Label label={label(street2)}>
				<Street
					name={street2}
					value={value[street2]}
					onChange={handleChange}
					placeholder={placeholder(street2)}
				/>
			</Input.Label>
			<Input.Label label={label(city)}>
				<City
					name={city}
					value={value[city]}
					onChange={handleChange}
					placeholder={placeholder(city)}
				/>
			</Input.Label>
			<Input.Label label={label(state)}>
				<State
					name={state}
					value={value[state]}
					onChange={handleChange}
					placeholder={placeholder(state)}
				/>
			</Input.Label>
			<Input.Label label={label(zip)}>
				<Zip
					name={zip}
					value={value[zip]}
					onChange={handleChange}
					placeholder={placeholder(zip)}
				/>
			</Input.Label>
			<Input.Label label={label(country)}>
				<Country
					name={country}
					value={value[country]}
					onChange={handleChange}
					placeholder={placeholder(country)}
				/>
			</Input.Label>
		</Address>
	);
}

export function Addresses({
	className,
	readOnly,
	schema: { value_type: valueType },
	value,
	onChange,
	onInvalid,
}) {
	const { mailing, billing } = value ?? {};

	const onMailingChange = useCallback(
		newMailing => onChange({ mailing: newMailing, billing }),
		[value, onChange]
	);

	const onBillingChange = useCallback(
		newBilling => onChange({ mailing, billing: newBilling }),
		[value, onChange]
	);

	return (
		<div>
			<Input.Label label={t('mailing')}>
				<span></span>
			</Input.Label>
			<AddressInput
				value={mailing ?? {}}
				schema={valueType?.schema}
				onChange={onMailingChange}
			/>
			<Input.Label label={t('billing')}>
				<span></span>
			</Input.Label>
			<AddressInput
				value={billing ?? {}}
				schema={valueType?.schema}
				onChange={onBillingChange}
			/>
		</div>
	);
}

Addresses.fieldLabel = () => '';
