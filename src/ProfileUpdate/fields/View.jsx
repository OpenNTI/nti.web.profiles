import React from 'react';
import PropTypes from 'prop-types';

import Registry from './Registry';

const registry = Registry.getInstance();

export default class ProfileUpdateFields extends React.Component {
	static propTypes = {
		fields: PropTypes.array,
		values: PropTypes.object
	}


	render () {
		const {fields, values, ...otherProps} = this.props;

		if (!fields) { return null; }

		const fieldInputs = fields.filter(field => !!registry.getItemFor(field, values));

		return (
			<ul className="nti-profile-update-fields">
				{fieldInputs.map((field, index) => {
					const value = values[field.schema.name];
					const Cmp = registry.getItemFor(field, values);

					return (
						<li key={index}>
							<Cmp field={field} value={value} index={index} {...otherProps} />
						</li>
					);
				})}
			</ul>
		);
	}
}
