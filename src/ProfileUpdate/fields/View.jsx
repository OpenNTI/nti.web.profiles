import React from 'react';
import PropTypes from 'prop-types';

import Registry from './Registry';

const registry = Registry.getInstance();

export default class ProfileUpdateFields extends React.Component {
	static propTypes = {
		fields: PropTypes.array
	}


	render () {
		const {fields} = this.props;

		if (!fields) { return null; }

		const fieldInputs = fields.filter(field => !!registry.getItemFor(field));

		return (
			<ul>
				{fieldInputs.map((field, index) => {
					const Cmp = registry.getItemFor(field);

					return (
						<li key={index}>
							<Cmp field={field} />
						</li>
					);
				})}
			</ul>
		);
	}
}
