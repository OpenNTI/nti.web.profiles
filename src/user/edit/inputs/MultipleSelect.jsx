import React from 'react';
import PropTypes from 'prop-types';
import {Input} from '@nti/web-commons';

export default class MultipleSelect extends React.PureComponent {
	static handles = ({type, value_type:valueType}) => type === 'list' && valueType.type === 'Choice'

	static propTypes = {
		className: PropTypes.string,
		readonly: PropTypes.bool,
		schema: PropTypes.object,
		onChange: PropTypes.func,
		value: PropTypes.array
	}

	render () {
		const {schema: {value_type: {choices}}, value, onChange} = this.props;

		return (
			<Input.MultiSelect className="nti-profile-multiple-select" values={value} onChange={onChange}>
				{(choices || []).map((choice, key) => {
					return (
						<Input.MultiSelect.Option value={choice} key={key}>{choice}</Input.MultiSelect.Option>
					);
				})}
			</Input.MultiSelect>
		);
	}
}
