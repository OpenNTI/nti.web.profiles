import './View.scss';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { decorate } from '@nti/lib-commons';
import { Button } from '@nti/web-core';

import Store from '../../Store';

class AggregateTranscriptTable extends React.Component {
	static propTypes = {
		entity: PropTypes.object,
		store: PropTypes.object,
		loading: PropTypes.bool,
		aggregateItems: PropTypes.arrayOf(PropTypes.object),
	};

	state = {
		viewingMore: false,
	};

	renderRow = item => {
		return (
			<div key={item.creditDefinition.type} className="aggregate-row">
				<div className="type aggregate-cell">
					{item.creditDefinition.type}
				</div>
				<div className="amount aggregate-cell">
					{(item.amount || 0).toFixed(2)}
				</div>
			</div>
		);
	};

	viewMore = () => {
		this.setState({ viewingMore: true });
	};

	showLess = () => {
		this.setState({ viewingMore: false });
	};

	render() {
		const { viewingMore } = this.state;
		const { aggregateItems, loading } = this.props;

		const hasItems = aggregateItems && aggregateItems.length > 0;

		if (!hasItems) {
			return null;
		}

		const clsName = cx('nti-profile-transcripts-table aggregate', {
			loading,
		});

		return (
			<div className={clsName}>
				{<div className="section-title">Summary</div>}
				{(viewingMore
					? aggregateItems
					: [...aggregateItems].splice(0, 3)
				).map(this.renderRow)}
				{!viewingMore && (aggregateItems || []).length > 3 && (
					<Button className="view-more" onClick={this.viewMore} plain>
						View More
					</Button>
				)}
				{viewingMore && (
					<Button className="show-less" onClick={this.showLess} plain>
						Show Less
					</Button>
				)}
			</div>
		);
	}
}

export default decorate(AggregateTranscriptTable, [
	Store.connect({
		loading: 'loading',
		aggregateItems: 'aggregateItems',
	}),
]);
