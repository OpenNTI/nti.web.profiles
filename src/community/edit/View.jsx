import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Loading, Error} from '@nti/web-commons';

import Styles from './View.css';
import Store from './Store';
import Form from './form';

const cx = classnames.bind(Styles);

export default
@Store.connect(['loading', 'error'])
class CommunityEditor extends React.Component {
	static deriveBindingFromProps (props) {
		return {
			community: props.community,
			afterSave: props.afterSave,
			onCancel: props.onCancel
		};
	}

	static propTypes = {
		community: PropTypes.object.isRequired,
		afterSave: PropTypes.func,
		onCancel: PropTypes.func,

		loading: PropTypes.bool,
		error: PropTypes.any
	}


	render () {
		const {loading, error, ...otherProps} = this.props;

		return (
			<div className={cx('community-editor')}>
				<Loading.Placeholder loading={loading} fallback={(<Loading.Spinner.Large />)}>
					{error && (<Error error={error} />)}
					{!error && (<Form {...otherProps} />)}
				</Loading.Placeholder>
			</div>
		);
	}

}