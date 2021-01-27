import React from 'react';
import {Text} from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';

import {Container as BaseContainer} from './parts';

const t = scoped('nti.web.discussion-selection.NewTopic', {
	label: 'Start a new discussion\nin this channel'
});

const Container = styled(BaseContainer)`
	background: white;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 14px;
`;

const Label = styled(Text.Translator(t).Base)`
	color: var(--primary-blue);
	font-size: 0.875rem;
	font-style: italic;
	max-width: 180px;
	text-align: center;
`;

const Icon = styled.div`
	color: var(--primary-blue);
	border: 1px solid var(--primary-blue);
	border-radius: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	--size: 51px;

	height: var(--size);
	width: var(--size);

	& > i {
		transform: translate(0.5px, 2px);
	}
`;

const Glyph = styled('i').attrs({className: 'icon-discuss'})`
	font-size: 24px;
	color: var(--primary-blue);
`;

export default function NewTopic (props) {
	return (
		<Container {...props}>
			<Icon>
				<Glyph/>
			</Icon>
			<Label localeKey="label"/>
		</Container>
	);
}
