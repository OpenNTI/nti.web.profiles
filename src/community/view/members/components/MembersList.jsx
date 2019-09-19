import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Errors, EmptyState, Loading} from '@nti/web-commons';

import Store from '../Store';

import Styles from './MembersList.css';
import Member from './Member';

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.community.view.members.components.MembersList', {
	empty: {
		noSearch: 'There are no members in this community.',
		search: 'There are no members matching "%(searchTerm)s".'
	}
});

export default
@Store.monitor(['loading', 'items', 'error', 'searchTerm', 'searching'])
class CommunityMemberShipList extends React.Component {
	static propTypes = {
		loading: PropTypes.bool,
		items: PropTypes.array,
		selected: PropTypes.object,
		error: PropTypes.any,
		searchTerm: PropTypes.string,
		searching: PropTypes.bool
	}


	render () {
		const {items, loading, error, searchTerm, searching} = this.props;

		if (!items && searching) {
			return (
				<div className={cx('members-list-searching')}>
					<Loading.Spinner />
				</div>
			);
		}

		if (!items || !items.length) {
			return (
				<EmptyState header={searchTerm ? t('empty.search', {searchTerm}) : t('empty.noSearch')} />
			);
		}

		return (
			<ul className={cx('community-member-list')}>
				{items.map((item) => {
					const id = item.getID();

					return (
						<li key={id}>
							<Member member={item} />
						</li>
					);
				})}
				{loading && (
					<li className={cx('loading')}>
						<Loading.Spinner />
					</li>
				)}
				{error && (
					<li className={cx('error-item')}>
						<Errors.Message error={error} />
					</li>
				)}
			</ul>
		);
	}
}