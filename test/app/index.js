import React from 'react';
import ReactDOM from 'react-dom';
import '@nti/style-common/variables.css';

// import {Selector} from '../../src';

import Test from './community';

window.$AppConfig = window.$AppConfig || {server: '/dataserver2/', username: 'andrew.ligon'};


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
