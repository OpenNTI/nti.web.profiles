/* eslint-env jest */
import {Store, Constants} from '../';

const fields = ['Username', 'about', 'alias'];

const someEditable = fields.reduce((r, f, i) => ({...r, [f]: {readonly: !!(i % 2)}}), {id: 'some'});
const noneEditable = fields.reduce((r, f, i) => ({...r, [f]: {readonly: true}}), {id: 'none'});
const allEditable = fields.reduce((r, f, i) => ({...r, [f]: {readonly: false}}), {id: 'all'});


describe('profile-edit store', () => {
	test('correctly identifies read-only schema', async () => {

		const mockEntity = schema => ({
			getProfileSchema: () => Promise.resolve(schema),
			getID: () => schema.id
		});

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
});
