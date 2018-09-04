import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {Card} from '../../common';

export default class Group extends React.Component {

	static propTypes = {
		className: PropTypes.string
	}

	render () {
		const {className, ...props} = this.props;

		return (
			<Card className={cx('achievement-group', className)} {...props} />
		);
	}
}
