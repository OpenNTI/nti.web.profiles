import React from 'react';
import ReactDOM from 'react-dom';

// import {Selector} from '../../src';

import Test from './community';

window.$AppConfig = window.$AppConfig || {server: '/dataserver2/'};


// class Test extends React.Component {
// 	state = {selected: []}

// 	onSelect = (profile) => {
// 		this.setState({
// 			selected: [profile]
// 		});
// 	}

// 	render () {
// 		const {selected} = this.state;

// 		return (
// 			<Selector selected={selected} onSelect={this.onSelect} />
// 		);
// 	}
// }



ReactDOM.render(
	<Test />,
	document.getElementById('content')
);
