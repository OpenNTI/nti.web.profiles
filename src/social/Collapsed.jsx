import React from 'react';
import PropTypes from 'prop-types';
import { LinkTo } from '@nti/web-routing';
import { Badge, Errors, Loading } from '@nti/web-commons';

import {Container, IconContainer, ExpandButton, ContactsButton} from './parts/collapsed';
import Store from './Store';
import UsersContainer from './parts/collapsed/UsersContainer';

const Spinner = styled(Loading.Spinner)`
	min-height: 100px;
	overflow: hidden;
`;
const ExpandContainer = styled.div`
	position: absolute;
	bottom: 55px;
`;
const ButtonsContainer = styled.div`
	height: 100px;
`;

CollapsedPanel.propTypes = {
	toggle: PropTypes.func.isRequired,
};

export default function CollapsedPanel ( {toggle:expand, children} ) {
	const {
		loading,
		error,
	} = Store.useValue();

	const [hiddenCountsSum, setHiddenCountsSum] = React.useState(0);

	return (
		<Container>
			{React.Children.map(children, child => {
				return (
					<>
						<IconContainer>{child}</IconContainer>
					</>
				);}
			)}

			<Loading.Placeholder loading={loading} fallback={(<Spinner/>)}>
				{error ? (
					<Errors.Message error={error}/>
				) : (
					<UsersContainer updateExpandBadge={(x) => setHiddenCountsSum(x)}/>
				)}
			</Loading.Placeholder>

			<ButtonsContainer>
				<ExpandContainer>
					<Badge badge={hiddenCountsSum} position={Badge.POSITIONS.TOP_LEFT} {...Badge.offset(12, 5)}>
						<ExpandButton onClick={expand} />
					</Badge>
				</ExpandContainer>

				<LinkTo.Path to="contacts">
					<ContactsButton />
				</LinkTo.Path>
			</ButtonsContainer>

		</Container>
	);
}
