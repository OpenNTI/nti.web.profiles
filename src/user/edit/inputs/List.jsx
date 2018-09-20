import React from 'react';
import PropTypes from 'prop-types';
import {PropTypes as PT} from '@nti/lib-commons';
import {Button} from '@nti/web-commons';

export default class List extends React.Component {

	static of = Component => (
		(props) => <List {...props} component={Component} />
	)

	static propTypes = {
		setValue: PropTypes.func,
		component: PT.component
	}

	addEntry = () => {
		const {value, component, setValue} = this.props;
		const entry = component.createEmpty && component.createEmpty();
		setValue([...value, entry]);
	}

	setValue = (value, index) => {
		const {value: values, setValue} = this.props;
		values[index] = value;
		setValue(values);
	}

	render () {
		const {
			component,
			value,
			...props
		} = this.props;

		return (
			<div className="nti-profile-field-list">
				<ul className="nti-profile-field-list-values">
					{(value || []).map((v, i) => (
						<li key={i}>
							<Item component={component} index={i} {...props} value={v} setValue={this.setValue} />
						</li>
					))}
				</ul>
				<Button onClick={this.addEntry}>Add Entry (TODO: Localize this)</Button>
			</div>
		);
	}
}

class Item extends React.Component {

	static propTypes = {
		index: PropTypes.number.isRequired,
		setValue: PropTypes.func.isRequired
	}

	setValue = value => {
		const {setValue, index} = this.props;
		setValue(value, index);
	}

	render () {
		const {component: Component, ...props} = this.props;
		return <Component {...props} setValue={this.setValue} />;
	}
}
