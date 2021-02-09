import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {decorate} from '@nti/lib-commons';
import {scoped} from '@nti/lib-locale';
import {Button, Text} from '@nti/web-commons';

import Store from '../../Store';

import Styles from './Styles.css';

const cx = classnames.bind(Styles);

const t = scoped('nti-profiles.community.view.members.components.header.Actions', {
	remove: 'Remove'
});

class CommunityMembersHeaderActions extends React.Component {
	static propTypes = {
		selected: PropTypes.object,
		canRemoveMembers: PropTypes.bool,
		removeSelected: PropTypes.func
	}

	render () {
		const {selected, removeSelected, canRemoveMembers} = this.props;
		const selectedCount = selected ? Object.keys(selected).length : 0;

		return (
			<div className={cx('community-header-actions')}>
				{selectedCount > 0 && canRemoveMembers && (
					<Button rounded className={cx('remove-members')} onClick={removeSelected}>
						<i className={cx('icon-remove-user', 'remove-icon')} />
						<Text.Base>{t('remove')}</Text.Base>
					</Button>
				)}
			</div>
		);
	}
}


export default decorate(CommunityMembersHeaderActions, [
	Store.monitor(['selected', 'removeSelected', 'canRemoveMembers'])
]);
