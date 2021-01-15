import PropTypes from 'prop-types';
import React from 'react';
import { DisplayName, Errors, Loading } from '@nti/web-commons';

import Store from '../Store';
import UserIcon from '../BadgedAvatar';

import ContactsButton from './Contacts';
import Container from './Container';
import EntryContainer from './EntryContainer';
import Footer from './Footer';
import Header from './Header';

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
	collapse: PropTypes.func.isRequired,
};

export default function ExpandedPanel ( { collapse } ) {
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
								<React.Fragment key={index}>
									<EntryContainer>
										<UserIcon user={user} />
										<DisplayName entity={user} className={styles.name} />
									</EntryContainer>
								</React.Fragment>
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
