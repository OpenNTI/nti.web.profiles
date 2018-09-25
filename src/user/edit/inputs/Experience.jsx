import React from 'react';
import PropTypes from 'prop-types';
import {PropTypes as PT} from '@nti/lib-commons';
import {Parsers} from '@nti/web-editor';
import {Input} from '@nti/web-commons';
import {scoped} from '@nti/lib-locale';

import FieldContainer from '../FieldContainer';

import Editor from './Editor';

const t2 = scoped('nti-web-profile.user-profile.edit.experience.fields', {
	startYear: 'Start Year',
	endYear: 'End Year',
	description: 'Description'
});

export default class Experience extends React.Component {

	static propTypes = {
		localizer: PropTypes.func,

		/**
		 * Education and professional experience items have the same structure but different
		 * field names (e.g. school vs. companyName). This object is used to map education field
		 * names to the professional field names.
		 * @type {Object}
		 */
		fieldMap: PropTypes.object,
		value: PropTypes.object,
		onChange: PropTypes.func
	}

	onChange = (name, value) => {
		const {value: previous, onChange} = this.props;

		const newValue = {
			...(previous || {}),
			[name]: value
		};

		onChange(newValue);
	}

	onDescriptionChange = (value) => {
		value.toJSON = () => Parsers.PlainText.fromDraftState(value)[0];
		this.onChange('description', value);
	}

	render () {
		const {
			localizer,
			fieldMap = {},
			value = {}
		} = this.props;

		const t = x => localizer && (!localizer.isMissing(x) || t2.isMissing(x))
			? localizer(x)
			: t2(x);

		// get mapped field name
		const n = f => fieldMap[f] || f;

		// get mapped field value
		const v = f => value[n(f)];

		const editorState = Parsers.PlainText.toDraftState(v('description'));

		return (
			<div className="nti-profile-experience-item">
				<FieldContainer className="organization" label={t(n('organization'))}>
					<In component={Input.Text} name={n('organization')} value={v('organization')} onChange={this.onChange} />
				</FieldContainer>
				<FieldContainer className="role" label={t(n('role'))}>
					<In component={Input.Text} name={n('role')} value={v('role')} onChange={this.onChange} />
				</FieldContainer>
				<FieldContainer className="year start-year" label={t(n('startYear'))}>
					<In component={Input.Number} maxLength="4" name={n('startYear')} value={v('startYear')} onChange={this.onChange} />
				</FieldContainer>
				<FieldContainer className="year end-year" label={t(n('endYear'))}>
					<In component={Input.Number} maxLength="4" name={n('endYear')} value={v('endYear')} onChange={this.onChange} />
				</FieldContainer>
				<FieldContainer className="description" label={t(n('description'))}>
					<Editor editorState={editorState} onContentChange={this.onDescriptionChange} />
				</FieldContainer>
			</div>
		);
	}
}

// dumb wrapper on commons inputs to include name in change events
class In extends React.Component {

	static propTypes = {
		component: PT.component,
		name: PropTypes.string,
		onChange: PropTypes.func
	}

	onChange = (value) => {
		const {name, onChange} = this.props;
		onChange(name, value);
	}

	render () {
		const {component: Cmp, ...props} = this.props;
		return <Cmp {...props} onChange={this.onChange} />;
	}
}
