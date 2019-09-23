import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Input} from '@nti/web-commons';

import Styles from './View.css';
import loadSuggestions from './load-suggestions';

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.selector.token.View', {
	placeholder: 'Enter a name or email address'
});


export default class UserTokenEditor extends React.Component {
	static propTypes = {
		className: PropTypes.string,
		value: PropTypes.any,
		onChange: PropTypes.func,
		allowEveryone: PropTypes.bool
	}

	getSuggestions = (match, selected) => {
		const {allowEveryone} = this.props;

		return loadSuggestions(match, selected, allowEveryone);
	}

	render () {
		const {className, value, onChange} = this.props;

		return (
			<Input.Tokens
				light
				className={cx('user-token-select', className)}
				value={value}
				onChange={onChange}
				allowNewTokens={Input.Tokens.DO_NOT_ALLOW}
				getSuggestions={this.getSuggestions}
				placeholder={t('placeholder')}
			/>
		);
	}
}