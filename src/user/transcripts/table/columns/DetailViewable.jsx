import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@nti/web-core';

import RowDetail from '../rowdetail/RowDetail';

export default class DetailViewable extends React.Component {
	static propTypes = {
		item: PropTypes.object.isRequired,
		children: PropTypes.object,
	};

	openWindow = () => {
		RowDetail.show(this.props.item);
	};

	render() {
		const { children } = this.props;

		return (
			<Button className="detail-viewable" onClick={this.openWindow} plain>
				{children}
			</Button>
		);
	}
}
