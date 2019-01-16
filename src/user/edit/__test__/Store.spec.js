/* eslint-env jest */
import {Store, Constants} from '../';

const mockEntity = schema => ({
	getProfileType: () => Promise.resolve('TestProfile'),
	getProfileSchema: () => Promise.resolve(schema),
	getID: () => schema.id
});

describe('profile-edit store', () => {
	test('correctly identifies read-only schema', async () => {
		const fields = ['Username', 'about', 'alias'];

		const someEditable = fields.reduce((r, f, i) => ({...r, [f]: {readonly: !!(i % 2)}}), {id: 'some'});
		const noneEditable = fields.reduce((r, f, i) => ({...r, [f]: {readonly: true}}), {id: 'none'});
		const allEditable = fields.reduce((r, f, i) => ({...r, [f]: {readonly: false}}), {id: 'all'});

		const force = true;
		const store = Store.getStore();

		// everything editable
		await store.load(mockEntity(allEditable), force);
		expect(store.get(Constants.CAN_EDIT)).toBe(true);

		// nothing editable
		await store.load(mockEntity(noneEditable), force);
		expect(store.get(Constants.CAN_EDIT)).toBe(false);

		// some editable, some not
		await store.load(mockEntity(someEditable), force);
		expect(store.get(Constants.CAN_EDIT)).toBe(true);
	});

	test('clearing edits leaves other data in place', async () => {
		const NONSCHEMAFIELD = 'nonschemafield';
		const schema = {
			field1: 'test',
			field2: 'test',
			field3: 'test',
			id: 'schema'
		};

		const store = Store.getStore();
		const force = true;

		await store.load(mockEntity(schema), force);

		store[Constants.SET_FIELD_VALUE]('field1', 'abc');
		store[Constants.SET_FIELD_VALUE]('field2', 'abc');
		store[Constants.SET_FIELD_VALUE]('field3', 'abc');
		store[Constants.SET_FIELD_VALUE](NONSCHEMAFIELD, 'abc');

		store.clearEdits();
		expect(store.get('field1')).not.toBeDefined();
		expect(store.get('field2')).not.toBeDefined();
		expect(store.get('field3')).not.toBeDefined();
		expect(store.get(NONSCHEMAFIELD)).toEqual('abc');
	});
});
