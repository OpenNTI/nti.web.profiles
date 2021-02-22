import React from 'react';
import PropTypes from 'prop-types';
import { DateTime } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';

import Header from './Header';
import DetailViewable from './DetailViewable';

const t = scoped('nti-web-profile.transcripts.table.columns.Date', {
	headerTitle: 'Date',
});

export default class Date extends React.Component {
	static propTypes = {
		item: PropTypes.object.isRequired,
	};

	static cssClassName = 'date-col';

	static HeaderComponent = ({ store }) => (
		<Header field="date" store={store}>
			<span>{t('headerTitle')}</span>
		</Header>
	);

	render() {
		const { item } = this.props;

		if (!item.getAwardedDate) {
			return null;
		}

		const date = item.getAwardedDate();

		return (
			<DetailViewable item={this.props.item}>
				<div>{date && DateTime.format(date)}</div>
			</DetailViewable>
		);
	}
}
