import React from 'react';
import PropTypes from 'prop-types';
import {Parsers} from '@nti/web-editor';
import {scoped} from '@nti/lib-locale';
import cx from 'classnames';

import FieldContainer from './FieldContainer';
import Editor from './Editor';
import Text from './Text';
import Year from './Year';

const t2 = scoped('nti-web-profile.user-profile.edit.experience.fields', {
	startYear: 'Start Year',
	endYear: 'End Year',
	description: 'Description'
});

const fields = [
	'organization',
	'role',
	'startYear',
	'endYear'
];

const fieldMetaDefaults = {
	startYear: {
		className: 'year'
	},
	endYear: {
		className: 'year'
	},
};

export default class Experience extends React.PureComponent {

	static propTypes = {
		localizer: PropTypes.func,

		/**
		 * Education and professional experience items have the same structure but different
		 * field names (e.g. school vs. companyName), required fields, css class needs. This
		 * object is used to map names and other metadata to the appropriate fields.
		 *
		 * example:
		 * ```js
		 * {
		 * 	 organization: {
		 * 		name: 'school',
		 * 		required: true,
		 * 		className: 'some-other-class'
		 * 	}
		 * }
		 * ```
		 * @type {Object}
		 */
		fieldMeta: PropTypes.object,
		value: PropTypes.object,
		onChange: PropTypes.func,
		schema: PropTypes.object
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
				value = {},
				schema
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

		const editorState = Parsers.PlainText.toDraftState(v('description'));

		return (
			<div className="nti-profile-experience-item">
				{fields.map(field => (
					<FieldContainer key={field} className={css(field)} required={(schema[n(field)] || {}).required} label={t(n(field))}>
						<In schema={schema[n(field)]} name={n(field)} value={v(field)} onChange={this.onChange}/>
					</FieldContainer>
				))}
				<FieldContainer className={css('description')} required={(schema[n('description')] || {}).required} label={t(n('description'))}>
					<Editor editorState={editorState}
						onContentChange={this.onDescriptionChange}
						readOnly={(schema[n('description')] || {}).readonly}
					/>
				</FieldContainer>
			</div>
		);
	}
}

// dumb wrapper on commons inputs to feed the name back to the onChange handler
class In extends React.Component {

	static propTypes = {
		name: PropTypes.string,
		schema: PropTypes.object,
		onChange: PropTypes.func,
	}

	onChange = (value) => {
		const {name, onChange} = this.props;
		onChange(name, value);
	}

	render () {
		//if the word year is in the schema's title, render year component (caps length to 4) else render Text component (max input is 16 char)
		return this.props.schema.title.includes('year') ? <Year {...this.props} onChange={this.onChange} /> : <Text {...this.props} onChange={this.onChange} />;
	}
}
