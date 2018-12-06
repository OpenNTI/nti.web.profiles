import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {Loading, Input, EmptyState} from '@nti/web-commons';
import {scoped} from '@nti/lib-locale';

import Store from './Store';
import ListItem from './ListItem';

const t = scoped('nti-web-profiles.Selector', {
	error: 'Unable to load users.',
	errorLoadingMore: 'Unable to load more users.',
	searchPlaceholder: 'Search',
	empty: {
		searchTerm: 'There are no users. Please update your query.',
		noSearchTerm: 'Add a user name to search for users.'
	},
	loadMore: 'Load More'
});

export default
@Store.connect([
	'loading',
	'error',
	'profiles',
	'searchTerm',
	'updateSearchTerm',
	'hasMore',
	'loadingMore',
	'loadMore',
	'errorLoadingMore'
])
class ProfileSelector extends React.Component {
	static deriveBindingFromProps (props) {
		return props.collection || 'user';
	}

	static propTypes = {
		collection: PropTypes.oneOf(['users']),
		selected: PropTypes.array,
		onSelect: PropTypes.func,

		loading: PropTypes.bool,
		error: PropTypes.any,
		profiles: PropTypes.array,

		hasMore: PropTypes.bool,
		loadMore: PropTypes.func,
		loadingMore: PropTypes.bool,
		errorLoadingMore: PropTypes.any,

		searchTerm: PropTypes.string,
		updateSearchTerm: PropTypes.func
	}


	static defaultProps = {
		collection: 'users'
	}


	isSelected (profile) {
		const {selected} = this.props;

		if (!selected || !selected.length) { return false; }

		return selected.filter(p => profile === p).length > 0;
	}

	onSelect = (profile) => {
		const {onSelect} = this.props;

		if (onSelect) {
			onSelect(profile);
		}
	}


	onSearchChange = (value) => {
		const {updateSearchTerm} = this.props;

		if (updateSearchTerm) {
			updateSearchTerm(value);
		}
	}


	loadMore = () => {
		const {loadMore} = this.props;

		if (loadMore) {
			loadMore();
		}
	}


	render () {
		const {loading, error} = this.props;

		return (
			<div className="nti-profile-selector">
				{this.renderSearch()}
				{loading && (<Loading.Mask />)}
				{!loading && error && this.renderError()}
				{!loading && !error && this.renderProfiles()}
			</div>
		);
	}


	renderSearch () {
		const {searchTerm} = this.props;

		return (
			<div className="search">
				<Input.Text value={searchTerm || ''} placeholder={t('searchPlaceholder')} onChange={this.onSearchChange} />
				<i className="icon-search" />
			</div>
		);
	}


	renderError () {
		return (
			<span className="error">
				{t('error')}
			</span>
		);
	}


	renderProfiles () {
		const {profiles, hasMore, loadingMore, errorLoadingMore} = this.props;

		if (!profiles || !profiles.length) { return this.renderEmpty(); }

		return (
			<div className="profiles">
				<ul>
					{profiles.map((profile) => {
						return (
							<li key={profile.getID()}>
								<ListItem profile={profile} onSelect={this.onSelect} selected={this.isSelected(profile)} />
							</li>
						);
					})}
				</ul>
				{(hasMore || loadingMore) && !errorLoadingMore && (
					<div className={cx('load-more', {loading: loadingMore})} onClick={this.loadMore}>
						{loadingMore ? (<Loading.Spinner white />) : t('loadMore')}
					</div>
				)}
				{errorLoadingMore && (
					<span className="error">{t('errorLoadingMore')}</span>
				)}
			</div>
		);
	}


	renderEmpty () {
		const {searchTerm} = this.props;

		return (
			<EmptyState header={searchTerm ? t('empty.searchTerm') : t('empty.noSearchTerm')} />
		);
	}
}
