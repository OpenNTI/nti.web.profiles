import React, { useCallback } from 'react';

import { scoped } from '@nti/lib-locale';
import { Input } from '@nti/web-commons';

const t = scoped('nti-profiles.user.edit.inputs.Addresses', {
	mailing: 'Mailing Address',
	billing: 'Billing Address',
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

const FullName = styled(Input.Label)`
	display: block;
`;

const Street1 = styled(Input.Label)`
	display: block;
`;

const Street2 = styled(Input.Label)`
	display: block;
`;

const City = styled(Input.Label)`
	display: block;
`;

const State = styled(Input.Label)`
	display: block;
`;

const Zip = styled(Input.Label)`
	display: block;
`;

const Country = styled(Input.Label)`
	display: block;
`;

const Address = styled('fieldset')`
	border: none;
	padding: 0;

	display: grid;
	grid-template: auto / 1fr 25% 25%;
	gap: 0.625rem;

	${FullName} {
		grid-row: 1 / 2;
		grid-column: 1 / -1;
	}

	${Street1} {
		grid-row: 2 / 3;
		grid-column: 1 / -1;
	}

	${Street2} {
		grid-row: 3 / 4;
		grid-column: 1 / -1;
	}

	${City} {
		grid-row: 4 / 5;
	}

	${State} {
		grid-row: 4 / 5;
	}

	${Zip} {
		grid-row: 4 / 5;
	}

	${Country} {
		grid-row: 5 / 6;
		grid-column: 1 / -1;
	}
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
		<Address>
			<FullName label={label(fullName)}>
				<TextInput
					name={fullName}
					value={value[fullName]}
					onChange={handleChange}
					placeholder={placeholder(fullName)}
				/>
			</FullName>
			<Street1 label={label(street1)}>
				<TextInput
					name={street1}
					value={value[street1]}
					onChange={handleChange}
					placeholder={placeholder(street1)}
				/>
			</Street1>
			<Street2 label={label(street2)}>
				<TextInput
					name={street2}
					value={value[street2]}
					onChange={handleChange}
					placeholder={placeholder(street2)}
				/>
			</Street2>
			<City label={label(city)}>
				<TextInput
					name={city}
					value={value[city]}
					onChange={handleChange}
					placeholder={placeholder(city)}
				/>
			</City>
			<State label={label(state)}>
				<TextInput
					name={state}
					value={value[state]}
					onChange={handleChange}
					placeholder={placeholder(state)}
				/>
			</State>
			<Zip label={label(zip)}>
				<TextInput
					name={zip}
					value={value[zip]}
					onChange={handleChange}
					placeholder={placeholder(zip)}
				/>
			</Zip>
			<Country label={label(country)}>
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
	const { mailing, billing } = value ?? {};

	const onAddressesChange = useCallback(
		newAddresses =>
			!newAddresses.mailing && !newAddresses.billing
				? onChange(null)
				: onChange(newAddresses),
		[onChange]
	);

	const onMailingChange = useCallback(
		newMailing =>
			isEmpty(newMailing)
				? onAddressesChange({ billing })
				: onAddressesChange({ mailing: newMailing, billing }),
		[value, onAddressesChange]
	);

	const onBillingChange = useCallback(
		newBilling =>
			isEmpty(newBilling)
				? onAddressesChange({ mailing })
				: onAddressesChange({ mailing, billing: newBilling }),
		[value, onAddressesChange]
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
