import React from 'react';

import { scoped } from '@nti/lib-locale';

import { Card } from '../../../common';

import LabelValueList from './LabelValueList';

const t = scoped('nti-web-profile.user-profile.contact-info', {
	title: 'Contact Info',
	homePhone: 'Home Phone',
	workPhone: 'Work Phone',
	mailing: 'Mailing Address',
	billing: 'Billing Address',
});

const Address = ({ address }) => (
	<span>{Object.values(address).join('\n')}</span>
);

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
			label: t('mailing'),
			value: <Address address={addresses.mailing} />,
		};
	},
	user => {
		const { addresses } = user;

		if (!addresses?.billing) {
			return null;
		}

		return {
			label: t('billing'),
			value: <Address address={addresses.billing} />,
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
