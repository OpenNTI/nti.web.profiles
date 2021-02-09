import React from 'react';
import PropTypes from 'prop-types';
import {decorate} from '@nti/lib-commons';

import ConfirmExit from './ConfirmExit';
import Form from './Form';
import Frame from './Frame';
import {
	Store,
	LOADED,
	FIELD_GROUPS,
} from './Store';

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
		this.props.store.clearEdits();
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

export default decorate(View, [
	Store.connect({
		[LOADED]: 'loaded',
		[FIELD_GROUPS]: 'fieldGroups',
	})
]);
