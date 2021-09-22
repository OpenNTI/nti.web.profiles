import './List.scss';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Button } from '@nti/web-core';
import { scoped } from '@nti/lib-locale';

const t = scoped('nti-web-profile.user-profile.edit.list', {
	add: 'Add Entry',
});

export default class List extends React.Component {
	static of = component => {
		return class extends List {
			static displayName = `ListOf${
				component.displayName || component.name
			}`;

			Component = component;
		};
	};

	// suppress FieldContainer label
	static fieldLabel = () => null;

	static propTypes = {
		value: PropTypes.array,
		onChange: PropTypes.func,
		className: PropTypes.string,
		includeBlank: PropTypes.bool,
		schema: PropTypes.shape({
			readonly: PropTypes.bool,
			value_type: PropTypes.shape({
				schema: PropTypes.object,
			}),
		}),
		component: PropTypes.elementType,
	};

	addEntry = () => {
		const { value, component = this.Component, onChange } = this.props;
		const entry = component.createEmpty && component.createEmpty();
		onChange([...(value || []), entry]);
	};

	removeEntry = index => {
		const { value: values, onChange } = this.props;
		values.splice(index, 1);
		onChange(values);
	};

	onChange = (value, index) => {
		const { value: values, onChange } = this.props;
		values[index] = value;
		onChange(values);
	};

	getComponent() {
		return this.Component || this.props.component;
	}

	render() {
		const {
			className,
			includeBlank,
			value,
			schema: { readonly, value_type: { schema } = {} } = {},
			...props
		} = this.props;

		const component = this.getComponent();

		const values = includeBlank
			? [...value, component.createEmpty && component.createEmpty()]
			: value;

		return (
			<div className={cx('nti-profile-field-list', className)}>
				<ul className="nti-profile-field-list-values">
					{(values || []).map((v, i) => (
						<li key={i}>
							<Item
								component={component}
								index={i}
								{...props}
								schema={schema}
								value={v}
								onChange={this.onChange}
								onRemove={this.removeEntry}
							/>
						</li>
					))}
				</ul>
				{!readonly && !includeBlank && (
					<Button className="add-entry" onClick={this.addEntry}>
						{t('add')}
					</Button>
				)}
			</div>
		);
	}
}

class Item extends React.Component {
	static propTypes = {
		index: PropTypes.number.isRequired,
		onChange: PropTypes.func.isRequired,
		onRemove: PropTypes.func,
		schema: PropTypes.object,
		component: PropTypes.elementType,
	};

	onChange = value => {
		const { onChange, index } = this.props;
		onChange(value, index);
	};

	onRemove = () => {
		const { onRemove, index } = this.props;
		onRemove(index);
	};

	render() {
		const {
			component: Component,
			onRemove,
			schema,
			schema: { readonly } = {},
			...props
		} = this.props;

		return (
			<>
				{!readonly && onRemove && (
					<span
						className="remove icon-remove"
						onClick={this.onRemove}
					/>
				)}
				<Component
					{...props}
					schema={schema}
					onChange={this.onChange}
				/>
			</>
		);
	}
}
