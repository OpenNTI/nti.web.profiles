import React from 'react';
import PropTypes from 'prop-types';

export default class UserProfileLabelValueList extends React.Component {
	static propTypes = {
		values: PropTypes.arrayOf(
			PropTypes.shape({
				label: PropTypes.string,
				value: PropTypes.string
			})
		)
	}


	render () {
		const {values} = this.props;

		if (!values || !values.length) { return null; }

		return (
			<ul className="user-profile-label-value-list">
				{values.map((value, key) => {
					return (
						<li key={key}>
							<span className="value-label">{value.label}</span>
							<span className="value">{value.value}</span>
						</li>
					);
				})}
			</ul>
		);
	}
}
