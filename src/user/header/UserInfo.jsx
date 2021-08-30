import './UserInfo.scss';
import React from 'react';

import { Avatar } from '@nti/web-commons';
import { LinkTo, Matches } from '@nti/web-routing';

import Social from './Social';
import Summary from './Summary';

export default function UserInfo({ entity }) {
	return (
		<>
			<span className="avatar-container">
				<Avatar entity={entity} />

				<Matches.Object
					object={entity}
					context="edit"
					render={({ match }) =>
						!match || !entity ? null : (
							<LinkTo.Object
								object={entity}
								context="account"
								className="edit-avatar"
							>
								<i className="icon-edit" />
							</LinkTo.Object>
						)
					}
				/>
			</span>
			<Summary entity={entity} />
			<Social entity={entity} />
		</>
	);
}
