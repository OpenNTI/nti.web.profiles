import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import qs from 'query-string';
import {User, getAppUser} from '@nti/web-client';
import {encodeForURI} from '@nti/lib-ntiids';
import {Router, Route as R} from '@nti/web-routing';

import {User as U} from '../../src';

window.$AppConfig = window.$AppConfig || {server: '/dataserver2/'};

class Test extends React.Component {
	state = {entity: null}

	static contextTypes = {
		router: PropTypes.object
	};

	static childContextTypes = {
		router: PropTypes.object
	}

	getChildContext () {
		const {router: nav} = this.context;
		const router = {
			...(nav || {}),
			getRouteFor: this.getRouteFor,
		};

		return {
			router
		};
	}

	getRouteFor = (obj = {}, context) => {
		const {router: {route}} = this.context;
		return `${route.location.pathname}/${obj.NTIID ? encodeForURI(obj.NTIID) : 'no-ntiid'}/#detail-view`;
	}

	async componentDidMount () {
		const {user} = qs.parse(global.location.search);
		const entity = await (user ? User.resolve({entityId: user}) : getAppUser());

		this.setState({
			entity
		});
	}

	render () {
		if (!this.state.entity) { return null; }

		return (
			<U.View entity={this.state.entity} />
		);
	}
}

// Using a router just to provide context/childContext to
// <Test /> so it can simulate links to detail views
const Rtr = Router.for([
	R({path: '/', component: Test, name: 'nti-web-profiles-test'}),
]);

ReactDOM.render(
	<Rtr />,
	document.getElementById('content')
);
