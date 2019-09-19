import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {LinkTo} from '@nti/web-routing';
import {Input, Text, Button, Prompt} from '@nti/web-commons';

import Styles from './Delete.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.community.edit.inputs.Delete', {
	label: 'Remove Community',
	description: 'This community will no longer be visible, accessible, or searchable by anyone. Don\'t do this for fun—you\'ll regret it.',
	button: 'Remove Community',
	prompt: {
		title: 'Are you sure?',
		message: 'Contact support if you regret this decision.'
	}
});

export default class CommunityDeleteInput extends React.Component {
	static propTypes = {
		className: PropTypes.string,
		community: PropTypes.shape({
			canDelete: PropTypes.bool,
			delete: PropTypes.func
		}),
		afterDelete: PropTypes.func
	}

	state = {unlocked: false}

	setUnlocked = (checked) => {
		this.setState({
			unlocked: checked
		});
	}

	removeCommunity = async () => {
		const {community, afterDelete} = this.props;

		try {
			await Prompt.areYouSure(t('prompt.message'), t('prompt.title'));
			await community.delete();
			
			if (afterDelete) {
				afterDelete();
			} else {
				LinkTo.Static.goHome();
			}
		} catch (e) {
			//swallow
		}
	}

	render () {
		const {className, community} = this.props;
		const {unlocked} = this.state;

		if (!community.canDelete) { return null; }

		return (
			<div className={cx('community-delete', className, {locked: !unlocked})}>
				<div className={cx('field')}>
					<div className={cx('message')}>
						<Text.Base className={cx('label')}>{t('label')}</Text.Base>
						<Text.Base className={cx('description')}>{t('description')}</Text.Base>
					</div>
					<Input.Toggle value={unlocked} onChange={this.setUnlocked} hideLabel />
				</div>
				<div className={cx('lock-box')}>
					<Button className={cx('remove-button')} rounded onClick={this.removeCommunity}>
						<Text.Base>{t('button')}</Text.Base>
					</Button>
				</div>
			</div>
		);
	}
}

