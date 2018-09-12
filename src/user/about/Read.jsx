import React from 'react';
import PropTypes from 'prop-types';

import getParts from './parts';
import Frame from './Frame';

const safeId = user => user && user.getID ? user.getID() : undefined;

export default class About extends React.Component {

	static propTypes = {
		user: PropTypes.object.isRequired
	}

	state = {}

	componentDidMount () {
		this.setUp();
	}

	componentDidUpdate ({user}) {
		if (safeId(user) !== safeId(this.props.user)) {
			this.setUp();
		}
	}

	setUp () {
		const {user} = this.props;

		this.setState({
			parts: getParts(user)
		});
	}

	render () {
		const {
			props: {user},
			state: {parts = []}
		} = this;

		return (
			<Frame user={user}>
				<div>
					{parts.map((P, i) => (
						<P key={i} user={user} />
					))}
				</div>
			</Frame>
		);
	}
}
