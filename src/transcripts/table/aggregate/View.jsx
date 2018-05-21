import React from 'react';
import PropTypes from 'prop-types';
import {Loading} from '@nti/web-commons';

import Store from '../../Store';

export default
@Store.connect({
	loading: 'loading',
	aggregateItems: 'aggregateItems'
})
class AggregateTranscriptTable extends React.Component {
	static propTypes = {
		entity: PropTypes.object,
		store: PropTypes.object,
		loading: PropTypes.bool,
		aggregateItems: PropTypes.arrayOf(PropTypes.object)
	}

	state = {
		viewingMore: false
	}

	renderRow = (item) => {
		return (
			<div key={item.creditDefinition.type} className="aggregate-row">
				<div className="type aggregate-cell">{item.creditDefinition.type}</div>
				<div className="amount aggregate-cell">{item.amount}</div>
			</div>
		);
	}

	viewMore = () => {
		this.setState({viewingMore: true});
	}

	showLess = () => {
		this.setState({viewingMore: false});
	}

	render () {
		const {viewingMore} = this.state;
		const {loading, aggregateItems} = this.props;

		if(loading) {
			return <Loading.Ellipsis/>;
		}

		if(!aggregateItems || aggregateItems.length === 0) {
			return null;
		}

		return (
			<div className="nti-profile-transcripts-table aggregate">
				<div className="section-title">Summary</div>
				{(viewingMore ? aggregateItems : [...aggregateItems].splice(0, 3)).map(this.renderRow)}
				{!viewingMore && aggregateItems.length > 3 && <div className="view-more" onClick={this.viewMore}>View More</div>}
				{viewingMore && <div className="show-less" onClick={this.showLess}>Show Less</div>}
			</div>
		);
	}
}
