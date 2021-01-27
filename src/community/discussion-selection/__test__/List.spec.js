/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { render, waitFor, fireEvent } from '@testing-library/react';

import List from '../List';

describe('Topic List test', () => {

	test('Filtered', async () => {
		const items = [
			{ title: 'item 1' },
			{ title: 'item 2' },
			{ title: 'item 3' }
		];

		const {getAllByTestId} = render(<List items={items} searchTerm="2"/>);
		expect(getAllByTestId('discussion-selection-topic-title').length).toBe(1);

		const tree = renderer.create(<List items={items} searchTerm="2" />).toJSON();
		expect(tree).toMatchSnapshot();
	});


	test('Simple list', async () => {
		const student = {
			alias: 'student'
		};

		const instructor = {
			alias: 'instructor'
		};

		const topics = [
			{ title: 'item 1', user: student },
			{ title: 'item 2', user: student },
			{ title: 'item 3', user: instructor }
		];

		const selectedTopics = new Set();

		const onTopicSelect = jest.fn();

		const results = render(<List items={topics} selected={selectedTopics} onSelect={onTopicSelect}/>);
		expect(results.getAllByText(/item \d/).length).toBe(3);

		fireEvent.click(await results.queryByText(/item 1/));

		await waitFor(() =>
			expect(onTopicSelect).toHaveBeenCalled());
	});
});
