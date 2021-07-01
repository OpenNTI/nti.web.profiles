import PropTypes from 'prop-types';

import {Icons, Input, Text} from '@nti/web-commons';
import {scoped} from '@nti/lib-locale';

import VIEWS from '.';

const FileInput = styled(Input.FileInputWrapper)`
	display: flex;
	flex-direction: column;
	align-items: center;
	vertical-align: middle;
	width: 100%;
	height: 100%;
	cursor: pointer;
`;

const BlueText = styled(Text.Base)`
	color: var(--primary-blue);
	display: inline;
`;

const t = scoped('nti.web.profiles.user.account-management.tabs.picture.views.upload', {
	uploadSubText: 'Drop image here or ',
	chooseAFile: 'Choose a File',
});

const Translate = Text.Translator(t);

UploadView.PropType = {
	changeView: PropTypes.func,
};

export default function UploadView ( { changeView } ) {
	const handleChange = (files = [], e) => {
		const file = files[0];
		const reader = new FileReader();

		reader.onload = () => {
			const { result: source } = reader;

			changeView(VIEWS.EDIT, {
				file,
				filename: file.name,
				source,
			});
		}
	};

	return (
		<FileInput onChange={handleChange}>
			<Icons.Image />
			<div>
				<Text.Base as="p">
					<Translate localeKey="uploadSubText" />
					<BlueText><Translate localeKey="chooseAFile" /></BlueText>
				</Text.Base>
			</div>
		</FileInput>
	);
}
