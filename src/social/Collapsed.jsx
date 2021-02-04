import React from 'react';
import PropTypes from 'prop-types';
import { LinkTo } from '@nti/web-routing';
import { Badge, Errors, Loading, Theme } from '@nti/web-commons';

import {Container, IconContainer, ExpandButton, ContactsButton} from './parts/collapsed';
import Store from './Store';
import UsersContainer from './parts/collapsed/UsersContainer';

const styles = css`
	.loading {
		min-height: 100px;
		overflow: hidden;
	}
	.expand-container {
		position: absolute;
		bottom: 55px;
	}
	.buttons-container {
		height: 100px;
	}
`;

CollapsedPanel.propTypes = {
	toggle: PropTypes.func.isRequired,
};

export default function CollapsedPanel ( {toggle:expand, children} ) {
	const {
		loading,
		error,
	} = Store.useValue();

	const theme = Theme.useThemeProperty('icon');

	const [hiddenCountsSum, setHiddenCountsSum] = React.useState(0);

	return (
		<Container theme={theme}>
			{React.Children.map(children, child => {
				return (
					<>
						<IconContainer>{child}</IconContainer>
					</>
				);}
			)}

			<Loading.Placeholder loading={loading} fallback={(<Loading.Spinner className={styles.loading}/>)}>
				{error ? (
					<Errors.Message error={error}/>
				) : (
					<UsersContainer updateExpandBadge={(x) => setHiddenCountsSum(x)}/>
				)}
			</Loading.Placeholder>

			<div className={styles.buttonsContainer}>
				<div className={styles.expandContainer}>
					<Badge badge={hiddenCountsSum} position={Badge.POSITIONS.TOP_LEFT} {...Badge.offset(12, 5)}>
						<ExpandButton onClick={expand} />
					</Badge>
				</div>

				<LinkTo.Path to="contacts">
					<ContactsButton />
				</LinkTo.Path>
			</div>

		</Container>
	);
}
