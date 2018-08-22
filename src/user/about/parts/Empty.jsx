import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {Card} from '../../../common';

Empty.propTypes = {
	className: PropTypes.string
};

export default function Empty ({className, ...props}) {
	return (
		<Card className={cx(className, 'empty')} {...props}>
			<span>This user has not yet filled out their profile.</span>
		</Card>
	);
}
