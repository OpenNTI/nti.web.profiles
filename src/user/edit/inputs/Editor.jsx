import './Editor.scss';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Editor as E } from '@nti/web-editor';

// just a place to hang common styles on @nti/web-editor
export default class Editor extends React.Component {
	static propTypes = {
		className: PropTypes.string,
		schema: PropTypes.object,
	};

	render() {
		const {
			className,
			schema: { title: placeholder } = {},
			...props
		} = this.props;

		return (
			<E
				className={cx('nti-profile-editor', className)}
				placeholder={placeholder}
				contentChangeBuffer={100}
				{...props}
			/>
		);
	}
}
