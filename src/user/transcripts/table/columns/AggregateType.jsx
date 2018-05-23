import React from 'react';
import PropTypes from 'prop-types';

export default class Type extends React.Component {
	static propTypes = {
		item: PropTypes.object.isRequired
	}

	static cssClassName = 'type-col';

	render () {
		const {item} = this.props;

		return <div>{item.creditDefinition && item.creditDefinition.type}</div>;
	}
}
