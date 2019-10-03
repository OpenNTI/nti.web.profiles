import React from 'react';
import PropTypes from 'prop-types';

import Registry from '../Registry';
import FieldGroup from '../../common/FieldGroup';

import Role from './role';

const types = [
	'IOSDEUserProfile',
	'IOSDEStudentProfile',
	'IOSDEOtherProfile',
	'IOSDEEmployerProfile',
	'IOSDENurseProfile',
	'IOSDEStaffProfile',
	'IOSDEAdminProfile',
	'IOSDEEducatorProfile'
];

const CmpOverrides = {
	'role': Role
};

const FieldOrders = {
	'IOSDEEducatorProfile': ['role', 'affiliation', 'job_title', 'work_email'],
	'IOSDEAdminProfile': ['role', 'affiliation', 'job_title', 'work_email'],
	'IOSDEStaffProfile': ['role', 'affiliation', 'job_title', 'work_email'],
	'IOSDENurseProfile': ['role', 'affiliation', 'work_email'],
	'IOSDEEmployerProfile': ['role', 'location', 'company_name', 'company_mailing_address', 'work_email'],
	'IOSDEStudentProfile': ['role', 'expected_graduation', 'affiliation'],
	'IOSDEOtherProfile': ['role', 'other_role']
};

function getFieldOrder (fields, type) {
	const fieldOrder = FieldOrders[type];

	if (!fieldOrder) { return fields; }

	const fieldMap = fields.reduce((acc, field) => ({...acc, [field.schema.name]: field}), {});
	const allFields = Object.keys(fieldMap);
	const seenFields = {};

	const order = fieldOrder.map((field) => {
		seenFields[field] = true;
		return fieldMap[field];
	});

	return [
		...order,
		...(
			allFields
				.filter(field => !seenFields[field])
				.map(field => fieldMap[field])
		)
	];
}

@Registry.register(types)
class ProfileUpdateOSDEProfile extends React.Component {
	static propTypes = {
		fields: PropTypes.array,
		values: PropTypes.object,
		type: PropTypes.string
	}


	render () {
		const {fields, type, values, ...otherProps} = this.props;

		if (!fields) { return null; }

		const ordered = getFieldOrder(fields, type);

		return (
			<ul className="nti-profile-update-fields">
				{ordered.map((field, index) => {
					const value = values[field.schema.name];
					const Cmp = CmpOverrides[field.schema.name];

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
