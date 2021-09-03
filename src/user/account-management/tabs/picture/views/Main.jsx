import { Avatar, Text } from '@nti/web-commons';
import { useAppUser, useService, Button, InlineList } from '@nti/web-core';
import { scoped } from '@nti/lib-locale';

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

const Link = styled(Button).attrs({ plain: true })`
	color: var(--primary-blue);
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

export function Main({ onUpload, onEdit }) {
	const service = useService();
	const user = useAppUser();

	const displayEditLink = user.avatarURL;
	const canUploadAvatar = service.capabilities.canUploadAvatar;

	return (
		<Container data-testid="main-view">
			<StyledAvatar me />
			<div>
				<Title as="h3">
					<Translate localeKey="title" />
				</Title>
				<InlineList separator="|">
					{displayEditLink && canUploadAvatar && (
						<Link onClick={onEdit} data-testid="edit-link">
							<Translate localeKey="edit" />
						</Link>
					)}
					{canUploadAvatar && (
						<Link onClick={onUpload} data-testid="upload-link">
							<Translate localeKey="upload" />
						</Link>
					)}
				</InlineList>
			</div>
		</Container>
	);
}
