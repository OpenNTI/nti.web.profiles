import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class ProfileTranscriptFilterButton extends React.Component {
	static propTypes = {
		className: PropTypes.string,
		icon: PropTypes.node,
		display: PropTypes.node,
	};

	render() {
		const { icon, display, className, ...otherProps } = this.props;

		return (
			<div
				className={cx('profile-transcript-filter-button', className)}
				{...otherProps}
			>
				<div className="icon">{icon}</div>
				<div className="content">{display}</div>
				<i className="icon-chevron-down" />
			</div>
		);
	}
}
