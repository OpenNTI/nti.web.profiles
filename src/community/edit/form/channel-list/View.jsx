import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Text} from '@nti/web-commons';

import FormStore from '../../Store';
import Channel from '../channel';

import Styles from './Style.css';
import ChannelListStore from './Store';

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.community.edit.form.channel-list.View', {
	channels: 'Channels'
});

export default
@FormStore.monitor(['register', 'unregister'])
@ChannelListStore.connect([
	'pinnedChannels',
	'sortableChannels',
	'setOrder',
	'addNewChannel'
])
class ChannelListField extends React.Component {
	static deriveBindingFromProps (props) {
		return {
			channelList: props.channelList,
			register: props.register,
			unregister: props.unregister
		};
	}

	static propTypes = {
		channelList: PropTypes.object,
		only: PropTypes.bool,

		pinnedChannels: PropTypes.array,
		sortableChannels: PropTypes.array
	}


	render () {
		const {channelList, only, pinnedChannels, sortableChannels} = this.props;

		if (!channelList) { return null; }

		const {label} = channelList;
		const display = label || (only ? t('channels') : '');

		return (
			<div className={cx('channel-list')}>
				{display && (<Text.Base className={cx('label')}>{display}</Text.Base>)}
				{this.renderPinned(pinnedChannels)}
				{this.renderSortable(sortableChannels)}
			</div>
		);
	}


	renderPinned (channels) {
		if (!channels || !channels.length) { return null; }
		
		return (
			<ol className={cx('channels')}>
				{channels.map((channel) => {
					return (
						<li key={channel.getID()}>
							{this.renderChannel(channel)}
						</li>
					);
				})}
			</ol>
		);
	}


	renderSortable (channels) {
		if (!channels || !channels.length) { return null; }

		//TODO: make this sortable

		return (
			<ol className={cx('channels')}>
				{channels.map((channel) => {
					return (
						<li key={channel.getID()}>
							{this.renderChannel(channel)}
						</li>
					);
				})}
			</ol>
		);
	}


	renderChannel (channel) {
		return (
			<Channel channel={channel} />
		);
	}
}