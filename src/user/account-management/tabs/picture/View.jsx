import {
	Loading,
	Switch,
	useAppUser,
	useAsyncValue,
	useReducerState,
} from '@nti/web-commons';
import { ImageEditor } from '@nti/web-whiteboard';

import { Edit, Main, Upload } from './views';

const useImage = user => {
	const { avatarURL: uri } = user;
	const reloadNonce = user;
	return useAsyncValue(uri, () => ImageEditor.getImg(uri), reloadNonce);
};

export default function PictureTab() {
	const user = useAppUser();
	const image = useImage(user);

	const [{ active, baseImage, croppedImage, loading }, setState] =
		useReducerState({
			active: 'main',
			baseImage: image,
			croppedImage: null,
			loading: false,
			error: null,
		});

	const reset = () => setState({ active: 'main' });

	const onImageCroppingSave = async croppedImage => {
		setState({
			croppedImage,
			active: 'main',
			loading: true,
			baseImage: croppedImage,
		});
		try {
			await user.save({ avatarURL: croppedImage.src });
		} catch (e) {
			setState({ error: e });
		} finally {
			setState({ loading: false });
		}
	};

	const onBaseImageSave = baseImage =>
		setState({ baseImage, active: 'crop' });

	return (
		<Loading.Placeholder
			loading={loading}
			fallback={<Loading.Spinner.Large />}
		>
			<Switch.Container active={active}>
				<Switch.Item
					name="main"
					component={Main}
					onUpload={() => setState({ active: 'picker' })}
					onEdit={() => setState({ active: 'crop' })}
				/>
				<Switch.Item
					name="crop"
					component={Edit}
					onCancel={reset}
					onSave={onImageCroppingSave}
					image={baseImage}
				/>
				<Switch.Item
					name="picker"
					component={Upload}
					onCancel={reset}
					onSave={onBaseImageSave}
					image={croppedImage}
					baseImage={baseImage}
				/>
			</Switch.Container>
		</Loading.Placeholder>
	);
}
