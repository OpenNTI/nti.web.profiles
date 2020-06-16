import React from 'react';
import PropTypes from 'prop-types';
import {Editor} from '@nti/web-discussions';
import {Router, LinkTo} from '@nti/web-routing';


NewChannelTopic.propTypes = {
	dialog: PropTypes.bool,
	channel: PropTypes.object,
	community: PropTypes.object
};
export default function NewChannelTopic ({dialog, channel, community}) {
	const router = Router.useRouter();

	const afterSave = (newTopic) => {
		router.routeTo.object(newTopic);
	};

	return (
		<>
			<LinkTo.Object object={channel}>
				<button>Close</button>
			</LinkTo.Object>
			<Editor
				dialog={dialog}
				container={[community, channel]}
				afterSave={afterSave}
			/>
		</>
	);
}