import Communities from './Communities';
import Groups from './Groups';

const widgets = [
	Communities,
	Groups
];

export default function getWidget (mimeType) {
	return widgets.find(w => w.handles(mimeType));
}
