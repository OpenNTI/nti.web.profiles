import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { decorate } from '@nti/lib-commons';
import { scoped } from '@nti/lib-locale';
import { Checkbox, Text, Flyout } from '@nti/web-commons';
import { Button } from '@nti/web-core';
import { LinkTo } from '@nti/web-routing';

import Store from '../Store';
import { ListItem } from '../../../../identity';

import Styles from './Member.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.community.view.members.components.Member', {
	viewProfile: 'View Profile',
	remove: 'Remove',
});

class CommunityMember extends React.Component {
	static propTypes = {
		member: PropTypes.object,

		selected: PropTypes.object,
		toggleMemberSelected: PropTypes.func,
		canRemoveMembers: PropTypes.bool,
		removeMember: PropTypes.func,
	};

	flyout = React.createRef();

	select = () => {
		const { member, toggleMemberSelected } = this.props;

		if (toggleMemberSelected) {
			toggleMemberSelected(member);
		}
	};

	removeMember = () => {
		const { member, removeMember } = this.props;

		if (removeMember) {
			removeMember(member);
		}
	};

	render() {
		const { canRemoveMembers, member } = this.props;
		const memberCmp = this.renderMember();

		if (!canRemoveMembers) {
			return <LinkTo.Object object={member}>{memberCmp}</LinkTo.Object>;
		}

		return memberCmp;
	}

	renderMember() {
		const { member, selected, canRemoveMembers } = this.props;
		const isSelected = selected && selected[member.getID()];

		return (
			<div className={cx('community-member', { selected: isSelected })}>
				{canRemoveMembers && (
					<Checkbox checked={!!isSelected} onChange={this.select} />
				)}
				<ListItem className={cx('member-identity')} entity={member} />
				{canRemoveMembers && (
					<Flyout.Triggered
						ref={this.flyout}
						trigger={
							<span className={cx('actions-trigger')}>...</span>
						}
						verticalAlign={Flyout.ALIGNMENTS.BOTTOM}
						horizontalAlign={Flyout.ALIGNMENTS.RIGHT}
					>
						<ul className={cx('member-actions')}>
							<li>
								<LinkTo.Object
									object={member}
									className={cx('member-action')}
								>
									<Text.Base>{t('viewProfile')}</Text.Base>
								</LinkTo.Object>
							</li>
							<li>
								<Button
									className={cx(
										'remove-member',
										'member-action'
									)}
									onClick={this.removeMember}
								>
									<Text.Base>{t('remove')}</Text.Base>
								</Button>
							</li>
						</ul>
					</Flyout.Triggered>
				)}
			</div>
		);
	}
}

export default decorate(CommunityMember, [
	Store.monitor([
		'selected',
		'toggleMemberSelected',
		'removeMember',
		'canRemoveMembers',
	]),
]);
