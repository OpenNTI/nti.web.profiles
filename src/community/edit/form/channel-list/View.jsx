import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {decorate} from '@nti/lib-commons';
import {scoped} from '@nti/lib-locale';
import {Text, DnD} from '@nti/web-commons';

import FormStore from '../../Store';
import Channel from '../channel';

import Styles from './Style.css';
import ChannelListStore from './Store';
import CreateChannel from './CreateChannel';

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.community.edit.form.channel-list.View', {
	channels: 'Channels'
});

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
		sortableChannels: PropTypes.array,
		moveChannel: PropTypes.func
	}


	onOrderChange = (original, updated) => {
		const {moveChannel} = this.props;

		if (moveChannel) {
			moveChannel(original, updated);
		}
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
				<CreateChannel />
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
							<Channel channel={channel} />
						</li>
					);
				})}
			</ol>
		);
	}


	renderSortable (channels) {
		if (!channels || !channels.length) { return null; }

		return (
			<DnD.Sortable
				items={channels}
				onMove={this.onOrderChange}
				renderer={this.renderSortableChannel}
			/>
		);
	}


	renderSortableChannel = (channel, props) => {
		return (
			<DnD.Item customHandle key={channel.getID()} {...props}>
				<Channel channel={channel} />
			</DnD.Item>
		);
	}
}

export default decorate(ChannelListField, [
	FormStore.monitor(['register', 'unregister']),
	ChannelListStore.connect([
		'pinnedChannels',
		'sortableChannels',
		'moveChannel'
	])
]);
