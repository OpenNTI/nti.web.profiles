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

const IdentityContainer = styled.div`
	display: flex;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	margin-top: 5px;
`;

const IconLabel = styled.span`
	color: var(--tertiary-grey);
	position: relative;
	overflow: auto;
	white-space: nowrap;

	&.email {
		padding-left: 25px;
		padding-right: 10px;
		display: inline-block;
	}
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

export function Header() {
	const user = useAppUser();

	return (
		<Container>
			<StyledAvatar me />
			<div>
				<DisplayName me />
				<IdentityContainer>
					<IconLabel>
						<Person />
						<span>{user.Username}</span>
					</IconLabel>
					<IconLabel email>
						<Envelop />
						<span>{user.email}</span>
					</IconLabel>
				</IdentityContainer>
			</div>
		</Container>
	);
}
