import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { decorate } from '@nti/lib-commons';
import { scoped } from '@nti/lib-locale';
import { Prompt, Layouts, Loading, Error as ErrorCmp } from '@nti/web-commons';

import Styles from './Modal.css';
import Store from './Store';
import AddMember from './components/AddMembers';
import Header from './components/header';
import MembersList from './components/MembersList';
import Selection from './components/Selection';

const { InfiniteScroll } = Layouts;
const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.community.view.members.Modal', {
	title: {
		view: 'Members',
		manage: 'Manage Members',
	},
	removing: 'Removing...',
});

class CommunityMembersModal extends React.Component {
	static deriveBindingFromProps(props) {
		return {
			community: props.community,
		};
	}

	static propTypes = {
		community: PropTypes.object,
		doClose: PropTypes.func,

		items: PropTypes.array,
		loading: PropTypes.bool,
		removing: PropTypes.bool,
		error: PropTypes.any,
		loadMore: PropTypes.func,
		searchTerm: PropTypes.string,
	};

	render() {
		const {
			community,
			doClose,
			items,
			loading,
			removing,
			error,
			searchTerm,
			loadMore,
		} = this.props;
		const isLoading = loading;
		const initial = !items && !searchTerm;
		const errored = initial && error;

		const title = community.canManageMembers
			? t('title.manage')
			: t('title.view');

		return (
			<Prompt.BaseWindow
				title={title}
				doClose={doClose}
				className={cx('community-members-modal')}
			>
				<AddMember />
				<Header />
				<Selection />
				<div className={cx('community-members-modal-body')}>
					<Loading.Placeholder
						loading={isLoading && initial}
						fallback={<Loading.Spinner.Large />}
					>
						<InfiniteScroll.Continuous
							loadMore={loadMore}
							buffer={200}
						>
							{errored && <ErrorCmp error={error} />}
							{!errored && <MembersList />}
						</InfiniteScroll.Continuous>
					</Loading.Placeholder>
				</div>
				<Loading.Overlay loading={removing} label={t('removing')} />
			</Prompt.BaseWindow>
		);
	}
}

export default decorate(CommunityMembersModal, [
	Store.connect([
		'loading',
		'removing',
		'items',
		'error',
		'hasMore',
		'loadMore',
		'searchTerm',
	]),
]);
