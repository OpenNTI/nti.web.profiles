import React from 'react';
import PropTypes from 'prop-types';
import {scoped} from '@nti/lib-locale';
import {decodeFromURI} from '@nti/lib-ntiids';
import {NotFound, Text} from '@nti/web-commons';
import {LinkTo, getHistory} from '@nti/web-routing';

import Store from './Store';

const t = scoped('nti-profiles.community.view.activity.topic.View', {
	notFound: {
		header: 'Unable to load item',
		description: 'Your link may contain errors or this item may no longer exist.'
	}
});

const goBack = () => getHistory().goBack();

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

	get editMode () {
		const {location} = this.props;

		return location && location.hash === '#edit';
	}

	get selectedComment () {
		const {location} = this.props;
		const hash = location && location.hash;

		if (!hash || hash === '#comment') { return null; }

		try {
			return decodeFromURI(hash.replace(/^#/, ''));
		} catch (e) {
			return null;
		}
	}


	render () {
		const {overrides, error, channel, topic, ...otherProps} = this.props;

		if (error) {
			const options = [(<a href="#" key={0} onClick={goBack}>{NotFound.Card.optionLabels.back}</a>)];

			if (channel) {
				options.push(
					<LinkTo.Object object={channel}>
						<Text.Base>
							{channel.title}
						</Text.Base>
					</LinkTo.Object>
				);
			}

			return (
				<NotFound.Card
					header={t('notFound.header')}
					description={t('notFound.description')}
					options={options}
				/>
			);
		}

		const Cmp = overrides ? overrides.getItemFor(topic) : null;

		if (!Cmp) { return null; }

		return (
			<Cmp
				topic={topic}
				channel={channel}
				focusNewComment={this.focusNewComment}
				selectedComment={this.selectedComment}
				editMode={this.editMode}
				{...otherProps}
			/>
		);
	}
}