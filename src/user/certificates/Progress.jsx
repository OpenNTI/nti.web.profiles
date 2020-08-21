import './Progress.scss';
import React from 'react';
import PropTypes from 'prop-types';

Progress.propTypes = {
	pct: PropTypes.number
};
export default function Progress ({pct}) {
	return (
		<div className="certificate-progress-container">
			<div className="certificate-progress">
				<div className="bar" style={{width: pct + '%'}}/>
			</div>
			<div className="certificate-progress-label">
				{pct + '%'}
			</div>
		</div>
	);
}
