import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Badge } from '@nti/web-commons';

UserIcon.propTypes = {
	user: PropTypes.object.isRequired,
	count: PropTypes.number.isRequired,
};

const Icon = styled('div')`
	--size: 42px;
	vertical-align: middle;
	border-radius: 50%;
	max-width: var(--size);

	& img,
	& svg {
		width: var(--size);
		height: var(--size);
	}
`;

export default function UserIcon ( { user, count } ) {
	return (
		<Badge theme={Badge.THEMES.SUCCESS} position={Badge.POSITIONS.BOTTOM_RIGHT}>
			<Badge badge={count} position={Badge.POSITIONS.TOP_LEFT}>
				<Icon>
					<Avatar entity={user} />
				</Icon>
			</Badge>
		</Badge>
	);
}
