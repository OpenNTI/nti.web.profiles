import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Prompt} from '@nti/web-commons';

import Styles from './Modal.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.community.view.members.Modal', {
	title: {
		loading: 'Members',
		loaded: {
			one: '%(count)s Member',
			other: '%(count)s Members'
		}
	}
});

export default
class CommunityMemebersModal extends React.Component {
	static propTypes = {
		community: PropTypes.object,
		doClose: PropTypes.func
	}


	render () {
		const {doClose} = this.props;

		return (
			<Prompt.BaseWindow title={t('title.loading')} doClose={doClose}>
				<div className={cx('community-members-modal')}>
					Community Modal
				</div>
			</Prompt.BaseWindow>
		);
	}
}