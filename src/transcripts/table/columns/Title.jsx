import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';

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
		return <div>{this.props.item.title}</div>;
	}
}
