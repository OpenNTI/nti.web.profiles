import PropTypes from 'prop-types';

import {Avatar, DisplayName, Icons} from '@nti/web-commons';

import Store from '../Store';

const Container = styled.div`
	display: flex;
`;

const IconLabel = styled.div`
	display: inline;
	color: var(--primary-grey);
`;

const Label = styled.span`
	text-overflow: ellipsis;
`;

Header.propTypes = {
	user: PropTypes.object,
};

export default function Header () {
	const { user } = Store.useValue();

	return (
		<Container>
			<Avatar entity={user} />
			<div>
				<DisplayName entity={user} />
				<div>
					<IconLabel>
						<Icons.Person />
						<Label>{user.Username}</Label>
					</IconLabel>
					<IconLabel>
						<Icons.Check />
						<Label>{user.email}</Label>
					</IconLabel>
				</div>
			</div>
		</Container>
	);

}
