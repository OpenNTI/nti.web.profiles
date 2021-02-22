import './ListItem.scss';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { User } from '@nti/web-commons';

export default class ProfileSelectListItem extends React.Component {
	static propTypes = {
		profile: PropTypes.object.isRequired,
		selected: PropTypes.bool,
		onSelect: PropTypes.func,
	};

	onClick = () => {
		const { profile, onSelect } = this.props;

		if (onSelect) {
			onSelect(profile);
		}
	};

	render() {
		const { profile, selected } = this.props;

		return (
			<div
				className={cx('nti-profile-selector-list-item', { selected })}
				onClick={this.onClick}
			>
				<User.Avatar user={profile} />
				<div className="meta">
					<User.DisplayName user={profile} />
					{profile.email && (
						<span className="email">{profile.email}</span>
					)}
				</div>
			</div>
		);
	}
}
