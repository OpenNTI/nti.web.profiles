import { DisplayName, Errors, Loading } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

import {ContactsButton, Container, EntryContainer, Footer, Header} from './parts/expanded';
import Store from './Store';
import BadgedAvatar from './BadgedAvatar';

const Name = styled(DisplayName)`
	margin-left: 48px;
	position: absolute;
	width: 150px;
	height: 42px;
	color: #fff;
	padding: 19px 4px 0 4px;
	font-size: 14px;
	font-weight: 200;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

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

export default function ExpandedPanel ( { toggle:collapse } ) {
	const {
		activeUsers,
		loading,
		error,
	} = Store.useValue();

	return (
		<Container>
			<Header onCollapseClick={collapse} />

			<Loading.Placeholder loading={loading} fallback={(<Spinner/>)}>
				{error ? (
					<Errors.Message error={error}/>
				) : (
					<UsersContainer >
						{activeUsers && Object.keys(activeUsers).map((entity, index) => {
							return (
								<EntryContainer key={index}>
									<BadgedAvatar entity={entity} presence={activeUsers[entity]} expanded/>
									<Name entity={entity} />
								</EntryContainer>
							);
						})}
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
