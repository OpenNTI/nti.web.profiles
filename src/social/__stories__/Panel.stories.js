import React from 'react';
import { action } from '@storybook/addon-actions';
import {DateIcon} from '@nti/web-calendar';

import VerticalPanel from '../Panel';

export default {
	title: 'Vertical Panel',
	component: VerticalPanel,
	argTypes: {
		expanded: { control: 'boolean' },
	},
};


export function Panel ( args ) {
	return (
		<VerticalPanel {...args} setExpanded={action('setExpanded was called')}>
			<DateIcon />
		</VerticalPanel>
	);
}
