import React from 'react';
import PropTypes from 'prop-types';
import {Loading} from '@nti/web-commons';
import cx from 'classnames';

import {slugify} from '../util';

import Header from './header/';
import {FormContext, Controls, Store as Edit} from './edit';

export default
@Edit.Store.connect({
	[Edit.LOADING]: 'loading',
	[Edit.ERROR]: 'error',
})
class Frame extends React.Component {

	static propTypes = {
		entity: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.object
		]).isRequired,
		loading: PropTypes.bool,
		error: PropTypes.any,
		children: PropTypes.any,
		className: PropTypes.string
	}

	static deriveBindingFromProps = ({entity}) => entity

	render () {
		const {
			props: {
				loading,
				error,
				children,
				className,
				entity: user
			},
		} = this;

		return (
			<div className="user-profile-container">
				{
					error ? (
						<div>Error</div>
					) : loading ? (
						<Loading.Spinner />
					) : (
						<FormContext.Provider value={{
							formId: slugify(user.getID())
						}}>
							<Controls entity={user} />
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
