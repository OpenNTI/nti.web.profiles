import PropTypes from 'prop-types';

import { decodeFromURI } from '@nti/lib-ntiids';
import { getService } from '@nti/web-client';
import { Hooks, Loading } from '@nti/web-commons';

import NewTopic from './parts/NewTopic';
import NotFound from './parts/NotFound';
import Viewer from './parts/Viewer';

const { useResolver } = Hooks;
const { isPending, isErrored, isResolved } = useResolver;

const isNewTopic = Symbol();

CommunityChannelTopic.propTypes = {
	topicId: PropTypes.string,
};
export default function CommunityChannelTopic({ topicId, ...otherProps }) {
	const resolver = useResolver(async () => {
		if (topicId === 'new-topic') {
			return { [isNewTopic]: true };
		}

		const service = await getService();
		const topic = await service.getObject(decodeFromURI(topicId));

		return topic;
	}, [topicId]);

	const loading = isPending(resolver);
	const error = isErrored(resolver) ? resolver : null;
	const topic = isResolved(resolver) ? resolver : null;

	return (
		<Loading.Placeholder
			loading={loading}
			fallback={<Loading.Spinner.Large />}
		>
			{error && <NotFound error={error} {...otherProps} />}
			{topic && topic[isNewTopic] && <NewTopic {...otherProps} />}
			{topic && !topic[isNewTopic] && (
				<Viewer topic={topic} {...otherProps} />
			)}
		</Loading.Placeholder>
	);
}
