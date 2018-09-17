import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class StringInput extends React.PureComponent {

	static propTypes = {
		className: PropTypes.string
	}

	render () {
		const {className, ...props} = this.props;
		return (
			<input className={cx('nti-profile-string-input', className)} {...props} />
		);
	}
}
