import React, { useCallback, useRef } from 'react';

import { Monitor } from '@nti/web-commons';

import { Container, Spacer, useLayout } from './parts';

const Box = styled(Container)`
	cursor: default;
	background: white !important;
	animation: show 2s forwards;
	opacity: 0;

	@keyframes show {
		100% {
			opacity: 1;
		}
	}
`;

const Shimmer = styled.div`
	animation: shimmer 2s infinite;
	background: linear-gradient(to right, #eff1f3 4%, #e2e2e2 25%, #eff1f3 36%);
	background-size: 1000px 100%;

	@keyframes shimmer {
		0% {
			background-position: -1000px 0;
		}
		100% {
			background-position: 1000px 0;
		}
	}
`;

const Avatar = styled(Shimmer).attrs(useLayout())`
	&.layout-grid {
		margin: 2px;
		height: 120px;
		border-radius: 4px;
	}

	&.layout-list {
		flex: 0 0 auto;
		width: 60px;
		height: 48px;
	}
`;

const Label = styled(Shimmer).attrs(useLayout())`
	height: 1rem;
	width: 100px;
	flex: 0 0 auto;
	border-radius: 4px;

	&.layout-grid {
		margin: 4px;

		&.title {
			height: 26px;
			width: 90%;
		}
	}

	&.layout-list {
		&.title {
			height: 18px;
			width: 50%;
		}
	}
`;

export default function Placeholder({ load }) {
	const trip = useRef(false);

	const onScreen = useCallback(
		visible => {
			if (!visible || trip.current) {
				return;
			}

			// This component will only ever call this once. To make it call it again, mount a new instance. (change the key prop to a new value)
			trip.current = true;
			load();
		},
		[load]
	);

	return (
		<Monitor.OnScreen as={Box} onChange={onScreen}>
			<Avatar />
			<Label title />
			<Spacer />
			<Label />
		</Monitor.OnScreen>
	);
}
