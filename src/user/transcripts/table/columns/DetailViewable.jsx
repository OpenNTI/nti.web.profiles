import React from 'react';

import { Button } from '@nti/web-core';
import { Prompt, useToggle } from '@nti/web-commons';

import { RowDetail } from '../rowdetail/RowDetail';

export function DetailViewable({ item, ...props }) {
	const [show, toggle] = useToggle();
	return (
		<>
			<Button
				className="detail-viewable"
				onClick={toggle}
				plain
				{...props}
				css={css`
					&,
					& [data-button-label] {
						max-width: 100%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						color: inherit;
					}
				`}
			/>
			{show && (
				<Prompt.Dialog onBeforeDismiss={toggle}>
					<RowDetail item={item} />
				</Prompt.Dialog>
			)}
		</>
	);
}
