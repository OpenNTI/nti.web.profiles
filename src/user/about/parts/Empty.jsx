import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

Empty.propTypes = {
	className: PropTypes.string
};

export default function Empty ({className, ...props}) {
	return (
		<div className={cx(className, 'empty')} {...props}>
			<span>This user has not yet filled out their profile.</span>
		</div>
	);
}
