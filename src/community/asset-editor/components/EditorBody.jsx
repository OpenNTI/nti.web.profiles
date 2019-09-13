import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Errors} from '@nti/web-commons';

import Store from '../Store';
import {getForType} from '../types/Editor';

import Styles from './EditorBody.css';

const cx = classnames.bind(Styles);

export default
@Store.monitor(['current', 'values', 'setValue', 'error'])
class CommunityAssetEditorBody extends React.Component {
	static propTypes = {
		current: PropTypes.string,
		values: PropTypes.object,
		setValue: PropTypes.func,
		error: PropTypes.any
	}

	onChange = () => {}

	render () {
		const {current, values, error} = this.props;
		const Cmp = getForType(current);

		return (
			<div className={cx('community-asset-editor-body')}>
				{error && !current && (<Errors error={error} />)}
				{current && Cmp && (
					<Cmp value={values[current]} onChange={this.onChange} error={error} />
				)}
			</div>
		);
	}
}