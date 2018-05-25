import React from 'react';
import { shallow } from 'enzyme';

import RowDetail from '../RowDetail';

/* eslint-env jest */
describe('RowDetail test', () => {
	const item = {
		title: 'test',
		description: 'test description',
		amount: 12.3434,
		creditDefinition: {
			type: 'test type',
			unit: 'credits'
		},
		issuer: 'test issuer',
		getAwardedDate: () => {}
	};
	const cmp = shallow(
		<RowDetail
			item={item}
			onDismiss={() => {}}
		/>
	);

	test('NTI-5808: Test decimal place', () => {
		const { creditDefinition: { type, unit }} = item;
		expect(cmp.find('.detail-info .value').first().text()).toEqual(`${item.amount.toFixed(2)} ${type} ${unit}`);
	});
});
