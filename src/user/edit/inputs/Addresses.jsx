import React, { useCallback } from 'react';

import { scoped } from '@nti/lib-locale';
import { Input } from '@nti/web-commons';

import {
	FullName,
	Street1,
	Street2,
	City,
	State,
	Zip,
	Country,
	Address,
} from '../../../common/Address';

const t = scoped('nti-profiles.user.edit.inputs.Addresses', {
	address: 'Address',
});

const fullName = 'full_name';
const street1 = 'street_address_1';
const street2 = 'street_address_2';
const city = 'city';
const state = 'state';
const zip = 'postal_code';
const country = 'country';

const isEmpty = a =>
	[fullName, street1, street2, city, state, zip, country].every(f => !a[f]);

const TextInput = styled(Input.Text)`
	display: block;
`;

function AddressInput({ value, schema, onChange }) {
	const handleChange = useCallback(
		(newValue, e) =>
			onChange({
				...value,
				Class: 'Address',
				MimeType: 'application/vnd.nextthought.users.address',
				[e.target.name]: newValue,
			}),
		[onChange, value]
	);

	const label = n => schema[n].description;
	const placeholder = n => schema[n].title;

	return (
		<Address input as="fieldset">
			<FullName as={Input.Label} label={label(fullName)}>
				<TextInput
					name={fullName}
					value={value[fullName]}
					onChange={handleChange}
					placeholder={placeholder(fullName)}
				/>
			</FullName>
			<Street1 as={Input.Label} label={label(street1)}>
				<TextInput
					name={street1}
					value={value[street1]}
					onChange={handleChange}
					placeholder={placeholder(street1)}
				/>
			</Street1>
			<Street2 as={Input.Label} label={label(street2)}>
				<TextInput
					name={street2}
					value={value[street2]}
					onChange={handleChange}
					placeholder={placeholder(street2)}
				/>
			</Street2>
			<City as={Input.Label} label={label(city)}>
				<TextInput
					name={city}
					value={value[city]}
					onChange={handleChange}
					placeholder={placeholder(city)}
				/>
			</City>
			<State as={Input.Label} label={label(state)}>
				<TextInput
					name={state}
					value={value[state]}
					onChange={handleChange}
					placeholder={placeholder(state)}
				/>
			</State>
			<Zip as={Input.Label} label={label(zip)}>
				<TextInput
					name={zip}
					value={value[zip]}
					onChange={handleChange}
					placeholder={placeholder(zip)}
				/>
			</Zip>
			<Country as={Input.Label} label={label(country)}>
				<TextInput
					name={country}
					value={value[country]}
					onChange={handleChange}
					placeholder={placeholder(country)}
				/>
			</Country>
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
	const { mailing, ...others } = value ?? {};

	const onAddressesChange = useCallback(
		newAddresses => onChange(newAddresses),
		[onChange]
	);

	const onAddressChange = useCallback(
		newMailing =>
			isEmpty(newMailing)
				? onAddressesChange(others)
				: onAddressesChange({ mailing: newMailing, ...others }),
		[value, onAddressesChange]
	);

	return (
		<div>
			<Input.Label label={t('address')}>
				<span></span>
			</Input.Label>
			<AddressInput
				value={mailing ?? {}}
				schema={valueType?.schema}
				onChange={onAddressChange}
			/>
		</div>
	);
}

Addresses.fieldLabel = () => '';
