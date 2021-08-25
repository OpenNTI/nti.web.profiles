import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { decorate } from '@nti/lib-commons';
import { scoped } from '@nti/lib-locale';
import { Text, Flyout } from '@nti/web-commons';
import { Button } from "@nti/web-core";

import Store from '../../Store';

import Styles from './Styles.css';

const cx = classnames.bind(Styles);
const t = scoped(
	'nti-profiles.community.view.members.components.header.Label',
	{
		selected: {
			one: '%(count)s Selected',
			other: '%(count)s Selected',
		},
		members: {
			one: '%(count)s Member',
			other: '%(count)s Members',
		},
		loadingMembers: 'Members',
		removeAllMembers: 'Remove All Members',
	}
);

class CommunityMembersHeaderLabel extends React.Component {
	static propTypes = {
		selected: PropTypes.object,
		community: PropTypes.shape({
			memberCount: PropTypes.number,
		}),

		canRemoveMembers: PropTypes.bool,
		removeAllMembers: PropTypes.func,
		searchTerm: PropTypes.string,
	};

	flyout = React.createRef();

	removeAllMembers = () => {
		if (this.flyout.current) {
			this.flyout.current.dismiss();
		}

		const { removeAllMembers } = this.props;

		if (removeAllMembers) {
			removeAllMembers();
		}
	};

	render() {
		const { selected } = this.props;
		const selectedCount = selected ? Object.keys(selected).length : 0;

		return (
			<div className={cx('label')}>
				{selectedCount > 0
					? this.renderSelected()
					: this.renderMembers()}
			</div>
		);
	}

	renderSelected() {
		const { selected } = this.props;
		const selectedCount = selected ? Object.keys(selected).length : 0;

		return (
			<Text.Base className={cx('members-selected')}>
				{t('selected', { count: selectedCount })}
			</Text.Base>
		);
	}

	renderMembers() {
		const { community, canRemoveMembers, searchTerm } = this.props;
		const { memberCount } = community || {};
		const label = community
			? t('members', { count: memberCount })
			: t('loadingMembers');

		if (searchTerm) {
			return null;
		}

		if (!canRemoveMembers) {
			return <Text.Base>{label}</Text.Base>;
		}

		const trigger = (
			<Button className={cx('members-actions-button')}>...</Button>
		);

		return (
			<div className={cx('members')}>
				<Text.Base className={cx('member-count')}>{label}</Text.Base>
				<Flyout.Triggered
					ref={this.flyout}
					trigger={trigger}
					verticalAlign={Flyout.ALIGNMENTS.BOTTOM}
					horizontalAlign={Flyout.ALIGNMENTS.LEFT}
				>
					<Button
						className={cx('remove-all-members')}
						onClick={this.removeAllMembers}
					>
						<Text.Base>{t('removeAllMembers')}</Text.Base>
					</Button>
				</Flyout.Triggered>
			</div>
		);
	}
}

export default decorate(CommunityMembersHeaderLabel, [
	Store.monitor([
		'selected',
		'community',
		'canRemoveMembers',
		'removeAllMembers',
		'searchTerm',
	]),
]);
