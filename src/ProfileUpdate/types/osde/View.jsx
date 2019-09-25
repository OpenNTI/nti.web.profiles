import React from 'react';
import PropTypes from 'prop-types';

import Registry from '../Registry';
import FieldGroup from '../../common/FieldGroup';

import FieldRegistry from './Registry';

const type = 'IOSDEUserProfile';
const registry = FieldRegistry.getInstance();

function getFieldOrder (fields) {
	let order = [];

	for (let field of fields) {
		if (field.schema.name === 'role') {
			order = [field, ...order];
		} else {
			order.push(field);
		}
	}

	return order;
}

@Registry.register(type)
class ProfileUpdateOSDEProfile extends React.Component {
	static propTypes = {
		fields: PropTypes.array,
		values: PropTypes.object
	}


	render () {
		const {fields, values, ...otherProps} = this.props;

		if (!fields) { return null; }

		const ordered = getFieldOrder(fields);

		return (
			<ul className="nti-profile-update-fields">
				{ordered.map((field, index) => {
					const value = values[field.schema.name];
					const Cmp = registry.getItemFor(field, values);

					const fieldRender = Cmp ?
						(<Cmp field={field} value={value} index={index} {...otherProps} />) :
						(<FieldGroup fields={[field]} order={[field.schema.name]} values={values} {...otherProps} />);

					return (
						<li key={index}>
							{fieldRender}
						</li>
					);
				})}
			</ul>
		);
	}
}

export default ProfileUpdateOSDEProfile;
