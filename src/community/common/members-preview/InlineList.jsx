import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {decorate} from '@nti/lib-commons';
import {scoped} from '@nti/lib-locale';
import {Loading, User, Text} from '@nti/web-commons';

import Store from './Store';
import Styles from './InlineList.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.community.common.members-preview.InlineList', {
	remaining: '+%(remaining)s'
});

class MembersPreviewInlineList extends React.Component {
	static deriveBindingFromProps (props) {
		return {
			community: props.community,
			max: props.max
		};
	}

	static propTypes = {
		className: PropTypes.string,
		community: PropTypes.object,
		max: PropTypes.number,

		loading: PropTypes.bool,
		error: PropTypes.any,
		members: PropTypes.array,
		remaining: PropTypes.number
	}

	render () {
		const {className, loading, error, members, remaining} = this.props;

		//Just don't render anything if we can't load members
		if (error) { return null; }

		return (
			<div className={cx('community-membership-preview-inline-list', className, {loading})}>
				<Loading.Placeholder loading={loading} fallback={(<Loading.Spinner />)}>
					{this.renderMembers(members, remaining)}
				</Loading.Placeholder>
			</div>
		);
	}

	renderMembers (members, remaining) {
		if (!members || !members.length) { return null; }

		return (
			<ul className={cx('list')}>
				{members.map((member) => {
					return (
						<li key={member.getID()}>
							<User.Avatar user={member} />
						</li>
					);
				})}
				{
					!remaining ?
						null :
						(<li className={cx('remaining')}><Text.Base>{t('remaining', {remaining})}</Text.Base></li>)
				}
			</ul>
		);
	}
}


export default decorate(MembersPreviewInlineList, [
	Store.connect(['loading', 'error', 'members', 'remaining'])
]);
