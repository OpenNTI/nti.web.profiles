import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {scoped} from '@nti/lib-locale';
import {Input} from '@nti/web-commons';

import Styles from './Channel.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-profiles.community.edit.form.channels.Channel', {
	title: {
		placeholder: 'Channel Title...'
	},
	description: {
		placeholder: 'Add a Description (Optional)'
	}
});

export default class ChannelsFieldChannel extends React.Component {
	static propTypes = {
		channel: PropTypes.shape({
			title: PropTypes.string,
			description: PropTypes.string,
			editable: PropTypes.bool
		}),
		onChange: PropTypes.func,
		errors: PropTypes.object
	}

	setTitle = (title) => {
		const {channel, onChange} = this.props;

		if (onChange) {
			onChange({...channel, title});
		} 
	}


	setDescription = (description) => {
		const {channel, onChange} = this.props;

		if (onChange) {
			onChange({...channel, description});
		}
	}

	render () {
		return (
			<div className={cx('channel')}>
				{this.renderTitle()}
				{this.renderDescription()}
			</div>
		);
	}

	renderTitle () {
		const {channel, errors} = this.props;
		const error = errors && errors.title;

		return (
			<Input.Label className={cx('input-label')} error={error}>
				<Input.Text
					className={cx('text-input')}
					value={channel.title}
					placeholder={t('title.placeholder')}
					onChange={this.setTitle}
					readOnly={!channel.editable}
				/>
			</Input.Label>
		);
	}

	renderDescription () {
		const {channel, errors} = this.props;
		const error = errors && errors.description;

		return (
			<Input.Label className={cx('input-label')} error={error}>
				<Input.Text
					className={cx('text-input')}
					value={channel.description}
					placeholder={t('description.placeholder')}
					onChange={this.setDescription}
					readOnly={!channel.editable}
				/>
			</Input.Label>
		);
	}
}
