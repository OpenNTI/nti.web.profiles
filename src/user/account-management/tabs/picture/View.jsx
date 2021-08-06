import { Switch, useAppUser, useReducerState } from '@nti/web-commons';

import { useImage } from './Hooks';
import { Edit, Main, Upload } from './views';

export default function PictureTab() {
	const user = useAppUser();
	const image = useImage(user);

	const [{ active, baseImage = image }, setState, reset] = useReducerState({
		active: 'main',
		baseImage: image,
	});

	const onImageCroppingSave = async croppedImage => {
		try {
			await user.save({ avatarURL: croppedImage.src });
		} catch (e) {
			setState({ error: e });
		} finally {
			setState({
				active: 'main',
				baseImage: croppedImage,
			});
		}
	};

	const onBaseImageSave = baseImage =>
		setState({ baseImage, active: 'edit' });

	return (
		<Switch.Container active={active}>
			<Switch.Item
				name="main"
				component={Main}
				onUpload={() => setState({ active: 'upload' })}
				onEdit={() => setState({ active: 'edit' })}
			/>
			<Switch.Item
				name="edit"
				component={Edit}
				onCancel={reset}
				onSave={onImageCroppingSave}
				image={baseImage}
			/>
			<Switch.Item
				name="upload"
				component={Upload}
				onCancel={reset}
				onSave={onBaseImageSave}
				baseImage={baseImage}
			/>
		</Switch.Container>
	);
}
