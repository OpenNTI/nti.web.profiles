import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {LinkTo} from '@nti/web-routing';
import {Avatar, DisplayName} from '@nti/web-commons';

CommunityCard.propTypes = {
	className: PropTypes.string,
	community: PropTypes.object.isRequired
};

export default function CommunityCard ({className, community, ...props}) {
	return (
		<LinkTo.Object object={community}>
			<div className={cx('user-community-card', className)} {...props} >
				<Avatar entity={community}/>
				<DisplayName entity={community} className="title-container" />
			</div>
		</LinkTo.Object>
	);
}
