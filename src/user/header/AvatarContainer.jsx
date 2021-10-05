import React from 'react';
import cx from 'classnames';

import { Avatar, Layouts } from '@nti/web-commons';
import { LinkTo, Matches } from '@nti/web-routing';

const UserAvatar = styled(Avatar)`
	width: 100%;
	display: block;
`;

const Edit = styled(LinkTo.Object).attrs({ context: 'account' })`
	position: absolute;
	top: 5px;
	right: 5px;
	color: white !important;
	background-color: var(--primary-grey);
	opacity: 0.8;
	padding: 0.3rem 0.45rem;
	border-radius: 2px;
	cursor: pointer;
`;

const Container = styled.span`
	position: relative;
`;

export default function AvatarContainer({ className, entity }) {
	return (
		<Container className={cx('avatar-container', className)}>
			<UserAvatar entity={entity} />

			<Layouts.Responsive.Item
				query={Layouts.Responsive.isWebappContext}
				render={
					<Matches.Object
						object={entity}
						context="edit"
						render={({ match }) =>
							!match || !entity ? null : (
								<Edit object={entity} className="edit-avatar">
									<i className="icon-edit" />
								</Edit>
							)
						}
					/>
				}
			/>
		</Container>
	);
}
