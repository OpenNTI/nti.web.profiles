import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Input } from '@nti/web-commons';

export default class SalltProfileTextInput extends React.Component {
	static propTypes = {
		field: PropTypes.shape({
			schema: PropTypes.shape({
				description: PropTypes.string,
				name: PropTypes.string,
				title: PropTypes.string,
				choices: PropTypes.array,
			}),
			error: PropTypes.shape({
				message: PropTypes.string,
				code: PropTypes.string,
			}),
		}).isRequired,
		value: PropTypes.string,
		onChange: PropTypes.func,
	};

	state = {};

	componentDidMount() {
		this.setupFor(this.props);
	}

	componentDidUpdate(prevProps) {
		const { value } = this.props;
		const { value: oldValue } = prevProps;

		if (oldValue !== value) {
			this.setupFor(this.props);
		}
	}

	setupFor(props) {
		const { value } = props;

		this.setState({ value });
	}

	onChange = value => {
		value = value || null;

		this.setState({
			value,
		});

		clearTimeout(this.onChangeTimeout);

		this.onChangeTimeout = setTimeout(() => {
			const { onChange, field, value: oldValue } = this.props;
			const { value: newValue } = this.state;

			if (onChange && oldValue !== newValue) {
				onChange(field, newValue);
			}
		}, 500);
	};

	render() {
		const {
			field: { schema, error },
		} = this.props;
		const { value } = this.state;
		const { message, code } = error ?? {};
		const showMessage = message && code !== 'RequiredMissing';

		return (
			<div
				className={cx(
					'profile-update-sallt-profile-text-input',
					schema.name
				)}
			>
				<Input.Label label={schema.description}>
					<Input.Text
						placeholder={schema.title}
						value={value}
						onChange={this.onChange}
					/>
				</Input.Label>
				{showMessage ? (
					<div className="profile-update-warning">{message}</div>
				) : null}
			</div>
		);
	}
}
