import './FieldGroup.scss';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import BooleanInput from './BooleanInput';
import ChoiceInput from './ChoiceInput';
import DateTimeInput from './DateTimeInput';
import EmailInput from './EmailInput';
import IntegerInput from './IntegerInput';
import ListInput from './ListInput';
import TextInput from './TextInput';

const TYPE_TO_INPUT = {
	Choice: ChoiceInput,
	string: TextInput,
	bool: BooleanInput,
	int: IntegerInput,
	list: ListInput,
	'nti.dataserver.users.interfaces.EmailAddress': EmailInput,
	datetime: DateTimeInput
};

function getInputForField (field) {
	return TYPE_TO_INPUT[field.schema.type] || TYPE_TO_INPUT.string;
}

export default class ProfileUpdateSalltProfileCommunity extends React.Component {
	static propTypes = {
		order: PropTypes.array,
		title: PropTypes.string,
		fields: PropTypes.array,
		values: PropTypes.object
	}


	render () {
		const {order, title, fields, values, ...otherProps} = this.props;
		const fieldMap = fields.reduce((acc, field) => {
			acc[field.schema.name] = field;

			return acc;
		}, {});

		const fieldCmps = order
			.map((type) => {
				const field = fieldMap[type];
				const value = values[type];

				if (!field) { return null; }

				const Cmp = getInputForField(field);

				if (field.hidden) { return null;}

				return (
					<div className={cx('field', field.schema.type, {'has-truthy-value': value})} key={type}>
						<Cmp field={field} value={value} {...otherProps} />
					</div>
				);
			})
			.filter(Boolean);

		if (!fieldCmps || fieldCmps.length === 0) { return null; }

		return (
			<div className="profile-update-sallt-profile-field-group">
				{title && <div className="field-group-header">{title}</div>}
				{fieldCmps}
			</div>
		);
	}
}
