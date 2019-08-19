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
			topicId: decodeFromURI(props.topicId)
		};
	}

	static propTypes = {
		channel: PropTypes.object,
		topicId: PropTypes.string,
		overrides: PropTypes.shape({
			getItemFor: PropTypes.func
		}),

		loading: PropTypes.bool,
		topic: PropTypes.object,
		error: PropTypes.any
	}


	render () {
		const {overrides, topic, ...otherProps} = this.props;

		const Cmp = overrides ? overrides.getItemFor(topic) : null;

		if (!Cmp) { return null; }

		return (
			<Cmp topic={topic} {...otherProps} />
		);
	}
}