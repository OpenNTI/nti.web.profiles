import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';

import DetailViewable from './DetailViewable';

const t = scoped('nti-web-profile.transcripts.table.columns.Title', {
	headerTitle: 'Title'
});

export default class Title extends React.Component {
	static propTypes = {
		item: PropTypes.object.isRequired
	}

	static cssClassName = 'title-col';

	static HeaderComponent = ({store}) => (
		<div>{t('headerTitle')}</div>
	);

	render () {
		return <DetailViewable item={this.props.item}><div className="transcript-row-title">{this.props.item.title}</div></DetailViewable>;
	}
}
