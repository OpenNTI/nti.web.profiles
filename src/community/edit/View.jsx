import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { decorate } from '@nti/lib-commons';
import { Loading, Error } from '@nti/web-commons';

import Store from './Store';
import Form from './form';

class CommunityEditor extends React.Component {
	static deriveBindingFromProps(props) {
		return {
			community: props.community,
			afterSave: props.afterSave,
			onCancel: props.onCancel,
		};
	}

	static propTypes = {
		community: PropTypes.object.isRequired,
		afterSave: PropTypes.func,
		onCancel: PropTypes.func,

		loading: PropTypes.bool,
		error: PropTypes.any,
	};

	render() {
		const { loading, error, ...otherProps } = this.props;

		return (
			<div className={cx('community-editor')}>
				<Loading.Placeholder
					loading={loading}
					fallback={<Loading.Spinner.Large />}
				>
					{error && <Error error={error} />}
					{!error && <Form {...otherProps} />}
				</Loading.Placeholder>
			</div>
		);
	}
}

export default decorate(CommunityEditor, [Store.connect(['loading', 'error'])]);
