import React from 'react';
import PropTypes from 'prop-types';
import {Input} from '@nti/web-commons';
import cx from 'classnames';

export default class UriInput extends React.PureComponent {

	static propTypes = {
		className: PropTypes.string,
		schema: PropTypes.object,
		onChange: PropTypes.func
	}

	// replace empty string value with null. the server will throw an error
	// on empty strings for fields checked against a pattern (e.g. email, url)
	onChange = value => this.props.onChange(value || null);

	render () {
		const {className, schema: {readonly} = {}, ...props} = this.props;

		return (
			<Input.URL className={cx('nti-profile-uri-input', className)} {...props} onChange={this.onChange} disabled={readonly} />
		);
	}
}
