import React from 'react';
import PropTypes from 'prop-types';

import ConfirmExit from './ConfirmExit';
import Form from './Form';
import Frame from './Frame';
import {
	Store,
	LOADED,
	FIELD_GROUPS,
} from './Store';

export default
@Store.connect({
	[LOADED]: 'loaded',
	[FIELD_GROUPS]: 'fieldGroups',
})
class View extends React.PureComponent {

	static propTypes = {
		loaded: PropTypes.bool,
		formId: PropTypes.string,
		fieldGroups: PropTypes.object,
		className: PropTypes.string,
		user: PropTypes.object,
		store: PropTypes.object.isRequired
	}

	componentDidMount () {
		this.props.store.load(this.props.user);
	}

	componentWillUnmount () {
		this.unmounted = true;
		this.props.store.clear();
	}

	render () {
		const {loaded, className, user} = this.props;

		if (!loaded || this.unmounted) {
			return null;
		}

		return (
			<Frame className={className} user={user}>
				<div>
					<Form />
					<ConfirmExit />
				</div>
			</Frame>
		);
	}
}
