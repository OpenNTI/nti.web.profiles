import { render, act } from '@testing-library/react';

import * as TestUtils from '@nti/web-client/test-utils';
import { flushPromises } from '@nti/lib-commons/test-utils';

import Bookmark from '../View';

const { tearDownTestClient, setupTestClient } = TestUtils;

const mockService = {
	getObject: () => Promise.resolve({ Title: 'Test' }),
	resolveEntity: () => Promise.resolve({ displayName: 'Tim Jones' }),
};

const onBefore = () => {
	jest.useFakeTimers();
	setupTestClient(mockService);
};

const onAfter = () => {
	tearDownTestClient();
};

/* eslint-env jest */
describe('Bookmark', () => {
	beforeEach(onBefore);
	afterEach(onAfter);

	test('renders correctly', async () => {
		const item = {
			creator: 'user4',
			getCreatedTime: () => new Date('2018-08-31'),
			getContextPath: () =>
				Promise.resolve([
					[
						{
							NTIID: 'tag:nextthought.com,2011-10:IFSTA-Bundle-IFSTA_Book_Aircraft_Rescue_and_Fire_Fighting_Sixth_Edition',
							getPresentationProperties: () => ({
								title: 'Aircraft Rescue and Fire Fighting Sixth Edition',
							}),
						},
						{
							NTIID: 'tag:nextthought.com,2011-10:IFSTA-HTML-IFSTA_Book_Aircraft_Rescue_and_Fire_Fighting_Sixth_Edition.section:Engine_Types_and_Applications3',
							Title: 'Engine Types adn Applications',
						},
					],
				]),
			NTIID: 'tag:nextthought.com,2011-10:user4-OID-0x04e6fa:5573657273:nywS9Pjp8FE',
		};
		const context = {
			getDefaultAssetRoot: () => '',
			NTIID: 'tag:nextthought.com,2011-10:IFSTA-Bundle-IFSTA_Book_Aircraft_Rescue_and_Fire_Fighting_Sixth_Edition',
			PlatformPresentationResources: [
				{
					Class: 'DisplayablePlatformPresentationResources',
					CreatedTime: 1532453102,
					InheritPlatformName: null,
					'Last Modified': 1527882586,
					PlatformName: 'webapp',
					Version: 1,
					href: '',
				},
			],
		};
		const bookmarkCmp = render(<Bookmark item={item} context={context} />);

		await act(async () => {
			jest.runAllTimers();
			await flushPromises();
		});

		const tree = bookmarkCmp.asFragment();

		expect(tree).toMatchSnapshot();
	});
});
