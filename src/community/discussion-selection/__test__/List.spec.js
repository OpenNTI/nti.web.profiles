/* eslint-env jest */
import React from 'react';
import { act, create } from 'react-test-renderer';
import { render, waitFor, fireEvent } from '@testing-library/react';

import { Date as DateUtils } from '@nti/lib-commons';

import List from '../List';

describe('Topic List test', () => {
	afterEach(() => {
		DateUtils.MockDate.uninstall();
	});

	test('Filtered', async () => {
		DateUtils.MockDate.install(new Date('2021-01-28T01:44:00Z'));
		const itemsArray = [
			{
				title: 'item 1',
				getCreatedTime: () => new Date('2021-01-28T01:43:48Z'),
			},
			{
				title: 'item 2',
				getCreatedTime: () => new Date('2021-01-28T01:43:48Z'),
			},
			{
				title: 'item 3',
				getCreatedTime: () => new Date('2021-01-28T01:43:48Z'),
			},
		];

		const items = {
			[Symbol.iterator]: () => itemsArray[Symbol.iterator](),
		};

		const { getAllByTestId } = render(
			<List items={items} searchTerm="2" />
		);
		expect(getAllByTestId('discussion-selection-topic-title').length).toBe(
			1
		);

		let tree;

		act(() => {
			tree = create(<List items={items} searchTerm="2" />);
		});

		expect(tree.toJSON()).toMatchSnapshot();

		tree.unmount();
	});

	test('Simple list', async () => {
		const student = {
			alias: 'student',
		};

		const instructor = {
			alias: 'instructor',
		};

		const topicsArray = [
			{
				title: 'item 1',
				user: student,
				getCreatedTime: () => new Date(),
			},
			{
				title: 'item 2',
				user: student,
				getCreatedTime: () => new Date(),
			},
			{
				title: 'item 3',
				user: instructor,
				getCreatedTime: () => new Date(),
			},
		];

		const topics = {
			[Symbol.iterator]: () => topicsArray[Symbol.iterator](),
		};

		const selectedTopics = new Set();

		const onTopicSelect = jest.fn();

		const results = render(
			<List
				items={topics}
				selected={selectedTopics}
				onSelect={onTopicSelect}
			/>
		);
		expect(results.getAllByText(/item \d/).length).toBe(3);

		fireEvent.click(await results.queryByText(/item 1/));

		await waitFor(() => expect(onTopicSelect).toHaveBeenCalled());
	});
});
