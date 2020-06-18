import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {decodeFromURI} from '@nti/lib-ntiids';
import {Layouts, Prompt} from '@nti/web-commons';
import {RedirectTo} from '@nti/web-routing';

import {getFirstChannel} from '../utils';
import Topic from '../topic';

import Styles from './View.css';
import Store from './Store';
import Sizes from './sizes';

const {Responsive} = Layouts;
const cx = classnames.bind(Styles);

function isValidTopicId (topicId) {
	return topicId && topicId !== 'object';
}

export default
@Store.connect(['notFound', 'channel', 'sortOn', 'setSortOn', 'layout', 'setLayout', 'availableSorts'])
class CommunityChannel extends React.Component {
	static deriveBindingFromProps (props) {
		return {
			channels: props.channels,
			channelId: decodeFromURI(props.channelId)
		};
	}

	static propTypes = {
		channel: PropTypes.object,
		channels: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
		community: PropTypes.object,
		channelId: PropTypes.string.isRequired,
		topicId: PropTypes.string,
		commentId: PropTypes.string,
		size: PropTypes.string
	}

	renderList () {
		const {size, ...otherProps} = this.props;
		const Cmp = Sizes[size];

		return (
			<Cmp {...otherProps} size={size} />
		);
	}

	renderWebApp = () => {
		const {community, channel, topicId, commentId, ...otherProps} = this.props;

		return (
			<>
				{this.renderList()}
				{isValidTopicId(topicId) && channel && (
					<Prompt.Dialog className={cx('community-topic-dialog')}>
						<Topic
							community={community}
							channel={channel}
							topicId={topicId}
							commentId={commentId}
							dialog
							{...otherProps}
						/>
					</Prompt.Dialog>
				)}
			</>
		);
	}

	renderMobile = () => {
		const {community, channel, topicId, commentId, ...otherProps} = this.props;

		if (isValidTopicId(topicId) && channel) {
			return (
				<Topic
					community={community}
					channel={channel}
					topicId={topicId}
					commentId={commentId}
					{...otherProps}
				/>
			);
		}

		return this.renderList();
	}

	render () {
		const {channel, channels} = this.props;

		if (channel && channel.wasDeleted) {
			const first = channels && getFirstChannel(channels);

			return first ? (<RedirectTo.Object object={first} />) : null;
		}

		return (
			<>
				<Responsive.Item query={Responsive.isWebappContext} render={this.renderWebApp} />
				<Responsive.Item query={Responsive.isMobileContext} render={this.renderMobile} />
			</>
		);
	}
}
