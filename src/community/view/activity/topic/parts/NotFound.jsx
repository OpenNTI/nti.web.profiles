import React from 'react';
import PropTypes from 'prop-types';

import { scoped } from '@nti/lib-locale';
import { LinkTo, getHistory } from '@nti/web-routing';
import { NotFound, Text } from '@nti/web-commons';

const t = scoped('nti-profiles.community.view.activity.topic.parts.NotFound', {
	header: 'Unable to load item',
	description:
		'Your link may contain errors or this item may no longer exist.',
});

const goBack = () => getHistory().goBack();

TopicNotFound.propTypes = {
	channel: PropTypes.object,
};
export default function TopicNotFound({ channel }) {
	const options = [
		<a href="#" key={0} onClick={goBack}>
			{NotFound.Card.optionLabels.back}
		</a>,
	];

	if (channel) {
		options.push(
			<LinkTo.Object object={channel}>
				<Text.Base>{channel.title}</Text.Base>
			</LinkTo.Object>
		);
	}

	return (
		<NotFound.Card
			header={t('header')}
			description={t('description')}
			options={options}
		/>
	);
}
