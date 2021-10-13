
import { scoped } from '@nti/lib-locale';

import { Card } from '../../../common';
import { Address } from '../../../common/Address';

import LabelValueList from './LabelValueList';

const t = scoped('nti-web-profile.user-profile.contact-info', {
	title: 'Contact Info',
	homePhone: 'Home Phone',
	workPhone: 'Work Phone',
	address: 'Address',
});

const Fields = [
	user => {
		const { phones } = user;

		if (!phones?.home) {
			return null;
		}

		return { label: t('homePhone'), value: phones.home };
	},
	user => {
		const { phones } = user;

		if (!phones?.work) {
			return null;
		}

		return { label: t('workPhone'), value: phones.work };
	},
	user => {
		const { addresses } = user;

		if (!addresses?.mailing) {
			return null;
		}

		return {
			label: t('address'),
			value: <Address address={addresses.mailing} />,
		};
	},
];

export function ContactInfo({ user }) {
	const fields = Fields.map(f => f(user)).filter(Boolean);

	if (!fields.length) {
		return null;
	}

	return (
		<Card title={t('title')}>
			<LabelValueList values={fields} />
		</Card>
	);
}
