import React from 'react';
import PropTypes from 'prop-types';
import {getService} from '@nti/web-client';
import {Router, Route} from '@nti/web-routing';

import * as Community from '../../../src/community/';

import PickCourse from './PickCourse';

class CommunityTestWrapper extends React.Component {
	static propTypes = {
		courseId: PropTypes.string
	}

	state = {}

	componentDidMount () {
		this.setup();
	}

	componentDidUpdate (prevProps) {
		if (this.props.courseId !== prevProps.courseId) {
			this.setup();
		}
	}

	async setup () {
		const {courseId} = this.props;

		const service = await getService();
		const course = await service.getObject(courseId);
		const community = await course.getCommunity();

		this.setState({
			community
		});
	}


	render () {
		const {community} = this.state;

		if (!community) { return null; }

		return (
			<Community.View community={community} />
		);
	}
}

class CommunityTest extends React.Component {
	render () {
		return (
			<PickCourse>
				<CommunityTestWrapper />
			</PickCourse>
		);
	}
}

export default Router.for([
	Route({
		path: '/',
		component: CommunityTest
	})
]);