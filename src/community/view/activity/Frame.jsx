import React from 'react';
import PropTypes from 'prop-types';
import { Layouts, Error, Loading } from '@nti/web-commons';

import Store from './Store';
import { Sizes } from './Constants';

const { Responsive } = Layouts;

const Queries = {
	Desktop: ({ containerWidth }) => containerWidth >= 1024,
	Tablet: ({ containerWidth }) =>
		containerWidth >= 678 && containerWidth < 1024,
	Mobile: ({ containerWidth }) => containerWidth < 678,
};

CommunityActivityFrame.deriveBindingFromProps = props => props.community;
CommunityActivityFrame.propTypes = {
	children: PropTypes.element,
	channelId: PropTypes.string,
	community: PropTypes.shape({
		getChannelList: PropTypes.func,
	}),

	loading: PropTypes.bool,
	error: PropTypes.any,
	channels: PropTypes.any,
};

function CommunityActivityFrame(props) {
	return (
		<Responsive.Container>
			<Responsive.Item
				query={Queries.Desktop}
				component={Frame}
				size={Sizes.Desktop}
				{...props}
			/>
			<Responsive.Item
				query={Queries.Tablet}
				component={Frame}
				size={Sizes.Tablet}
				{...props}
			/>
			<Responsive.Item
				query={Queries.Mobile}
				component={Frame}
				size={Sizes.Mobile}
				{...props}
			/>
		</Responsive.Container>
	);
}

export default Store.connect(['loading', 'channels', 'error'])(
	CommunityActivityFrame
);

function Frame({
	children,
	loading,
	error,
	channels,
	community,
	size,
	...props
}) {
	if (error) {
		return <Error error={error} />;
	}

	return (
		<Loading.Placeholder
			loading={loading || !channels}
			fallback={<Loading.Spinner large />}
		>
			{React.Children.map(children, child => {
				return React.cloneElement(child, {
					size,
					channels,
					community,
					...props,
				});
			})}
		</Loading.Placeholder>
	);
}
