import React from 'react';
import PropTypes from 'prop-types';

import { scoped } from '@nti/lib-locale';

import UserAwardedCredit from '../../userawarded/View';

import DetailViewable from './DetailViewable';

const t = scoped('nti-web-profile.transcripts.table.columns.Title', {
	headerTitle: 'Title',
});

export default class Title extends React.Component {
	static propTypes = {
		item: PropTypes.object.isRequired,
		store: PropTypes.object.isRequired,
	};

	static cssClassName = 'title-col';

	static HeaderComponent = ({ store }) => <div>{t('headerTitle')}</div>;

	launchUserAwardedEditor = () => {
		UserAwardedCredit.show(
			this.props.store.getEntity(),
			null,
			this.props.store
		);
	};

	render() {
		if (this.props.item.isAddRow) {
			return (
				<div
					className="transcript-add-row"
					onClick={this.launchUserAwardedEditor}
				>
					<div className="add-icon">
						<i className="icon-add" />
					</div>
					<div className="add-label">Add Credit</div>
				</div>
			);
		}

		return (
			<DetailViewable item={this.props.item}>
				<div className="transcript-row-title">
					{this.props.item.title}
				</div>
			</DetailViewable>
		);
	}
}
