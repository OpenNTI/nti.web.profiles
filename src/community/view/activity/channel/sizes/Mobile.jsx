import React from 'react';
import classnames from 'classnames/bind';
import { Prompt } from '@nti/web-commons';

import { Sizes } from '../../Constants';
import Identity from '../../components/Identity';
import OptionsWindow from '../../components/OptionsWindow';
import ChannelStreamHeader from '../../components/channel-stream-header';
import ChannelList from '../../components/channel-list';
import ChannelDescription from '../../components/ChannelDescription';
import ChannelStream from '../../components/ChannelStream';
import ChannelNotFound from '../../components/ChannelNotFound';

import Styles from './Mobile.css';
import propTypes from './prop-types';

const cx = classnames.bind(Styles);

export default class ChannelMobileLayout extends React.Component {
	static propTypes = propTypes;

	state = { showOptions: false };

	showOptions = () => {
		this.setState({
			showOptions: true,
		});
	};

	hideOptions = () => {
		this.setState({
			showOptions: false,
		});
	};

	setLayout = (...args) => {
		//NOTE: Since the Dialog is setting scroll-lock on the page
		//we need to wait for it to be gone before we change the layout
		const { setLayout } = this.props;

		this.setState(
			{
				showOptions: false,
			},
			() => {
				setImmediate(() => {
					if (setLayout) {
						setLayout(...args);
					}
				});
			}
		);
	};

	render() {
		const {
			community,
			channels,
			channel,
			notFound,
			layout,
			availableSorts,
			sortOn,
			setSortOn,
			size,
			title,
		} = this.props;
		const { showOptions } = this.state;

		return (
			<div className={cx('community-mobile')}>
				{showOptions && (
					<Prompt.Dialog onBeforeDismiss={this.hideOptions}>
						<OptionsWindow
							fullscreen
							community={community}
							layout={layout}
							setLayout={this.setLayout}
							availableSorts={availableSorts}
							sortOn={sortOn}
							setSortOn={setSortOn}
						/>
					</Prompt.Dialog>
				)}
				<div className={cx('header')}>
					<Identity
						community={community}
						showOptions={this.showOptions}
						title={title}
					/>
					<ChannelList channels={channels} channel={channel} row />
					{channel && (
						<ChannelStreamHeader
							className={cx('mobile-channel-header')}
							channel={channel}
						/>
					)}
				</div>
				{notFound && <ChannelNotFound {...this.props} />}
				{channel && <ChannelDescription channel={channel} />}
				{channel && (
					<ChannelStream
						searchContext={community.getID()}
						channel={channel}
						sortOn={sortOn}
						layout={layout}
						batchSize={10}
						columns={size === Sizes.Tablet ? 2 : 1}
					/>
				)}
			</div>
		);
	}
}
