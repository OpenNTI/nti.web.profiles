import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from '@nti/web-commons';
import cx from 'classnames';

import Header from './header/';

export default class Frame extends React.Component {
	static propTypes = {
		entity: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
			.isRequired,
		children: PropTypes.any,
		className: PropTypes.string,
	};

	render() {
		const {
			props: { children, className, entity: user },
		} = this;

		return (
			<div className="user-profile-container">
				{!user ? (
					<Loading.Spinner />
				) : (
					<>
						<Header entity={user} />
						{React.cloneElement(React.Children.only(children), {
							className: cx('profile-tab-container', className),
							user,
						})}
					</>
				)}
			</div>
		);
	}
}
