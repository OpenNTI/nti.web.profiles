import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {User, Checkbox, Text, Flyout, Button} from '@nti/web-commons';
import {LinkTo} from '@nti/web-routing';

import Store from '../Store';

import Styles from './Member.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.community.view.members.components.Member', {
	viewProfile: 'View Profile',
	remove: 'Remove'
});

export default
@Store.monitor(['selected', 'toggleMemberSelected', 'removeMember', 'canRemoveMembers'])
class CommunityMember extends React.Component {
	static propTypes = {
		member: PropTypes.object,

		selected: PropTypes.object,
		toggleMemberSelected: PropTypes.func,
		canRemoveMembers: PropTypes.bool,
		removeMember: PropTypes.func
	}

	flyout = React.createRef()

	select = () => {
		const {member, toggleMemberSelected} = this.props;

		if (toggleMemberSelected) {
			toggleMemberSelected(member.getID());
		}
	}


	removeMember = () => {
		const {member, removeMember} = this.props;

		if (removeMember) {
			removeMember(member.getID());
		}
	}


	render () {
		const {canRemoveMembers, member} = this.props;
		const memberCmp = this.renderMember();

		if (!canRemoveMembers) {
			return (
				<LinkTo.Object object={member}>
					{memberCmp}
				</LinkTo.Object>
			);
		}

		return memberCmp;
	}


	renderMember () {
		const {member, selected, canRemoveMembers} = this.props;
		const isSelected = selected && selected[member.getID()];

		return (
			<div className={cx('community-member', {selected: isSelected})}>
				{canRemoveMembers && (<Checkbox checked={isSelected} onChange={this.select} />)}
				<div className={cx('avatar-container')}>
					<User.Avatar user={member} className={cx('member-avatar')} />
					<User.Presence user={member} border className={cx('member-presence')} />
				</div>
				<div className={cx('meta')}>
					<Text.Base>
						<User.DisplayName user={member} className={cx('member-name')} />
					</Text.Base>
					{member.email && (
						<Text.Base className={cx('member-email')}>
							{member.email}
						</Text.Base>
					)}
				</div>
				{canRemoveMembers && (
					<Flyout.Triggered
						ref={this.flyout}
						trigger={(<span className={cx('actions-trigger')}>...</span>)}
						verticalAlign={Flyout.ALIGNMENTS.BOTTOM}
						horizontalAlign={Flyout.ALIGNMENTS.RIGHT}
					>
						<ul className={cx('member-actions')}>
							<li>
								<LinkTo.Object object={member} className={cx('member-action')}>
									<Text.Base>{t('viewProfile')}</Text.Base>
								</LinkTo.Object>
							</li>
							<li>
								<Button className={cx('remove-member', 'member-action')} onClick={this.removeMember}>
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