import React from 'react';
import PropTypes from 'prop-types';

import { Router, Route, View } from '@nti/web-routing';
import { Prompt, Background } from '@nti/web-commons';

import { Modal as EditModal } from '../edit';
import { Background as CommunityBackground } from '../common';

import { Modal as MembersModal } from './members';

export default class CommunityFrame extends React.Component {
	static propTypes = {
		children: PropTypes.element,
		community: PropTypes.object,
		title: PropTypes.string,
		noBackground: PropTypes.bool,
	};

	getCommunityEditRoute = (obj, context) => {
		if (obj.isCommunity && context === 'edit') {
			return '#community-edit';
		}

		if (obj.isCommunity && context === 'members') {
			return '#members';
		}
	};

	renderCommunityEdit = (_, setHash) => {
		const { community, title } = this.props;
		const close = () => setHash('');

		return (
			<Prompt.Dialog>
				<EditModal
					title={title}
					community={community}
					onCancel={close}
					afterSave={close}
				/>
			</Prompt.Dialog>
		);
	};

	renderMembers = (_, setHash) => {
		const { community } = this.props;
		const close = () => setHash('');

		return (
			<Prompt.Dialog>
				<MembersModal community={community} doClose={close} />
			</Prompt.Dialog>
		);
	};

	getTitle() {
		const { community, title } = this.props;

		return title || (community ? community.displayName : '');
	}

	render() {
		const { community, noBackground } = this.props;
		const routes = this.renderRoutes();

		if (noBackground) {
			return routes;
		}

		return (
			<CommunityBackground community={community} childProp="imgUrl">
				<Background className="community-background">
					{routes}
				</Background>
			</CommunityBackground>
		);
	}

	renderRoutes() {
		const { children, community } = this.props;

		return (
			<View.WithTitle title={this.getTitle()}>
				<Router.RouteForProvider
					getRouteFor={this.getCommunityEditRoute}
				>
					{React.Children.map(children, item =>
						React.cloneElement(item, { community })
					)}
					<Route.Hash
						matches="#community-edit"
						render={this.renderCommunityEdit}
					/>
					<Route.Hash
						matches="#members"
						render={this.renderMembers}
					/>
				</Router.RouteForProvider>
			</View.WithTitle>
		);
	}
}
