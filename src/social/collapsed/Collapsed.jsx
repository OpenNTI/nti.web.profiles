import React from 'react';
import PropTypes from 'prop-types';
import { Errors, Loading } from '@nti/web-commons';

import Store from '../Store';
import UserIcon from '../UserIcon';

import IconContainer from './IconContainer';
import ExpandButton from './ExpandButton';
import ContactsButton from './ContactsButton';
import Container from './Container';

const styles = css`
	.loading {
		min-height: 100px;
		overflow: hidden;
	}
`;

CollapsedPanel.propTypes = {
	expand: PropTypes.func.isRequired,
};

export default function CollapsedPanel ( {expand, children} ) {
	const {
		activeUsers,
		loading,
		error,
	} = Store.useValues();

	return (
		<Container>
			{children?.map((child, index) =>
					<React.Fragment key={index}>
						<IconContainer>{child}</IconContainer>
					</React.Fragment>
			)}

			<Loading.Placeholder loading={loading} fallback={(<Loading.Spinner className={styles.loading}/>)}>
				{error ? (
					<Errors.Message error={error}/>
				) : (
					<>
						{activeUsers?.map((user, index) =>
							<React.Fragment key={index}>
								<IconContainer>
									<UserIcon user={user} />
								</IconContainer>
							</React.Fragment>
						)}
					</>
				)}
			</Loading.Placeholder>

			<ExpandButton onClick={expand}/>

			<ContactsButton />

		</Container>
	);
}
