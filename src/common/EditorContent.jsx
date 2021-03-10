import React from 'react';
import PropTypes from 'prop-types';

import { rawContent } from '@nti/lib-commons';

const stringsOnly = x => typeof x === 'string';

// renders content produced by nti-web-editor as read-only.
// does not provide editing capability.
export default function EditorContent({ content = [] }) {
	if (!Array.isArray(content)) {
		content = [content];
	}

	return (
		<React.Fragment>
			{content.filter(stringsOnly).map((x, i) => (
				<div key={i} {...rawContent(x)} />
			))}
		</React.Fragment>
	);
}

EditorContent.propTypes = {
	content: PropTypes.array,
};
