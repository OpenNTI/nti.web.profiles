import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Text, Button, Flyout} from '@nti/web-commons';

import Store from '../../Store';

import Styles from './Styles.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.community.view.members.components.header.Label', {
	selected: {
		one: '%(count)s Selected',
		other: '%(count)s Selected'
	},
	members: {
		one: '%(count)s Member',
		other: '%(count)s Members'
	},
	loadingMembers: 'Members',
	removeAllMembers: 'Remove All Members'
});

export default
@Store.monitor(['selected', 'community', 'canRemoveMembers', 'removeAllMembers'])
class CommunityMembersHeaderLabel extends React.Component {
	static propTypes = {
		selected: PropTypes.object,
		community: PropTypes.shape({
			memberCount: PropTypes.number
		}),

		canRemoveMembers: PropTypes.bool,
		removeAllMembers: PropTypes.func
	}

	flyout = React.createRef()

	removeAllMembers = () => {
		if (this.flyout.current) {
			this.flyout.current.dismiss();
		}

		const {removeAllMembers} = this.props;

		if (removeAllMembers) {
			removeAllMembers();
		}
	}

	render () {
		const {selected} = this.props;
		const selectedCount = selected ? Object.keys(selected).length : 0;

		return (
			<div className={cx('label')}>
				{selectedCount > 0 ? this.renderSelected() : this.renderMembers()}
			</div>
		);
	}

	renderSelected () {
		const {selected} = this.props;
		const selectedCount = selected ? Object.keys(selected).length : 0;

		return (
			<Text.Base className={cx('members-selected')}>{t('selected', {count: selectedCount})}</Text.Base>
		);
	}

	renderMembers () {
		const {community, canRemoveMembers} = this.props;
		const {memberCount} = community || {};
		const label = community ? t('members', {count: memberCount}) : t('loadingMembers');

		if (!canRemoveMembers) { return (<Text.Base>{label}</Text.Base>); }

		const trigger = (
			<Button className={cx('members-actions-button')}>
				{label}
				<i className={cx('icon-chevron-down', 'members-actions-icon')} />
			</Button>
		);

		return (
			<Flyout.Triggered
				ref={this.flyout}
				trigger={trigger}
				verticalAlign={Flyout.ALIGNMENTS.BOTTOM}
				horizontalAlign={Flyout.ALIGNMENTS.LEFT}
			>
				<Button className={cx('remove-all-members')} onClick={this.removeAllMembers}>
					<Text.Base>{t('removeAllMembers')}</Text.Base>
				</Button>
			</Flyout.Triggered>
		);
	}
}

