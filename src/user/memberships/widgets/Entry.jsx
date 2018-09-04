import React from 'react';
import PropTypes from 'prop-types';
import {LinkTo} from '@nti/web-routing';
import {Avatar, DisplayName} from '@nti/web-commons';

export default class Community extends React.Component {

	static propTypes = {
		item: PropTypes.object.isRequired // community instance
	}

	render () {
		const {item} = this.props;

		return (
			<LinkTo.Object object={item} className="entry">
				<div className="avatar-container">
					<Avatar entity={item} />
				</div>
				<DisplayName entity={item} />
			</LinkTo.Object>
		);
	}
}
