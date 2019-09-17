import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';
import classnames from 'classnames/bind';
import {Input, Button, Text, Prompt} from '@nti/web-commons';

import Store from '../Store';
import UserSelect from '../../../../selector';

import Styles from './Header.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.community.view.members.components.Header', {
	search: 'Search',
	remove: {
		one: 'Remove %(count)s',
		other: 'Remove %(count)s'
	},
	add: 'Add People'
});

export default
@Store.monitor(['selected', 'removeSelected', 'addMembers', 'updateSearchTerm', 'searchTerm', 'canRemoveMembers', 'canAddMembers'])
class CommunityMembersHeader extends React.Component {
	static propTypes = {
		selected: PropTypes.object,
		canRemoveMembers: PropTypes.bool,
		canAddMembers: PropTypes.bool,
		removeSelected: PropTypes.func,
		addMembers: PropTypes.func,

		updateSearchTerm: PropTypes.func,
		searchTerm: PropTypes.string
	}

	state = {}

	selectUsers = () => this.setState({showUserSelect: true})

	onUserSelect = (user) => {
		const {addMembers} = this.props;

		this.setState({showUserSelect: false});

		if (addMembers) {
			addMembers(user.getID());
		}
	}

	render () {
		const {searchTerm, updateSearchTerm, selected, removeSelected, canAddMembers, canRemoveMembers} = this.props;
		const {showUserSelect} = this.state;
		const selectedCount = selected ? Object.keys(selected).length : 0;

		return (
			<div className={cx('community-members-header')}>
				<div className={cx('search')}>
					<i className={cx('icon-search', 'search-icon')} />
					<Input.Text
						className={cx('search-input')}
						value={searchTerm}
						onChange={updateSearchTerm}
						placeholder={t('search')}
					/>
				</div>
				<div className={cx('actions')}>
					{selectedCount > 0 && canRemoveMembers && !searchTerm && (
						<Button rounded className={cx('remove-members')} onClick={removeSelected}>
							<i className={cx('icon-remove-user', 'remove-icon')} />
							<Text.Base>{t('remove', {count: selectedCount})}</Text.Base>
						</Button>
					)}
					{selectedCount === 0 && canAddMembers && !searchTerm && (
						<Button rounded secondary className={cx('add-members')} onClick={this.selectUsers}>
							<i className={cx('icon-add-user', 'add-icon')} />
							<Text.Base>{t('add')}</Text.Base>
						</Button>
					)}
				</div>
				{showUserSelect && (
					<Prompt.Dialog>
						<div className={cx('community-member-select')}>
							<UserSelect collection="users" onSelect={this.onUserSelect} />
						</div>
					</Prompt.Dialog>
				)}
			</div>
		);
	}
}