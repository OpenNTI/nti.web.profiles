import React from 'react';
import PropTypes from 'prop-types';
import {PropTypes as PT} from '@nti/lib-commons';
import {Button} from '@nti/web-commons';

export default class List extends React.Component {

	static of = Component => (
		(props) => <List {...props} component={Component} />
	)

	static propTypes = {
		onChange: PropTypes.func,
		component: PT.component
	}

	addEntry = () => {
		const {value, component, onChange} = this.props;
		const entry = component.createEmpty && component.createEmpty();
		onChange([...value, entry]);
	}

	onChange = (value, index) => {
		const {value: values, onChange} = this.props;
		values[index] = value;
		onChange(values);
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
							<Item component={component} index={i} {...props} value={v} onChange={this.onChange} />
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
		onChange: PropTypes.func.isRequired
	}

	onChange = value => {
		const {onChange, index} = this.props;
		onChange(value, index);
	}

	render () {
		const {component: Component, ...props} = this.props;
		return <Component {...props} onChange={this.onChange} />;
	}
}
