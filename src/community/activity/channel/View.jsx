import React from 'react';
import PropTypes from 'prop-types';
import {decodeFromURI} from '@nti/lib-ntiids';

import Store from './Store';
import Sizes from './sizes';

export default
@Store.connect(['channel', 'sort', 'setSort', 'layout', 'setLayout', 'availableSorts'])
class CommunityChannel extends React.Component {
	static deriveBindingFromProps (props) {
		return {
			channels: props.channels,
			channelId: decodeFromURI(props.channelId)
		};
	}

	static propTypes = {
		channels: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
		channelId: PropTypes.string.isRequired,
		size: PropTypes.string
	}


	render () {
		const {size, ...otherProps} = this.props;
		const Cmp = Sizes[size];

		return (
			<Cmp {...otherProps} />
		);
	}
}
