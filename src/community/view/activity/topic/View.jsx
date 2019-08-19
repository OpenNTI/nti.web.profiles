import React from 'react';
import PropTypes from 'prop-types';
import {decodeFromURI} from '@nti/lib-ntiids';

import Store from './Store';

export default
@Store.connect(['loading', 'topic', 'error'])
class ChannelActivityTopic extends React.Component {
	static deriveBindingFromProps (props) {
		return {
			channel: props.channel,
			topicId: props.topicId === 'new-topic' ? props.topicId : decodeFromURI(props.topicId)
		};
	}

	static propTypes = {
		location: PropTypes.shape({
			hash: PropTypes.string
		}),

		channel: PropTypes.object,
		topicId: PropTypes.string,
		overrides: PropTypes.shape({
			getItemFor: PropTypes.func
		}),

		loading: PropTypes.bool,
		topic: PropTypes.object,
		error: PropTypes.any
	}

	get focusComment () {
		const {location} = this.props;

		return location && location.hash === '#comment';
	}


	render () {
		const {overrides, topic, ...otherProps} = this.props;


		const Cmp = overrides ? overrides.getItemFor(topic) : null;

		if (!Cmp) { return null; }

		return (
			<Cmp topic={topic} focusComment={this.focusComment} {...otherProps} />
		);
	}
}