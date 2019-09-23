import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Text, DialogButtons, Loading} from '@nti/web-commons';

import Store from '../Store';
import {Token} from '../../../../selector';

import Styles from './AddMembers.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.community.view.members.components.AddMembers', {
	label: 'Add People',
	addEveryone: 'Add Everyone',
	addMembers: 'Add %(memberCount)s',
	cancel: 'Cancel'
});

function getButtonLabel (toAdd) {
	const hasEveryone = (toAdd || []).some((add) => add.value.getID() === 'everyone');

	if (hasEveryone) { return t('addEveryone'); }

	return t('addMembers', {memberCount: (toAdd || []).length});
}

export default
@Store.monitor(['pending', 'canAddMembers', 'addPendingMembers', 'setPendingMembers', 'adding'])
class AddMembers extends React.Component {
	static propTypes = {
		adding: PropTypes.bool,
		pending: PropTypes.array,
		canAddMembers: PropTypes.bool,
		addPendingMembers: PropTypes.func,
		setPendingMembers: PropTypes.func
	}

	selectMemember = (toAdd) => this.setState({toAdd});

	clearSelected = () => {
		const {setPendingMembers} = this.props;

		if (setPendingMembers) {
			setPendingMembers([]);
		}
	} 

	render () {
		const {canAddMembers, adding, pending, setPendingMembers, addPendingMembers} = this.props;

		if (!canAddMembers) { return null; }

		const buttons = [
			{label: t('cancel'), onClick: this.clearSelected},
			{label: getButtonLabel(pending), onClick: addPendingMembers}
		];

		return (
			<div className={cx('add-members', {'has-selection': pending && pending.length > 0})}>
				<Text.Base className={cx('label')}>{t('label')}</Text.Base>
				<Loading.Placeholder loading={adding} delay={0} fallback={(<Loading.Spinner />)}>
					<Token className={cx('user-input')} value={pending} onChange={setPendingMembers} allowEveryone />
					<DialogButtons buttons={buttons} flat />
				</Loading.Placeholder>
			</div>
		);
	}
}