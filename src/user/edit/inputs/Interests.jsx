import React from 'react';
import cx from 'classnames';
import {TokenEditor} from '@nti/web-commons';

export default function Interests ({className, ...props}) {
	return (
		<TokenEditor {...props} className={cx(className, 'nti-profile-interest-list')} />
	);
}

Interests.fieldLabel = () => null;
