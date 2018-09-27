import React from 'react';
import PropTypes from 'prop-types';
import {Input} from '@nti/web-commons';
import cx from 'classnames';

export default class StringInput extends React.PureComponent {

	static propTypes = {
		className: PropTypes.string,
		readonly: PropTypes.bool,
		schema: PropTypes.object,
		onChange: PropTypes.func,
		onInvalid: PropTypes.func
	}

	render () {
		const {className, schema: {readonly} = {}, ...props} = this.props;

		return (
			<Input.Text className={cx('nti-profile-string-input', className)} {...props} disabled={readonly} />
		);
	}
}
