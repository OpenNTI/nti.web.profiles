import React, { useCallback, useRef } from 'react';
import { Monitor } from '@nti/web-commons';

import { Container } from './parts';

const Box = styled(Container)`
	background: white;
`;

const Shimmer = styled.div`
	animation: shimmer 2s infinite;
	background: linear-gradient(to right, #eff1f3 4%, #e2e2e2 25%, #eff1f3 36%);
	background-size: 1000px 100%;
	border-radius: 4px;

	@keyframes shimmer {
		0% { background-position: -1000px 0; }
		100% { background-position: 1000px 0; }
	}
`;

const Avatar = styled(Shimmer)`
	height: 120px;
	margin: 2px;
`;

const Label = styled(Shimmer)`
	margin: 4px;
	height: 1em;
`;

export default function Placeholder ({load}) {
	const trip = useRef(false);

	const onScreen = useCallback((visible) => {

		if (!visible || trip.current) {
			return;
		}

		// This component will only ever call this once. To make it call it again, mount a new instance. (change the key prop to a new value)
		trip.current = true;
		load();

	}, [load]);

	return (
		<Monitor.OnScreen as={Box} onChange={onScreen}>
			<Avatar/>
			<Label style={{height: 26, width: '90%'}}/>
			<Label style={{width: '80%'}}/>
		</Monitor.OnScreen>
	);
}
