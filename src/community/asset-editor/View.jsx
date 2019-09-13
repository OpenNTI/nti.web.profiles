import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Loading} from '@nti/web-commons';

import Store from './Store';
import Style from './View.css';
import Controls from './components/Controls';
import Editor from './components/Editor';
import TypeSwitcher from './components/TypeSwitcher';

const cx = classnames.bind(Style);

export default
@Store.connect(['loading'])
class CommunityAssetEditor extends React.Component {
	static deriveBindingFromProps (props) {
		return {
			community: props.community,
			assetName: props.assetName,
			afterSave: props.afterSave,
			onCancel: props.onCancel
		};
	}

	static propTypes = {
		community: PropTypes.shape({
			avatarURL: PropTypes.string,
			backgroundURL: PropTypes.string
		}),
		assetName: PropTypes.string,
		afterSave: PropTypes.func,
		onCancel: PropTypes.func,

		loading: PropTypes.bool,
		error: PropTypes.any
	}


	render () {
		const {loading} = this.props;

		return (
			<div className={cx('community-asset-editor')}>
				<Loading.Placeholder loading={loading} fallback={(<Loading.Spinner />)}>
					<div className={cx('navigation')}>
						<TypeSwitcher />
					</div>
					<div className={cx('body')}>
						<Editor />
						<Controls />
					</div>
				</Loading.Placeholder>
			</div>
		);
	}
}