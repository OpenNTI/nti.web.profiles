import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Text} from '@nti/web-commons';

import Styles from './List.css';
import Channel from './Channel';

const cx = classnames.bind(Styles);

export default class ChannelsFieldList extends React.Component {
	static propTypes = {
		list: PropTypes.shape({
			label: PropTypes.string,
			channels: PropTypes.object,
			order: PropTypes.arrayOf(PropTypes.string)
		}),
		onChange: PropTypes.func,
		errors: PropTypes.object
	}

	state = {sortable: [], pinned: []}

	componentDidMount () {
		this.setup();
	}

	componentDidUpdate (prevProps) {
		const {list} = this.props;
		const {list:prevList} = prevProps;

		if (list !== prevList) {
			this.setup();
		}
	}


	setup () {
		const {list} = this.props;
		const {order, channels} = list;

		const {sortable, pinned} = order.reduce((acc, channelId) => {
			const channel = channels[channelId];

			if (channel.pinned) {
				acc.pinned.push(channel);
			} else {
				acc.sortable.push(channel);
			}

			return acc;
		}, {sortable: [], pinned: []});

		this.setState({
			sortable,
			pinned
		});
	}

	onChannelChange = (channel) => {
		const {list, onChange} = this.props;

		if (onChange) {
			onChange({
				...list,
				channels: {
					...list.channels,
					[channel.id]: channel
				}
			});
		}
	}

	render () {
		const {list} = this.props;
		const {sortable, pinned} = this.state;

		return (
			<div className={cx('channel-list')}>
				{list.label && (<Text.Base className={cx('label')}>{list.label}</Text.Base>)}
				{this.renderPinned(pinned)}
				{this.renderSortable(sortable)}
			</div>
		);
	}


	renderPinned (channels) {
		if (!channels || !channels.length) { return null; }

		return (
			<ol className={cx('channels')}>
				{channels.map((channel) => {
					return (
						<li key={channel.id}>
							{this.renderChannel(channel)}
						</li>
					);
				})}
			</ol>
		);
	}


	renderSortable (channels) {
		if (!channels || !channels.length) { return null; }

		//TODO: make this list sortable

		return (
			<ol className={cx('channels')}>
				{channels.map((channel) => {
					return (
						<li key={channel.id}>
							{this.renderChannel(channel)}
						</li>
					);
				})}
			</ol>
		);
	}


	renderChannel (channel) {
		const {errors} = this.props;

		return (
			<Channel channel={channel} onChange={this.onChannelChange} errors={errors && errors[channel.id]} />
		);
	}
}
