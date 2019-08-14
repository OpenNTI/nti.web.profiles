import React from 'react';
import classnames from 'classnames/bind';
import {Prompt} from '@nti/web-commons';

import Identity from '../../components/Identity';
import OptionsWindow from '../../components/OptionsWindow';
import ChannelStreamHeader from '../../components/channel-stream-header';
import ChannelList from '../../components/channel-list';

import Styles from './Mobile.css';
import propTypes from './prop-types';

const cx = classnames.bind(Styles);

export default class ChannelMobileLayout extends React.Component {
	static propTypes = propTypes;

	state = {showOptions: false}

	showOptions = () => {
		this.setState({
			showOptions: true
		});
	}

	hideOptions = () => {
		this.setState({
			showOptions: false
		});
	}

	render () {
		const {
			community,
			channels,
			channel,
			layout,
			setLayout,
			availableSorts,
			sort,
			setSort
		} = this.props;
		const {showOptions} = this.state;

		return (
			<div className={cx('community-mobile')}>
				{showOptions && (
					<Prompt.Dialog onBeforeDismiss={this.hideOptions}>
						<OptionsWindow
							fullscreen
							community={community}
							layout={layout}
							setLayout={setLayout}
							availableSorts={availableSorts}
							sort={sort}
							setSort={setSort}
						/>
					</Prompt.Dialog>
				)}
				<div className={cx('header')}>
					<Identity community={community} showOptions={this.showOptions} />
					<ChannelList channels={channels} channel={channel} row />
					<ChannelStreamHeader className={cx('mobile-channel-header')} channel={channel} />
				</div>
			</div>
		);
	}
}
