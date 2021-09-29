import React from 'react';
import PropTypes from 'prop-types';

export default class Value extends React.Component {
	static propTypes = {
		item: PropTypes.object.isRequired,
	};

	static cssClassName = 'value-col';

	render() {
		const { item } = this.props;

		if (!item.creditDefinition) {
			return null;
		}

		return <div>{item.getFormattedAmount({ unit: true })}</div>;
	}
}
