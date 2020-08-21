import './Interests.scss';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {TokenEditor} from '@nti/web-commons';

Interests.propTypes = {
	className: PropTypes.string,
	schema: PropTypes.object
};
export default function Interests ({className, schema: {readonly} = {}, ...props}) {
	return (
		<TokenEditor
			{...props}
			className={cx(className, 'nti-profile-interest-list')}
			disabled={readonly}
			tokenDelimiterKeys={['Enter', 'Tab']}
		/>
	);
}

Interests.fieldLabel = () => null;
