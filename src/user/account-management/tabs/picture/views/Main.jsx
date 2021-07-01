import PropTypes from 'prop-types';

import {Avatar, Button, Text} from '@nti/web-commons';
import {scoped} from '@nti/lib-locale'

import Store from '../../../Store';

import VIEWS from '.';

const Container = styled.div`
	display: flex;
`;

const StyledAvatar = styled(Avatar)`
	margin-right: 10px;
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

const translation = scoped('nti.profiles.user.account-management.tabs.picture.views.main', {
	title: 'Profile Picture',
	edit: 'Edit',
	upload: 'Upload new Photo',
});

const Translate = Text.Translator(translation);

MainView.PropType = {
	changeView: PropTypes.func,
};

export default function MainView ( { changeView } ) {
	const {user} = Store.useValue();

	const handleEditClick = () => {
		changeView(VIEWS.EDIT);
	};

	const handleUploadClick = () => {
		changeView(VIEWS.UPLOAD);
	};

	return (
		<Container>
			<StyledAvatar entity={user} />
			<div>
				<Title as="h3"><Translate localeKey="title"/></Title>
				<LinksContainer>
					<Button as="a" onClick={handleEditClick}><Translate localeKey="edit"/></Button>
					<Button as="a" onClick={handleUploadClick}><Translate localeKey="upload"/></Button>
				</LinksContainer>
			</div>
		</Container>
	);
}
