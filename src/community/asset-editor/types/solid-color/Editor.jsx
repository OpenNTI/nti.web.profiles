import React from 'react';
import PropTypes from 'prop-types';
import {SolidColorImage} from '@nti/web-whiteboard';

import {Name} from './Constant';

export default class CommunityAssetSolidColorImageEditor extends React.Component {
	static Name = Name;
	static propTypes = {
		value: PropTypes.shape({
			original: PropTypes.string,
			updated: PropTypes.object
		}),
		onChange: PropTypes.func
	}


	onChange = (solidColorState) => {
		const {onChange} = this.props;

		if (onChange) {
			onChange(solidColorState);
		}
	}

	render () {
		const {value} = this.props;
		const {original, updated} = value || {};

		return (
			<SolidColorImage.Editor value={updated || original} onChange={this.onChange} />
		);
	}
}
