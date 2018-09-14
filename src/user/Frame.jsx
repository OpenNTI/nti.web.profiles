import React from 'react';
import PropTypes from 'prop-types';
import {Loading} from '@nti/web-commons';
import {User} from '@nti/web-client';
import cx from 'classnames';

import Header from './header/';
import {Controls} from './edit';

export default class Frame extends React.Component {

	static propTypes = {
		entity: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.object
		]).isRequired,
		children: PropTypes.any,
		className: PropTypes.string
	}

	state = {
		busy: true
	}

	componentDidMount () {
		this.setUp();
	}

	componentDidUpdate ({entity}, prevState) {
		if (entity !== this.props.entity) {
			this.setUp();
		}
	}

	async setUp () {
		const {entity} = this.props;
		let error, user;

		this.setState({
			busy: true,
			user,
			error
		});

		try {
			user = await User.resolve({entity});
		}
		catch (e) {
			error = e;
		}

		this.setState({
			busy: false,
			user,
			error
		});
	}

	render () {
		const {
			props: {children, className, ...props},
			state: {busy, user}
		} = this;

		delete props.match;
		delete props.location;
		delete props.history;
		delete props.entity;
		delete props.staticContext;

		return (busy || !user) ? <Loading.Spinner /> : (
			<div className="user-profile-container">
				<Controls entity={user} />
				<Header entity={user} />
				{React.cloneElement(React.Children.only(children), {
					className: cx('profile-tab-container', className),
					...props,
					user
				})}
			</div>
		);
	}
}
