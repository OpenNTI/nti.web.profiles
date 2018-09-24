import React from 'react';
import PropTypes from 'prop-types';
import {Input} from '@nti/web-commons';
import cx from 'classnames';

export default class StringInput extends React.PureComponent {

	static propTypes = {
		className: PropTypes.string,
		readonly: PropTypes.bool,
		onChange: PropTypes.func
	}

	render () {
		const {className, schema: {readonly} = {}, ...props} = this.props;

		return (
			<Input.URL className={cx('nti-profile-uri-input', className)} {...props} disabled={readonly} />
		);
	}
}
