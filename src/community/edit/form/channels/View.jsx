import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Text} from '@nti/web-commons';

import Store from '../../Store';

import Styles from './View.css';
import List from './List';

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.community.edit.form.channels.View', {
	label: 'Channels'
});

export default
@Store.monitor(['channelList', 'setChannelList', 'channelListErrors'])
class ChannelListField extends React.Component {
	static propTypes = {
		channelList: PropTypes.array,
		setChannelList: PropTypes.func,
		channelListErrors: PropTypes.object
	}


	onListChange = (list) => {
		const {channelList, setChannelList} = this.props;

		if (setChannelList) {
			setChannelList(
				channelList.map(old => old.id === list.id ? list : old)
			);
		}
	}


	render () {
		const {channelList, channelListErrors} = this.props;

		if (!channelList) { return null; }

		return (
			<div className={cx('channel-lists')}>
				<Text.Base className={cx('label')}>
					{t('label')}
				</Text.Base>
				<ul className={cx('channels')}>
					{channelList.map((list) => {
						const {id} = list;

						return (
							<li key={list.id}>
								<List
									list={list}
									onChange={this.onListChange}
									errors={channelListErrors && channelListErrors[id]}
								/>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}