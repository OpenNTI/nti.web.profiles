import React from 'react';
import cx from 'classnames';
import {TokenEditor} from '@nti/web-commons';

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
