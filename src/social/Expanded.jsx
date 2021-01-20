import PropTypes from 'prop-types';
import React from 'react';
import { DisplayName, Errors, Loading } from '@nti/web-commons';

import {ContactsButton, Container, EntryContainer, Footer, Header} from './parts/expanded';
import Store from './Store';
import UserIcon from './BadgedAvatar';

const styles = css`
	.name {
		margin-left: 48px;
		position: relative;
		width: 150px;
		height: 42px;
		color: #fff;
		padding: 12px 4px 0 4px;
		font-size: 14px;
		font-weight: 200;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.loading {
		min-height: 100px;
		overflow: hidden;
	}
`;

ExpandedPanel.propTypes = {
	toggle: PropTypes.func.isRequired,
};

export default function ExpandedPanel ( { toggle:collapse } ) {
	const {
		activeUsers,
		loading,
		error,
	} = Store.useValue();

	return (
		<Container>
			<Header onCollapseClick={collapse} />

			<Loading.Placeholder loading={loading} fallback={(<Loading.Spinner className={styles.loading}/>)}>
				{error ? (
					<Errors.Message error={error}/>
				) : (
					<>
						{activeUsers?.map((user, index) => {
							return (
								<EntryContainer key={index}>
									<UserIcon user={user} />
									<DisplayName entity={user} className={styles.name} />
								</EntryContainer>
							);
						})}
					</>
				)}
			</Loading.Placeholder>

			<Footer>
				<ContactsButton />
			</Footer>
		</Container>
	);
}
