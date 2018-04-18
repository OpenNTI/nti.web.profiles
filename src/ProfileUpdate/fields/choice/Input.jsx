import React from 'react';
import PropTypes from 'prop-types';
import {SelectBox} from '@nti/web-commons';

import Registry from '../Registry';

function handles (item) {
	return item.schema.type === 'Choice';
}

export default
@Registry.register(handles)
class ChoiceField extends React.Component {
	static propTypes = {
		field: PropTypes.object.isRequired
	}

	state = {selected: null}

	onChange = (selected) => {
		this.setState({
			selected
		});
	}


	render () {
		const {field} = this.props;
		const {schema} = field;

		return (
			<div>
				<SelectBox
					options={schema.choices.map(x => {return {label: x, value: x}; })}
					value={this.state.selected}
					onChange={this.onChange}
				/>
			</div>
		);
	}
}
