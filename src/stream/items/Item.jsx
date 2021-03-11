import React from 'react';
import PropTypes from 'prop-types';

import { Error } from '@nti/web-commons';
import { reportError } from '@nti/web-client';

import Registry from './Registry';

const registry = Registry.getInstance();

export default class StreamItem extends React.Component {
	static canRender(item) {
		return !!registry.getItemFor(item.MimeType);
	}

	static propTypes = {
		item: PropTypes.object,
		context: PropTypes.object,
		readOnly: PropTypes.bool,
	};

	state = {};

	componentDidCatch(error) {
		reportError(error);
		this.setState({ error });
	}

	render() {
		const {
			props: { item, context },
			state: { error },
		} = this;

		if (error) {
			return (
				<Error inline error={error}>
					There was an error attempting to render:{' '}
					{(item || {}).MimeType || 'Unknown Item'}
				</Error>
			);
		}

		const Cmp = registry.getItemFor(item.MimeType);

		return <Cmp item={item} context={context} />;
	}
}
