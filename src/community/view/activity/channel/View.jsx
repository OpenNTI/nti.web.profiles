import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {decodeFromURI} from '@nti/lib-ntiids';
import {Layouts, Prompt} from '@nti/web-commons';

import Topic from '../topic';

import Styles from './View.css';
import Store from './Store';
import Sizes from './sizes';

const {Responsive} = Layouts;
const cx = classnames.bind(Styles);

export default
@Store.connect(['channel', 'sortOn', 'setSortOn', 'layout', 'setLayout', 'availableSorts'])
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
		channelId: PropTypes.string.isRequired,
		topicId: PropTypes.string,
		commentId: PropTypes.string,
		size: PropTypes.string,

		topicWindowClassName: PropTypes.string
	}

	renderList () {
		const {size, ...otherProps} = this.props;
		const Cmp = Sizes[size];

		return (
			<Cmp {...otherProps} size={size} />
		);
	}

	renderWebApp = () => {
		const {channel, topicId, commentId, topicWindowClassName, ...otherProps} = this.props;

		return (
			<div>
				{this.renderList()}
				{topicId && channel (
					<Prompt.Dialog className={cx('community-topic-dialog', topicWindowClassName)}>
						<Topic
							channel={channel}
							topicId={topicId}
							commentId={commentId}
							{...otherProps}
						/>
					</Prompt.Dialog>
				)}
			</div>
		);
	}

	renderMobile = () => {
		const {channel, topicId, commentId, ...otherProps} = this.props;

		if (topicId && channel) {
			return (
				<Topic
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
		return (
			<>
				<Responsive.Item query={Responsive.isWebappContext} render={this.renderWebApp} />
				<Responsive.Item query={Responsive.isMobileContext} render={this.renderMobile} />
			</>
		);
	}
}
