import PropTypes from 'prop-types';
import React from 'react';

import { Errors, Loading } from '@nti/web-commons';
import { Iterable } from '@nti/lib-commons';

import { ContactsButton, Container, Footer, Header } from './parts/expanded';
import Store from './Store';
import ContactEntry from './ContactEntry';

const Spinner = styled(Loading.Spinner)`
	min-height: 100px;
	overflow: hidden;
`;

const UsersContainer = styled.div`
	position: absolute;
	bottom: 62px;
	top: 33px;
	left: 10px;
	right: 0;
	overflow-y: auto;
	overflow-x: hidden;
`;

export default function ExpandedPanel({ toggle: collapse }) {
	const { loading, error, iterator } = Store.useValue();

	return (
		<Container data-testid="expanded-container">
			<Header onCollapseClick={collapse} />

			<Loading.Placeholder loading={loading} fallback={<Spinner />}>
				{error ? (
					<Errors.Message error={error} />
				) : (
					<UsersContainer>
						{[
							...Iterable.map(iterator(), (entity) => (
									<ContactEntry
										key={entity.toString()}
										entity={entity.toString()}
										expanded
									/>
								)
							),
						]}
					</UsersContainer>
				)}
			</Loading.Placeholder>

			<Footer>
				<ContactsButton />
			</Footer>
		</Container>
	);
}

ExpandedPanel.propTypes = {
	toggle: PropTypes.func.isRequired,
};
