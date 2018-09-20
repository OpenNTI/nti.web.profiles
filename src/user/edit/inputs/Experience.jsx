import React from 'react';
import PropTypes from 'prop-types';
import {PropTypes as PT} from '@nti/lib-commons';
import {Parsers, Editor} from '@nti/web-editor';
import {Input} from '@nti/web-commons';

import FieldContainer from '../FieldContainer';

export const ORGANIZATION = 'organization';
export const DEGREE = 'degree';
export const START_YEAR = 'startYear';
export const END_YEAR = 'endYear';
export const DESCRIPTION = 'description';

const passthrough = x => x;

export default class Experience extends React.Component {

	static propTypes = {
		localizer: PropTypes.func,
		value: PropTypes.object,
		setValue: PropTypes.func
	}

	static createEmpty = () => ({
		MimeType: 'application/vnd.nextthought.profile.educationalexperience'
	})

	onChange = ({target: {name, value: fieldValue}}) => {
		const {value, setValue} = this.props;

		const newValue = {
			...(value || {}),
			[name]: fieldValue
		};

		setValue(newValue);
	}

	onDescriptionChange = (value) => {

		value.toJSON = () => Parsers.PlainText.fromDraftState(value)[0];

		this.onChange({
			target: {
				name: 'description',
				value
			}
		});
	}

	render () {
		const {
			localizer: t = passthrough,
			value: {
				school,
				degree,
				startYear,
				endYear,
				description
			} = {}
		} = this.props;

		const editorState = Parsers.PlainText.toDraftState(description);

		return (
			<div className="nti-profile-experience-item">
				<FieldContainer label={t(ORGANIZATION)}>
					<In component={Input.Text} name="school" value={school} onChange={this.onChange} />
				</FieldContainer>
				<FieldContainer label={t(DEGREE)}>
					<In component={Input.Text} name="degree" value={degree} onChange={this.onChange} />
				</FieldContainer>
				<FieldContainer label={t(START_YEAR)}>
					<In component={Input.Number} maxLength="4" name="startYear" value={startYear} onChange={this.onChange} />
				</FieldContainer>
				<FieldContainer label={t(END_YEAR)}>
					<In component={Input.Number} maxLength="4" name="endYear" value={endYear} onChange={this.onChange} />
				</FieldContainer>
				<FieldContainer label={t(DESCRIPTION)}>
					<Editor editorState={editorState} onContentChange={this.onDescriptionChange} />
				</FieldContainer>
			</div>
		);
	}
}

// dumb wrapper on commons inputs to include target/name/value in change events
class In extends React.Component {

	static propTypes = {
		component: PT.component,
		name: PropTypes.string,
		onChange: PropTypes.func
	}

	onChange = (value) => {
		const {name, onChange} = this.props;
		onChange({
			target: {
				name,
				value
			}
		});
	}

	render () {
		const {component: Cmp, ...props} = this.props;
		return <Cmp {...props} onChange={this.onChange} />;
	}
}
