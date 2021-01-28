import React, { useContext } from 'react';
import { Layouts } from '@nti/web-commons';

import ChannelSelect from './ChannelSelect';
import { LayoutContext } from './parts';

const TopControls = styled.div`
	background: white;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
`;

const Spacer = styled.span`
	flex: 1 1 auto;
`;

const Switch = styled(Layouts.Switches.GridList)`
	margin-right: 30px;
`;

export default function Toolbar ({onChangeChannel, currentChannel, community, ...props}) {
	const {layout, setLayout} = useContext(LayoutContext);
	return (
		<TopControls data-testid="discussion-selection-top-controls" {...props}>
			<ChannelSelect onChange={onChangeChannel} selected={currentChannel} community={community}/>
			<Spacer/>
			<Switch onChange={setLayout} value={layout}/>
		</TopControls>
	);
}
