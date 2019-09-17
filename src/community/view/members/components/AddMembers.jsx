import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Text} from '@nti/web-commons';

import Store from '../Store';
import {Token} from '../../../../selector';

import Styles from './AddMembers.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.community.view.members.components.AddMembers', {
	label: 'Add People'
});

export default
@Store.monitor(['canAddMembers', 'addMember'])
class AddMembers extends React.Component {
	static propTypes = {
		canAddMembers: PropTypes.bool,
		addMember: PropTypes.func
	}

	addMember = (toAdd) => {
		const first = toAdd && toAdd[0];
		const {addMember} = this.props;

		if (!first) { return; }

		if (addMember) {
			addMember(first.value);
		}
	}

	render () {
		const {canAddMembers} = this.props;

		if (!canAddMembers) { return null; }

		return (
			<div className={cx('add-members')}>
				<Text.Base className={cx('label')}>{t('label')}</Text.Base>
				<Token className={cx('user-input')} onChange={this.addMember} allowEveryone />
			</div>
		);
	}
}