import React from 'react';
import PropTypes from 'prop-types';
import {Router, Route, View} from '@nti/web-routing';
import {Prompt} from '@nti/web-commons';

import {Modal} from '../edit';

export default class CommunityFrame extends React.Component {
	static propTypes = {
		children: PropTypes.element,
		community: PropTypes.object,
		title: PropTypes.string
	}

	getCommunityEditRoute = (obj, context) => {
		if (obj.isCommunity && context === 'edit') {
			return '#community-edit';
		}
	}


	renderCommunityEdit = (_, setHash) => {
		const {community, title} = this.props;
		const close = () => setHash('');

		return (
			<Prompt.Dialog>
				<Modal
					title={title}
					community={community}
					onCancel={close}
					afterSave={close}
				/>
			</Prompt.Dialog>
		);
	}

	getTitle () {
		const {community, title} = this.props;

		return title || (community ? community.displayName : '');
	}


	render () {
		const {children, community} = this.props;

		return (
			<View.WithTitle title={this.getTitle()}>
				<Router.RouteForProvider getRouteFor={this.getCommunityEditRoute}>
					{React.Children.map(children, (item) => {
						return React.cloneElement(item, {community});
					})}
					<Route.Hash matches="#community-edit" render={this.renderCommunityEdit} />
				</Router.RouteForProvider>
			</View.WithTitle>
		);
	}
}