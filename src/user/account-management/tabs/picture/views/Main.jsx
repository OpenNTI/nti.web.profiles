import { Avatar, Button, Text } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';

import Store from '../../../Store';

const Container = styled.div`
	display: flex;
	padding: 20px 20px;
`;

const StyledAvatar = styled(Avatar)`
	width: 81px;
	height: 81px;
	margin-right: 15px;
`;

const Title = styled(Text.Base)`
	margin-bottom: 10px;
`;

const LinksContainer = styled.div`
	:first-child {
		margin-right: 5px;
	}

	:first-child::after {
		content: '|';
		position: absolute;
		right: 0;
		color: var(--tertiary-grey);
		width: 3px;
		font-size: 14px;
	}
`;

const Link = styled(Button).attrs({ plain: true })`
	color: var(--primary-blue);
	font-size: 12px;
	text-decoration: none;
	cursor: pointer;

	&:link {
		text-decoration: none;
	}

	&:hover {
		text-decoration: underline;
	}

	&:not(:last-child)::after {
		content: ' | ';
		font-size: 1.1em;
		display: contents;
		margin: 0 0.3em;
		text-decoration: none !important;
		color: var(--primary-blue);
	}
`;

const translation = scoped(
	'nti.profiles.user.account-management.tabs.picture.views.main',
	{
		title: 'Profile Picture',
		edit: 'Edit',
		upload: 'Upload New Photo',
	}
);

const Translate = Text.Translator(translation);

export default function MainView({ onUpload, onEdit }) {
	const { user } = Store.useValue();

	const displayEditLink = user.avatarURL;

	return (
		<Container>
			<StyledAvatar entity={user} />
			<div>
				<Title as="h3">
					<Translate localeKey="title" />
				</Title>
				<LinksContainer>
					{displayEditLink && (
						<Link onClick={onEdit}>
							<Translate localeKey="edit" />
						</Link>
					)}
					<Link onClick={onUpload}>
						<Translate localeKey="upload" />
					</Link>
				</LinksContainer>
			</div>
		</Container>
	);
}
