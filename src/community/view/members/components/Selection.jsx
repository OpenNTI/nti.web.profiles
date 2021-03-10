import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { decorate } from '@nti/lib-commons';
import { scoped } from '@nti/lib-locale';
import { User, Text } from '@nti/web-commons';

import Store from '../Store';

import Styles from './Selection.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.community.view.members.components.Selection', {
	clear: 'Clear Selection',
});

class CommunityMembersHeaderSelection extends React.Component {
	static propTypes = {
		selected: PropTypes.object,
		clearSelected: PropTypes.func,
	};

	render() {
		const { selected, clearSelected } = this.props;

		if (!selected || !Object.keys(selected).length) {
			return null;
		}

		const users = Object.values(selected);

		return (
			<div className={cx('members-selection')}>
				<ul className={cx('selected')}>
					{users.map(u => {
						return (
							<li key={u.getID()}>
								<User.DisplayName user={u} />
							</li>
						);
					})}
				</ul>
				<Text.Base className={cx('clear')} onClick={clearSelected}>
					{t('clear')}
				</Text.Base>
			</div>
		);
	}
}

export default decorate(CommunityMembersHeaderSelection, [
	Store.monitor(['selected', 'clearSelected']),
]);
