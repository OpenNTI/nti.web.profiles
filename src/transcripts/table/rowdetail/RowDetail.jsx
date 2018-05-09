import React from 'react';
import PropTypes from 'prop-types';
import {Prompt} from '@nti/web-commons';

export default class RowDetail extends React.Component {
	static show (item) {
		return new Promise((fulfill, reject) => {
			Prompt.modal(
				<RowDetail
					item={item}
					onSave={fulfill}
					onCancel={reject}
				/>,
				'row-detail-container'
			);
		});
	}

	propTypes = {
		item: PropTypes.object.isRequired
	}

	render () {
		return <div className="transcript-row-detail">{this.props.item.title}</div>;
	}
}
