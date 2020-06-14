import React from 'react';
import PropTypes from 'prop-types';
import {Layouts, Error, Loading} from '@nti/web-commons';

import Store from './Store';
import {Sizes} from './Constants';

const {Responsive} = Layouts;

const Queries = {
	Desktop: ({containerWidth}) => containerWidth >= 1024,
	Tablet: ({containerWidth}) => containerWidth >= 678 && containerWidth < 1024,
	Mobile: ({containerWidth}) => containerWidth < 678
};

export default
@Store.connect(['loading', 'channels', 'error'])
class CommunityActivityFrame extends React.Component {
	static deriveBindingFromProps (props) {
		return props.community;
	}

	static propTypes = {
		children: PropTypes.element,
		channelId: PropTypes.string,
		community: PropTypes.shape({
			getChannelList: PropTypes.func
		}),

		loading: PropTypes.bool,
		error: PropTypes.any,
		channels: PropTypes.any
	}


	render () {
		return (
			<Responsive.Container>
				<Responsive.Item query={Queries.Desktop} render={this.renderDesktop} />
				<Responsive.Item query={Queries.Tablet} render={this.renderTablet} />
				<Responsive.Item query={Queries.Mobile} render={this.renderMobile} />
			</Responsive.Container>
		);
	}

	renderDesktop = () => this.renderSize(Sizes.Desktop)
	renderTablet = () => this.renderSize(Sizes.Tablet)
	renderMobile = () => this.renderSize(Sizes.Mobile)

	renderSize (size) {
		const {children, loading, error, channels, community, ...otherProps} = this.props;

		if (error) {
			return (<Error error={error} />);
		}

		return (
			<Loading.Placeholder loading={loading || !channels} fallback={<Loading.Spinner large />}>
				{React.Children.map(children, (child) => {
					return React.cloneElement(child, {size, channels, community, ...otherProps});
				})}
			</Loading.Placeholder>
		);
	}
}