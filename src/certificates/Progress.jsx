import React from 'react';
import PropTypes from 'prop-types';

Progress.propTypes = {
	pct: PropTypes.number
};
export default function Progress ({pct}) {
	return (
		<div className="progress-container">
			<div className="progress">
				<div className="bar" style={{width: pct + '%'}}/>
			</div>
			<div className="progress-label">
				{pct + '%'}
			</div>
		</div>
	);
}
