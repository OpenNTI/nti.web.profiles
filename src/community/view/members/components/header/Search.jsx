import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { decorate } from '@nti/lib-commons';
import { scoped } from '@nti/lib-locale';
import { Input } from '@nti/web-commons';

import Store from '../../Store';

import Styles from './Styles.css';

const cx = classnames.bind(Styles);
const t = scoped(
	'nti-profiles.community.view.members.components.header.Search',
	{
		search: 'Search',
	}
);

class CommunityMembersHeaderSearch extends React.Component {
	static propTypes = {
		searchTerm: PropTypes.string,
		updateSearchTerm: PropTypes.func,
	};

	render() {
		const { searchTerm, updateSearchTerm } = this.props;

		return (
			<div className={cx('search')}>
				<i className={cx('icon-search', 'search-icon')} />
				<Input.Text
					className={cx('search-input')}
					value={searchTerm}
					onChange={updateSearchTerm}
					placeholder={t('search')}
				/>
			</div>
		);
	}
}

export default decorate(CommunityMembersHeaderSearch, [
	Store.monitor(['searchTerm', 'updateSearchTerm']),
]);
