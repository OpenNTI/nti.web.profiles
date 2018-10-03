import React from 'react';
import PropTypes from 'prop-types';
import {Loading} from '@nti/web-commons';
import cx from 'classnames';

import {slugify} from '../util';

import Header from './header/';
import {FormContext, Store as Edit} from './edit';

export default
@Edit.Store.connect({}) // establishes store and binding for descendants using @Connectors.Any.connect
class Frame extends React.Component {

	static propTypes = {
		entity: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.object
		]).isRequired,
		children: PropTypes.any,
		className: PropTypes.string
	}

	static deriveBindingFromProps = ({entity}) => entity

	render () {
		const {
			props: {
				children,
				className,
				entity: user
			},
		} = this;

		return (
			<div className="user-profile-container">
				{
					!user ? (
						<Loading.Spinner />
					) : (
						<FormContext.Provider value={{
							formId: slugify(user.getID())
						}}>
							<Header entity={user} />
							{React.cloneElement(React.Children.only(children), {
								className: cx('profile-tab-container', className),
								user
							})}
						</FormContext.Provider>
					)
				}
			</div>
		);
	}
}
