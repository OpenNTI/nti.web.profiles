import { DisplayName, Errors, Loading, Theme } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

import {ContactsButton, Container, EntryContainer, Footer, Header} from './parts/expanded';
import Store from './Store';
import UserIcon from './BadgedAvatar';

const styles = css`
	.name {
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
	}

	.loading {
		min-height: 100px;
		overflow: hidden;
	}
`;

export default function ExpandedPanel ( { toggle:collapse } ) {
	const {
		activeUsers,
		loading,
		error,
	} = Store.useValue();

	const theme = Theme.useThemeProperty('icon');

	return (
		<Container theme={theme}>
			<Header onCollapseClick={collapse} />

			<Loading.Placeholder loading={loading} fallback={(<Loading.Spinner className={styles.loading}/>)}>
				{error ? (
					<Errors.Message error={error}/>
				) : (
					<>
						{activeUsers && Object.keys(activeUsers).map((entity, index) => {
							return (
								<EntryContainer key={index}>
									<UserIcon entity={entity} presence={activeUsers[entity]} />
									<DisplayName entity={entity} className={styles.name} />
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

ExpandedPanel.propTypes = {
	toggle: PropTypes.func.isRequired,
};
