import { Avatar, DisplayName, Icons } from '@nti/web-commons';
import { useAppUser } from '@nti/web-core';

const Container = styled.div`
	display: flex;
	align-items: center;
	padding: 20px;
	& > div {
		flex: 0 1 auto;
		overflow: hidden;
	}
`;

const StyledAvatar = styled(Avatar)`
	width: 81px;
	height: 81px;
	margin-right: 15px;
`;

const IdentityContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	justify-items: flex-start;
	overflow: hidden;
	text-overflow: ellipsis;
	margin-top: 5px;
	gap: 0 25px;
`;

const IconLabel = styled.span`
	color: var(--tertiary-grey);
	white-space: nowrap;
	flex: 0 1 auto;
	overflow: hidden;
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
					<IconLabel>
						<Envelop />
						<span>{user.email}</span>
					</IconLabel>
				</IdentityContainer>
			</div>
		</Container>
	);
}
