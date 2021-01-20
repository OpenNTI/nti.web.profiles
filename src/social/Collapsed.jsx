import React from 'react';
import PropTypes from 'prop-types';
import { Errors, Loading } from '@nti/web-commons';

import {Container, IconContainer, ExpandButton, ContactsButton} from './parts/collapsed';
import Store from './Store';
import UserIcon from './BadgedAvatar';

const styles = css`
	.loading {
		min-height: 100px;
		overflow: hidden;
	}
`;

CollapsedPanel.propTypes = {
	toggle: PropTypes.func.isRequired,
};

export default function CollapsedPanel ( {toggle:expand, children} ) {
	const {
		activeUsers,
		loading,
		error,
	} = Store.useValue();

	return (
		<Container>
			{React.Children.map(children, child => {
				return (
					<>
						<IconContainer>{child}</IconContainer>
					</>
				);}
			)}

			<Loading.Placeholder loading={loading} fallback={(<Loading.Spinner className={styles.loading}/>)}>
				{error ? (
					<Errors.Message error={error}/>
				) : (
					<>
						{activeUsers?.map((user, index) => {
							return (
								<IconContainer key={index}>
									<UserIcon entity={user} />
								</IconContainer>
							);}
						)}
					</>
				)}
			</Loading.Placeholder>

			<ExpandButton onClick={expand}/>

			<ContactsButton />

		</Container>
	);
}
