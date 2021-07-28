import { Avatar, DisplayName, Icons, useAppUser } from '@nti/web-commons';

const Container = styled.div`
	display: flex;
	align-items: center;
	padding: 20px;
`;

const StyledAvatar = styled(Avatar)`
	width: 81px;
	height: 81px;
	margin-right: 15px;
`;

const Name = styled(DisplayName)`
	margin-bottom: 4px;
`;

const IdentityContainer = styled.div`
	display: flex;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

const IconLabel = styled.span`
	color: var(--tertiary-grey);
	position: relative;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;

	&.email {
		max-width: 198px;
		padding-left: 25px;
		padding-right: 10px;
		display: inline-block;
	}

	&.username {
		max-width: 150px;
	}
`;

const Label = styled.span`
	text-overflow: ellipsis;
`;

const Person = styled(Icons.Person)`
	margin-right: 5px;
	color: var(--tertiary-grey);
`;

const Envelop = styled.div`
	margin-right: 5px;
	background-image: url('./assets/account-email.png');
	width: 15px;
	height: 11px;
	display: inline-block;
`;

export default function Header() {
	const user = useAppUser();

	return (
		<Container>
			<StyledAvatar me />
			<div>
				<Name me />
				<IdentityContainer>
					<IconLabel username>
						<Person />
						<Label>{user?.Username}</Label>
					</IconLabel>
					<IconLabel email>
						<Envelop />
						<Label>{user?.email}</Label>
					</IconLabel>
				</IdentityContainer>
			</div>
		</Container>
	);
}
