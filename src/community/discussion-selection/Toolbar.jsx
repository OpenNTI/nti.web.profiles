import React, { useContext, useEffect, useRef, useState } from 'react';

import { Layouts } from '@nti/web-commons';

import ChannelSelect from './ChannelSelect';
import { LayoutContext } from './parts';
import Search from './Search';

const TopControls = styled.div`
	background: white;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	gap: 16px;
	/* position relative and z-index of 1 are required to make the box-shadow drop over the sibling */
	position: relative;
	z-index: 1;
`;

const Spacer = styled.span`
	flex: 1 1 auto;
`;

const Switch = styled(Layouts.Switches.GridList)`
	margin-right: 30px;
`;

export default function Toolbar({
	onChangeChannel,
	currentChannel,
	community,
	onSearch,
	...props
}) {
	const { layout, setLayout } = useContext(LayoutContext);
	const [search, setSearch] = useState('');

	const prev = useRef(search);
	useEffect(() => {
		if (prev.current !== search) {
			prev.current = search;
			onSearch?.(search || null);
		}
	});

	return (
		<TopControls data-testid="discussion-selection-top-controls" {...props}>
			<ChannelSelect
				onChange={onChangeChannel}
				selected={currentChannel}
				community={community}
			/>
			<Spacer />
			<Search onChange={setSearch} value={search} />
			<Switch onChange={setLayout} value={layout} />
		</TopControls>
	);
}
