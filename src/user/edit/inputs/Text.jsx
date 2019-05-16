import React from 'react';
import PropTypes from 'prop-types';
import Logger from '@nti/util-logger';
import {Input} from '@nti/web-commons';
import cx from 'classnames';

const logger = Logger.get('nti-profiles:edit:inputs:string');

const expTest = exp => type => exp.test(type);

const types = [
	{
		test: type => type === 'string',
		component: Input.Text
	},
	{
		test: type => type === 'int',
		component: Input.Number
	},
	{
		test: expTest(/email/i),
		component: Input.Email
	},
	{
		test: expTest(/uri|url/i),
		component: Input.URL
	}
];

export default class StringInput extends React.PureComponent {

	static handles = ({type}) => types.some(({test}) => test(type))

	static propTypes = {
		className: PropTypes.string,
		readonly: PropTypes.bool,
		schema: PropTypes.object,
		onChange: PropTypes.func,
		onInvalid: PropTypes.func
	}

	getComponent = () => {
		const {schema: {type = 'string'} = {}} = this.props;

		const cmp = (types.find(({test}) => test(type)) || {}).component;

		if (!cmp) {
			logger.warn(`Unrecognized type (${type}). Using text input.`);
		}

		return cmp || Input.Text;
	}

	// replace empty string value with null. the server will throw an error
	// on empty strings for required fields or fields checked against a pattern (e.g. email, url)
	onChange = value => this.props.onChange(value || null);

	render () {
		const {
			className,
			schema: {
				readonly: disabled,
				max_length: maxLength,
				min_length: minLength,
				title: placeholder
			} = {},
			...props
		} = this.props;

		const Cmp = this.getComponent();

		const schemaProps = {
			disabled,
			maxLength,
			minLength,
			placeholder
		};

		return (
			<Cmp className={cx('nti-profile-string-input', className)}
				placeholder={placeholder}
				{...schemaProps}
				{...props}
				onChange={this.onChange}
			/>
		);
	}
}
