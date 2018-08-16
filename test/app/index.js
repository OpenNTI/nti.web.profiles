import React from 'react';
import ReactDOM from 'react-dom';
import {getAppUser} from '@nti/web-client';

import {User} from '../../src';

window.$AppConfig = window.$AppConfig || {server: '/dataserver2/'};

class Test extends React.Component {
	state = {entity: null}

	async componentDidMount () {
		const entity = await getAppUser();

		this.setState({
			entity
		});
	}

	render () {
		if (!this.state.entity) { return null; }

		return (
			<User.View entity={this.state.entity} />
		);
	}
}



ReactDOM.render(
	<Test />,
	document.getElementById('content')
);
