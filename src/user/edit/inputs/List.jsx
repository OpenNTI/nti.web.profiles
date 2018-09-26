import React from 'react';
import PropTypes from 'prop-types';
import {PropTypes as PT} from '@nti/lib-commons';
import {Button} from '@nti/web-commons';
import cx from 'classnames';
import {scoped} from '@nti/lib-locale';

const t = scoped('nti-web-profile.user-profile.edit.list', {
	add: 'Add Entry',
});

export default class List extends React.Component {

	static of = Component => (
		(props) => <List {...props} component={Component} />
	)

	static propTypes = {
		value: PropTypes.array,
		onChange: PropTypes.func,
		className: PropTypes.string,
		includeBlank: PropTypes.bool,
		component: PT.component
	}

	addEntry = () => {
		const {value, component, onChange} = this.props;
		const entry = component.createEmpty && component.createEmpty();
		onChange([...value, entry]);
	}

	removeEntry = (index) => {
		const {value: values, onChange} = this.props;
		values.splice(index, 1);
		onChange(values);
	}

	onChange = (value, index) => {
		const {value: values, onChange} = this.props;
		values[index] = value;
		onChange(values);
	}

	render () {
		const {
			className,
			component,
			includeBlank,
			value,
			...props
		} = this.props;

		const values = includeBlank
			? [...value, component.createEmpty && component.createEmpty()]
			: value;

		return (
			<div className={cx('nti-profile-field-list', className)}>
				<ul className="nti-profile-field-list-values">
					{(values || []).map((v, i) => (
						<li key={i}>
							<Item component={component} index={i} {...props} value={v} onChange={this.onChange} onRemove={this.removeEntry}/>
						</li>
					))}
				</ul>
				{!includeBlank && <Button className="add-entry" onClick={this.addEntry}>{t('add')}</Button>}
			</div>
		);
	}
}

class Item extends React.Component {

	static propTypes = {
		index: PropTypes.number.isRequired,
		onChange: PropTypes.func.isRequired,
		onRemove: PropTypes.func,
		component: PT.component
	}

	onChange = value => {
		const {onChange, index} = this.props;
		onChange(value, index);
	}

	onRemove = () => {
		const {onRemove, index} = this.props;
		onRemove(index);
	}

	render () {
		const {component: Component, onRemove, ...props} = this.props;
		return (
			<>
				{onRemove && <span className="remove icon-remove" onClick={this.onRemove} />}
				<Component {...props} onChange={this.onChange} />
			</>
		);
	}
}
