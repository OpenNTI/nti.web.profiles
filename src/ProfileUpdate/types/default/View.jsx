import React from 'react';
import PropTypes from 'prop-types';

import FieldGroup from '../../common/FieldGroup';

import { getConfigForType } from './Config';

export default class ProfileUpdateDefault extends React.Component {
	static propTypes = {
		fields: PropTypes.array,
		type: PropTypes.string,
	};

	render() {
		const { type } = this.props;
		const config = getConfigForType(type);

		if (!config) {
			return null;
		}

		const { groups } = config;

		return (
			<div>
				{groups.map((group, key) => this.renderGroup(group, key))}
			</div>
		);
	}

	renderGroup(group, key) {
		const { fields: fieldOrder, label, getLabel } = group;
		const title = getLabel ? getLabel() : label;

		return (
			<FieldGroup
				key={key}
				order={fieldOrder}
				title={title}
				{...this.props}
			/>
		);
	}
}
