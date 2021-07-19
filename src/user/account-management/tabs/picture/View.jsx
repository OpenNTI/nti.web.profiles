import { useState } from 'react';

import { Loading, Switch } from '@nti/web-commons';

import Store from '../../Store';

import { Edit, Main, Upload } from './views';

export default function PictureTab() {
	const { saveImage, image, loading } = Store.useValue();

	const [active, setActive] = useState('main');
	const [baseImage, setBaseImage] = useState(image);
	const [croppedImage, setCroppedImage] = useState();

	const onImageCroppingSave = croppedImage => {
		setCroppedImage(croppedImage);
		saveImage(croppedImage);
		setActive('main');
	};

	const onBaseImageSave = baseImage => {
		setBaseImage(baseImage);
		setActive('crop');
	};

	const onCancel = () => {
		setBaseImage(image);
		setActive('main');
	};

	return (
		<Loading.Placeholder
			loading={loading}
			fallback={<Loading.Spinner.Large />}
		>
			<Switch.Container active={active}>
				<Switch.Item name="loading" component={Loading.Mask} />
				<Switch.Item
					name="main"
					component={Main}
					onUpload={() => setActive('picker')}
					onEdit={() => setActive('crop')}
				/>
				<Switch.Item
					name="crop"
					component={Edit}
					onCancel={onCancel}
					onSave={onImageCroppingSave}
					image={baseImage}
				/>
				<Switch.Item
					name="picker"
					component={Upload}
					onCancel={onCancel}
					onSave={onBaseImageSave}
					image={croppedImage}
					baseImage={baseImage}
				/>
			</Switch.Container>
		</Loading.Placeholder>
	);
}
