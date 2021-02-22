import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { decorate } from '@nti/lib-commons';
import { scoped } from '@nti/lib-locale';
import { Text, DialogButtons, Loading, Prompt } from '@nti/web-commons';

import Store from '../Store';
import { Token } from '../../../../selector';

import Styles from './AddMembers.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.community.view.members.components.AddMembers', {
	label: 'Add People',
	addEveryone: 'Add Everyone',
	addMembers: 'Add %(memberCount)s',
	cancel: 'Cancel',
	confirm: {
		title: 'Are you sure?',
		message:
			'Adding everyone will add every user in the site to "%(community)s". Undoing this action will require manually removing each person.',
	},
});

function getButtonLabel(toAdd) {
	const hasEveryone = (toAdd || []).some(
		add => add.value.getID() === 'everyone'
	);

	if (hasEveryone) {
		return t('addEveryone');
	}

	return t('addMembers', { memberCount: (toAdd || []).length });
}

class AddMembers extends React.Component {
	static propTypes = {
		adding: PropTypes.bool,
		pending: PropTypes.array,
		canAddMembers: PropTypes.bool,
		addPendingMembers: PropTypes.func,
		setPendingMembers: PropTypes.func,
		community: PropTypes.shape({
			displayName: PropTypes.string,
		}),
	};

	addMembers = async () => {
		const { pending, addPendingMembers, community } = this.props;

		if (!addPendingMembers) {
			return;
		}

		const hasEveryone = (pending || []).some(
			p => p.value.getID() === 'everyone'
		);

		if (!hasEveryone) {
			return addPendingMembers();
		}

		try {
			await Prompt.areYouSure(
				t('confirm.message', { community: community.displayName }),
				t('confirm.title')
			);

			addPendingMembers();
		} catch (e) {
			//swallow
		}
	};

	clearSelected = () => {
		const { setPendingMembers } = this.props;

		if (setPendingMembers) {
			setPendingMembers([]);
		}
	};

	render() {
		const {
			canAddMembers,
			adding,
			pending,
			setPendingMembers,
		} = this.props;

		if (!canAddMembers) {
			return null;
		}

		const buttons = [
			{ label: t('cancel'), onClick: this.clearSelected },
			{ label: getButtonLabel(pending), onClick: this.addMembers },
		];

		return (
			<div
				className={cx('add-members', {
					'has-selection': pending && pending.length > 0,
				})}
			>
				<Text.Base className={cx('label')}>{t('label')}</Text.Base>
				<Loading.Placeholder
					loading={adding}
					delay={0}
					fallback={<Loading.Spinner />}
				>
					<Token
						className={cx('user-input')}
						value={pending}
						onChange={setPendingMembers}
						allowEveryone
					/>
					<DialogButtons buttons={buttons} flat />
				</Loading.Placeholder>
			</div>
		);
	}
}

export default decorate(AddMembers, [
	Store.monitor([
		'community',
		'pending',
		'canAddMembers',
		'addPendingMembers',
		'setPendingMembers',
		'adding',
	]),
]);
