
import Buttons from './Buttons';
import Nav from './Nav';
import AvatarContainer from './AvatarContainer';
import Social from './Social';
import Summary from './Summary';

//#region 🎨
const Avatar = styled(AvatarContainer)`
	width: 180px;
	height: 180px;
	grid-row: span 2;
	align-self: flex-start;

	@media (--respond-to-handhelds) {
		max-width: var(--small-avatar);
		max-height: var(--small-avatar);
	}
`;

const SummaryInfo = styled(Summary)`
	align-self: start;
	margin-top: 1.5rem;
	overflow: hidden;

	@media (--respond-to-handhelds) {
		margin-top: 0;

		.username-wrapper {
			min-height: var(--small-avatar);
		}
	}
`;

const SocialLinks = styled(Social)`
	justify-self: end;
	@media (--respond-to-handhelds) {
		grid-column: 2 / end;
		justify-self: start;
	}
`;

const Head = styled.header`
	--gap: 1.25rem;
	--small-avatar: 48px;

	display: grid;
	align-items: center;
	background-color: rgba(35, 35, 35, 0.7);
	color: white;
	margin-bottom: 5px;
	grid-template-columns: 180px auto 1fr;
	grid-template-rows: 1fr auto;
	column-gap: var(--gap);

	@media (--respond-to-handhelds) {
		--gap: 5px;

		padding: 0.5rem 0.5rem 0;
		grid-template-columns: 45px 1fr;
	}

	nav {
		grid-column: 2 / end;
		align-self: end;
		margin-left: calc(var(--gap) * -1);

		@media (--respond-to-handhelds) {
			grid-column: 1 / end;
			margin: 0.5rem -0.5rem 0;
		}
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
`;
//#endregion

export default function Header({ entity }) {
	return (
		<>
			<Buttons entity={entity} />
			<Head className="nti-profile-header">
				<Avatar entity={entity} />
				<SummaryInfo entity={entity} />
				<SocialLinks entity={entity} />
				<Nav entity={entity} />
			</Head>
		</>
	);
}
