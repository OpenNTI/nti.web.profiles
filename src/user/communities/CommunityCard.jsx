import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {LinkTo} from '@nti/web-routing';

import unresolvedGroupImage from '../../assets/unresolved-group.png';

CommunityCard.propTypes = {
	className: PropTypes.string,
	community: PropTypes.object.isRequired
};

export default function CommunityCard ({className, community, ...props}) {
	return (
		<LinkTo.Object object={community}>
			<div className={cx('user-community-card', className)} {...props} >
				<img className="avatar" src={community.avatarURL || unresolvedGroupImage} />
				<div className="title-container" >
					{community.alias || community.Username}
				</div>
			</div>
		</LinkTo.Object>
	);
}
