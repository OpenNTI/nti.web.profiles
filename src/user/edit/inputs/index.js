import HTML from './HTML';
import String from './String';
import URI from './URI';

const NAMES = {
	about: HTML
};

const TYPES = {
	string: String,
	URI,
};

export default function getWidget ({name, type} = {}) {
	return NAMES[name] || TYPES[type] || String;
}
