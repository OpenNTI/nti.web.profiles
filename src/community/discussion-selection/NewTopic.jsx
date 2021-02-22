import React from 'react';
import { Icons, Text } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';

import {
	Container as BaseContainer,
	Icon as BaseIcon,
	Spacer,
	useLayout,
} from './parts';

const t = scoped('nti.web.discussion-selection.NewTopic', {
	label: 'Start a new discussion\nin this channel',
});

const Container = styled(BaseContainer).attrs(useLayout())`
	&.layout-grid,
	&.layout-list {
		background: white;
		color: var(--primary-blue);
	}

	&.layout-grid {
		display: flex;

		/* gap: 14px; */
		flex-direction: column;
		align-items: center;
		justify-content: center;

		/* This selector works around missing gap in safari */
		& > :first-child {
			margin-bottom: 14px;
		}
	}
`;

const Label = styled(Text.Translator(t).Base).attrs(useLayout())`
	font-style: italic;

	&.layout-grid {
		font-size: 0.875rem;
		max-width: 180px;
		text-align: center;
	}

	&.layout-list {
		white-space: nowrap;
		font-size: 1rem;
		font-weight: 600;
		letter-spacing: 0;
		line-height: 2;
	}
`;

const Icon = styled(BaseIcon).attrs(useLayout())`
	color: var(--primary-blue);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	&.layout-list {
		background: var(--primary-blue);
		color: white;
	}

	&.layout-grid {
		border: 1px solid var(--primary-blue);
		border-radius: 100%;

		--size: 51px;

		height: var(--size);
		width: var(--size);
	}

	& > i {
		transform: translate(0.5px, 2px);
	}
`;

const Glyph = styled('i').attrs(useLayout({ className: 'icon-discuss' }))`
	font-size: 24px;
	color: currentColor;

	&.layout-list {
		font-size: 32px;
	}
`;

const PlusSign = styled(Icons.Add.Circled).attrs(useLayout())`
	flex: 0 0 auto;
	display: none;

	&.layout-list {
		display: block;
	}
`;

export default function NewTopic(props) {
	return (
		<Container {...props}>
			<Icon>
				<Glyph />
			</Icon>
			<Label localeKey="label" />
			<Spacer />
			<PlusSign />
		</Container>
	);
}
