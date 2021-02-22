import React from 'react';
import { render } from '@testing-library/react';

import RowDetail from '../RowDetail';

/* eslint-env jest */
describe('RowDetail test', () => {
	const item = {
		title: 'test',
		description: 'test description',
		amount: 12.3434,
		creditDefinition: {
			type: 'test type',
			unit: 'credits',
		},
		issuer: 'test issuer',
		getAwardedDate: () => {},
	};

	test('NTI-5808: Test decimal place', () => {
		const { container: root } = render(
			<RowDetail item={item} onDismiss={() => {}} />
		);
		const {
			creditDefinition: { type, unit },
		} = item;
		expect(root.querySelector('.detail-info .value').textContent).toEqual(
			`${item.amount.toFixed(2)} ${type} ${unit}`
		);
	});
});
