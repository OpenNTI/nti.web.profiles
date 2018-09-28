import React from 'react';
import PropTypes from 'prop-types';
import {PropTypes as PT} from '@nti/lib-commons';
import {Parsers} from '@nti/web-editor';
import {Input} from '@nti/web-commons';
import {scoped} from '@nti/lib-locale';
import cx from 'classnames';

import FieldContainer from '../FieldContainer';

import Editor from './Editor';

const t2 = scoped('nti-web-profile.user-profile.edit.experience.fields', {
	startYear: 'Start Year',
	endYear: 'End Year',
	description: 'Description'
});

const fieldMetaDefaults = {
	organization: {
		required: true
	},
	startYear: {
		className: 'year',
		required: true
	},
	endYear: {
		className: 'year'
	},
};

export default class Experience extends React.Component {

	static propTypes = {
		localizer: PropTypes.func,

		/**
		 * Education and professional experience items have the same structure but different
		 * field names (e.g. school vs. companyName), required fields, css class needs. This
		 * object is used to map names and other metadata to the appropriate fields.
		 *
		 * example:
		 * {
		 * 	 organization: {
		 * 		name: 'school',
		 * 		required: true,
		 * 		className: 'some-other-class'
		 * 	}
		 * }
		 *
		 * @type {Object}
		 */
		fieldMeta: PropTypes.object,
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

	fieldMeta = f => {
		const {fieldMeta = {}} = this.props;

		return {
			...(fieldMetaDefaults[f] || {}),
			...(fieldMeta[f] || {})
		};
	}

	css = (field) => {
		const {required, className} = this.fieldMeta(field);
		return cx(field, className, {required});
	}

	render () {
		const {
			props: {
				localizer,
				value = {}
			},
			css
		} = this;

		// use our localizer (t2) only when it has the given entry and this.props.localizer doesn't
		const t = x => localizer && (!localizer.isMissing(x) || t2.isMissing(x))
			? localizer(x)
			: t2(x);

		// get mapped field name
		const n = f => this.fieldMeta(f).name || f;

		// get mapped field value
		const v = f => value[n(f)];

		// required?
		const r = f => this.fieldMeta(f).required;

		const editorState = Parsers.PlainText.toDraftState(v('description'));

		const fields = {
			organization: {
				component: Input.Text
			},
			role: {
				component: Input.Text
			},
			startYear: {
				component: Input.Number,
				maxLength: 4,
			},
			endYear: {
				component: Input.Number,
				maxLength: 4,
			},
		};

		return (
			<div className="nti-profile-experience-item">
				{Object.entries(fields).map(([key, props]) => (
					<FieldContainer key={key} className={css(key)} label={t(n(key))}>
						<In {...props} name={n(key)} value={v(key)} onChange={this.onChange} required={r(key)} />
					</FieldContainer>
				))}
				<FieldContainer className={css('description')} label={t(n('description'))}>
					<Editor editorState={editorState} onContentChange={this.onDescriptionChange} />
				</FieldContainer>
			</div>
		);
	}
}

// dumb wrapper on commons inputs to feed the name back to the onChange handler
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
