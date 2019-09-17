import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Prompt, Layouts, Loading, Error as ErrorCmp} from '@nti/web-commons';

import Styles from './Modal.css';
import Store from './Store';
import Header from './components/Header';
import MembersList from './components/MembersList';

const {InfiniteScroll} = Layouts;
const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.community.view.members.Modal', {
	title: {
		loading: 'Members',
		loaded: {
			one: '%(count)s Member',
			other: '%(count)s Members'
		}
	}
});

export default
@Store.connect(['loading', 'items', 'error', 'hasMore', 'loadMore', 'searchTerm'])
class CommunityMemebersModal extends React.Component {
	static deriveBindingFromProps (props) {
		return {
			community: props.community
		};
	}

	static propTypes = {
		community: PropTypes.object,
		doClose: PropTypes.func,

		items: PropTypes.array,
		loading: PropTypes.bool,
		error: PropTypes.any,
		loadMore: PropTypes.func,
		searchTerm: PropTypes.string
	}


	render () {
		const {doClose, items, loading, error, searchTerm, loadMore} = this.props;
		const initial = !items && !searchTerm;
		const errored = initial && error;

		return (
			<Prompt.BaseWindow title={t('title.loading')} doClose={doClose} className={cx('community-members-modal')}>
				<Loading.Placeholder loading={loading && initial} fallback={<Loading.Spinner.Large />}>
					<InfiniteScroll.Continuous loadMore={loadMore} buffer={200}>
						<Header />
						{errored && (<ErrorCmp error={error} />)}
						{!errored && (<MembersList />) }
					</InfiniteScroll.Continuous>
				</Loading.Placeholder>
			</Prompt.BaseWindow>
		);
	}
}