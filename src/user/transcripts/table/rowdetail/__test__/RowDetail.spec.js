import React from 'react';
import { render } from '@testing-library/react';

import { RowDetail } from '../RowDetail';

/* eslint-env jest */
describe('RowDetail test', () => {
	const item = {
		title: 'test',
		description: 'test description',
		amount: 12.3434,
		creditDefinition: {
			type: 'test type',
			unit: 'credits',
			precision: 2,
		},
		issuer: 'test issuer',
		getAwardedDate: () => {},
		getFormattedAmount: () =>
			`${item.amount.toFixed(2)} ${item.creditDefinition.type} ${
				item.creditDefinition.unit
			}`,
	};

	test('NTI-5808: Test decimal place', () => {
		jest.spyOn(item, 'getFormattedAmount');
		const { container: root } = render(
			<RowDetail item={item} onDismiss={() => {}} />
		);
		const {
			amount,
			creditDefinition: { type, unit },
		} = item;
		expect(item.getFormattedAmount).toHaveBeenCalledWith(
			expect.objectContaining({ unit: true, type: true })
		);
		expect(root.querySelector('.detail-info .value').textContent).toEqual(
			`${amount.toFixed(2)} ${type} ${unit}`
		);
	});
});
