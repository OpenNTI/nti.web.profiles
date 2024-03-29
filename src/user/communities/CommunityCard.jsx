import './CommunityCard.scss';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { LinkTo } from '@nti/web-routing';
import { decorate } from '@nti/lib-commons';
import { Avatar, Text } from '@nti/web-commons';

import { ResolveEntityProp } from '../../decorators';

class CommunityCard extends React.Component {
	static propTypes = {
		className: PropTypes.string,
		community: PropTypes.object.isRequired,
	};

	render() {
		const { className, community, ...otherProps } = this.props;

		return (
			<LinkTo.Object object={community}>
				<div
					className={cx('user-community-card', className)}
					{...otherProps}
				>
					<Avatar entity={community} />
					<Text.Base className="title-container" limitLines={2}>
						{community.displayName}
					</Text.Base>
				</div>
			</LinkTo.Object>
		);
	}
}

export default decorate(CommunityCard, [ResolveEntityProp('community')]);
