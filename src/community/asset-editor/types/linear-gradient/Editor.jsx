import React from 'react';
import PropTypes from 'prop-types';
import {LinearGradientImage} from '@nti/web-whiteboard';

import {Name} from './Constant';

export default class CommunityAssetLinearGradientImageEditor extends React.Component {
	static Name = Name;

	static propTypes = {
		value: PropTypes.shape({
			original: PropTypes.string,
			updated: PropTypes.object
		}),
		onChange: PropTypes.func
	}

	onChange = (linearGradientState) => {
		const {onChange} = this.props;

		if (onChange) {
			onChange(linearGradientState);
		}
	}

	render () {
		const {value} = this.props;
		const {original, updated} = value || {};

		return (
			<LinearGradientImage.Editor value={updated || original} onChange={this.onChange}/>
		);
	}
}
